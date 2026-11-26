import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'vintagestore.db';
let databasePromise;
let writeQueue = Promise.resolve();

function serializeWrite(operation) {
  const pendingWrite = writeQueue.then(operation);
  writeQueue = pendingWrite.catch(() => {});
  return pendingWrite;
}

function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME).catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  return databasePromise;
}

function productId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function serialize(value) {
  return JSON.stringify(value);
}

export async function initializeStoreDatabase(products) {
  const database = await getDatabase();

  await database.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      unit_price REAL NOT NULL,
      image_key TEXT NOT NULL,
      sizes_json TEXT NOT NULL,
      colors_json TEXT NOT NULL,
      details_json TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY NOT NULL,
      product_id TEXT NOT NULL,
      unit_price REAL NOT NULL,
      color TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      total REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      color TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      total REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
  `);

  await serializeWrite(() =>
    database.withTransactionAsync(async () => {
      for (const product of products) {
        const unitPrice = Number(String(product.price).replace(/[^\d.]/g, ''));

        if (!Number.isFinite(unitPrice)) {
          throw new Error(`Invalid price for ${product.name}`);
        }

        await database.runAsync(
          `INSERT INTO products
            (id, name, category, unit_price, image_key, sizes_json, colors_json, details_json)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            category = excluded.category,
            unit_price = excluded.unit_price,
            image_key = excluded.image_key,
            sizes_json = excluded.sizes_json,
            colors_json = excluded.colors_json,
            details_json = excluded.details_json`,
          productId(product.name),
          product.name,
          product.category,
          unitPrice,
          productId(product.name),
          serialize(product.sizes),
          serialize(product.colors),
          serialize(product.details)
        );
      }
    })
  );
}

export async function getProducts(seedProducts) {
  const database = await getDatabase();
  const rows = await database.getAllAsync('SELECT * FROM products ORDER BY name');
  const seedById = new Map(
    seedProducts.map((product) => [productId(product.name), product])
  );

  return rows.map((row) => {
    const seedProduct = seedById.get(row.id);

    if (!seedProduct) {
      throw new Error(`Missing bundled product data for ${row.id}`);
    }

    return {
      id: row.id,
      name: row.name,
      category: row.category,
      price: `₱${row.unit_price}`,
      unitPrice: row.unit_price,
      image: seedProduct.image,
      sizes: JSON.parse(row.sizes_json),
      colors: JSON.parse(row.colors_json),
      details: JSON.parse(row.details_json),
    };
  });
}

export async function getCartItems(seedProducts) {
  const database = await getDatabase();
  const rows = await database.getAllAsync(
    `SELECT
      cart_items.id,
      cart_items.product_id,
      cart_items.unit_price,
      cart_items.color,
      cart_items.size,
      cart_items.quantity,
      products.name AS product_name,
      products.category,
      products.image_key,
      products.sizes_json,
      products.colors_json
     FROM cart_items
     JOIN products ON products.id = cart_items.product_id
     ORDER BY cart_items.rowid`
  );
  const seedById = new Map(
    seedProducts.map((product) => [productId(product.name), product])
  );

  return rows.map((row) => {
    const seedProduct = seedById.get(row.image_key);

    if (!seedProduct) {
      throw new Error(`Missing bundled image for ${row.product_name}`);
    }

    const availableSizes = JSON.parse(row.sizes_json);
    const matchedSize = availableSizes.find((size) => String(size) === row.size);

    return {
      id: row.id,
      productId: row.product_id,
      productName: row.product_name,
      category: row.category,
      unitPrice: row.unit_price,
      image: seedProduct.image,
      availableColors: JSON.parse(row.colors_json),
      availableSizes,
      color: row.color,
      size: matchedSize === undefined ? row.size : matchedSize,
      quantity: row.quantity,
    };
  });
}

export async function addCartItem(item) {
  const database = await getDatabase();
  await serializeWrite(async () => {
    const matchingItem = await database.getFirstAsync(
      `SELECT id FROM cart_items
       WHERE product_id = ? AND color = ? AND size = ?`,
      item.productId,
      item.color,
      String(item.size)
    );

    if (matchingItem) {
      await database.runAsync(
        'UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?',
        matchingItem.id
      );
      return;
    }

    await database.runAsync(
      `INSERT INTO cart_items
        (id, product_id, unit_price, color, size, quantity)
       VALUES (?, ?, ?, ?, ?, 1)`,
      item.id,
      item.productId,
      item.unitPrice,
      item.color,
      String(item.size)
    );
  });
}

export async function updateCartQuantity(id, change) {
  const database = await getDatabase();
  await serializeWrite(() =>
    database.runAsync(
      'UPDATE cart_items SET quantity = MAX(1, quantity + ?) WHERE id = ?',
      change,
      id
    )
  );
}

export async function editCartVariant(id, color, size) {
  const database = await getDatabase();

  await serializeWrite(() =>
    database.withTransactionAsync(async () => {
      const currentItem = await database.getFirstAsync(
        'SELECT product_id, quantity FROM cart_items WHERE id = ?',
        id
      );

      if (!currentItem) {
        return;
      }

      const matchingItem = await database.getFirstAsync(
        `SELECT id FROM cart_items
         WHERE product_id = ? AND color = ? AND size = ? AND id != ?`,
        currentItem.product_id,
        color,
        String(size),
        id
      );

      if (matchingItem) {
        await database.runAsync(
          'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
          currentItem.quantity,
          matchingItem.id
        );
        await database.runAsync('DELETE FROM cart_items WHERE id = ?', id);
        return;
      }

      await database.runAsync(
        'UPDATE cart_items SET color = ?, size = ? WHERE id = ?',
        color,
        String(size),
        id
      );
    })
  );
}

export async function deleteCartItem(id) {
  const database = await getDatabase();
  await serializeWrite(() =>
    database.runAsync('DELETE FROM cart_items WHERE id = ?', id)
  );
}

export async function clearCart() {
  const database = await getDatabase();
  await serializeWrite(() => database.runAsync('DELETE FROM cart_items'));
}

export async function saveOrder(cartItems, paymentMethod) {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  const orderNumber = `VS-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
  const items = cartItems.map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    color: item.color,
    size: item.size,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.unitPrice * item.quantity,
  }));
  const total = items.reduce((sum, item) => sum + item.total, 0);

  await serializeWrite(() =>
    database.withTransactionAsync(async () => {
      const result = await database.runAsync(
        `INSERT INTO orders (order_number, created_at, payment_method, total)
         VALUES (?, ?, ?, ?)`,
        orderNumber,
        createdAt,
        paymentMethod,
        total
      );

      for (const item of items) {
        await database.runAsync(
          `INSERT INTO order_items
            (order_id, product_id, product_name, color, size, quantity, unit_price, total)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          result.lastInsertRowId,
          item.productId,
          item.productName,
          item.color,
          String(item.size),
          item.quantity,
          item.unitPrice,
          item.total
        );
      }
    })
  );

  return {
    orderNumber,
    date: new Date(createdAt).toLocaleString(),
    paymentMethod,
    items,
    total,
  };
}

import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CartScreen from '../components/cart-screen';
import HomeScreen, { initialProducts } from '../components/home-screen';
import SettingsScreen from '../components/settings-screen';
import StoreBottomNavigation from '../components/store-bottom-navigation';
import StoreHeader from '../components/store-header';
import {
  addCartItem as addStoredCartItem,
  clearCart as clearStoredCart,
  deleteCartItem as deleteStoredCartItem,
  editCartVariant as editStoredCartVariant,
  getCartItems,
  getProducts,
  initializeStoreDatabase,
  updateCartQuantity as updateStoredCartQuantity,
} from '../data/store-database';

const productCategories = ['All', 'Sneakers', 'Clothing', 'Accessories'];

export default function StoreScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState('All');
  const [databaseStatus, setDatabaseStatus] = useState('loading');
  const [databaseError, setDatabaseError] = useState('');

  const loadStore = useCallback(async () => {
    await Promise.resolve();
    setDatabaseStatus('loading');
    setDatabaseError('');

    try {
      await initializeStoreDatabase(initialProducts);
      const [storedProducts, storedCartItems] = await Promise.all([
        getProducts(initialProducts),
        getCartItems(initialProducts),
      ]);
      setProducts(storedProducts);
      setCartItems(storedCartItems);
      setDatabaseStatus('ready');
    } catch (error) {
      setDatabaseError(
        error instanceof Error ? error.message : 'Could not open the local database.'
      );
      setDatabaseStatus('error');
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(loadStore);
  }, [loadStore]);

  const runCartMutation = async (operation) => {
    try {
      await operation();
      setCartItems(await getCartItems(initialProducts));
      setDatabaseError('');
      return true;
    } catch (error) {
      setDatabaseError(
        error instanceof Error ? error.message : 'Could not save your cart.'
      );
      return false;
    }
  };
  
  const addToCart = (product, size, color) => {
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      productId: product.id,
      productName: product.name,
      category: product.category,
      unitPrice: product.unitPrice,
      image: product.image,
      availableColors: product.colors,
      availableSizes: product.sizes,
      color,
      size,
      quantity: 1,
    };

    return runCartMutation(() => addStoredCartItem(cartItem));
  };

  const updateCartQuantity = (id, change) => {
    return runCartMutation(() => updateStoredCartQuantity(id, change));
  };

  const editCartVariant = (id, color, size) => {
    return runCartMutation(() => editStoredCartVariant(id, color, size));
  };

  if (databaseStatus === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContent}>
          <ActivityIndicator color="#5A3825" />
          <Text style={styles.statusText}>Loading your local store database...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (databaseStatus === 'error') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContent}>
          <Text style={styles.errorTitle}>Could not load the store database</Text>
          <Text style={styles.errorText}>{databaseError}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadStore}
            accessibilityRole="button">
            <Text style={styles.retryButtonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onOpenCart={() => setActiveTab('Cart')}
      />
      {databaseError ? (
        <Text style={styles.inlineError} accessibilityRole="alert">
          Could not save cart changes: {databaseError}
        </Text>
      ) : null}
      <View style={styles.content}>
        {activeTab === 'Home' ? (
          <HomeScreen
            onAddToCart={addToCart}
            initialCategory={defaultCategory}
            products={products}
          />
        ) : activeTab === 'Settings' ? (
          <SettingsScreen
            categories={productCategories}
            selectedCategory={defaultCategory}
            onSelectCategory={setDefaultCategory}
          />
        ) : (

          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onEditVariant={editCartVariant}
            onContinueShopping={() => setActiveTab('Home')}
            onDeleteItem={(id) => runCartMutation(() => deleteStoredCartItem(id))}
            onClearCart={() => runCartMutation(clearStoredCart)}
          />
        )}
      </View>
      <StoreBottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4EBDD' },
  content: { flex: 1 },
  statusContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  statusText: { marginTop: 12, color: '#6F5944', fontSize: 14 },
  errorTitle: { color: '#2C221E', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  errorText: { marginTop: 10, color: '#A12A24', fontSize: 13, textAlign: 'center' },
  retryButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: '#5A3825',
    borderRadius: 8,
  },
  retryButtonText: { color: '#FFFDFB', fontWeight: '700' },
  inlineError: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: '#A12A24',
    backgroundColor: '#FBE9E7',
    fontSize: 12,
  },
});
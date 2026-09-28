import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const categories = ['All', 'Basketball', 'Running', 'Skate', 'High-Top'];
  const products = [
    {
      name: 'Red Nike Flyknit',
      price: '₱999',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'Red', value: '#2C221E' },
        { name: 'White', value: '#F7F3EE' },
        { name: 'Black', value: '#ff4a02' },
      ],
    },
    {
      name: 'Nike Air Max',
      price: '₱1200',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'Blue', value: '#2C221E' },
        { name: 'Cream', value: '#EADCC6' },
        { name: 'Gray', value: '#817e7b' },
      ],
    },
    {
      name: 'Air Jordan 1',
      price: '₱1200',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'White', value: '#2C221E' },
        { name: 'Black', value: '#F7F3EE' },
        { name: 'Brown', value: '#8D5E3C' }, 
      ],
    },
    {
      name: 'Puma Smash V2, Perforated Leather',
      price: '₱999',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'Orange', value: '#2C221E' },
        { name: 'Green', value: '#F7F3EE' },
        { name: 'Beige', value: '#D4B894' },
      ],
    },
    {
      name: 'Nike Sneaker',
      price: '₱1200',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'Gold', value: '#2C221E' },
        { name: 'Navy', value: '#F7F3EE' },
        { name: 'Pink', value: '#D89CB0' },
      ],
    },
    {
      name: 'Adidas Superstar',
      price: '₱1400',
      image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85',
      sizes: [5, 6, 7, 8, 9, 10, 11],
      colors: [
        { name: 'White', value: '#F7F3EE' },
        { name: 'Black', value: '#2C221E' },
        { name: 'Blue', value: '#4F6E8E' },
      ],
    },
  ];
  // Navigation states (pure state tabs)
  const [activeTab, setActiveTab] = useState('Home');
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.length;

  const addToCart = (product, selectedSize = null, selectedColor = null) => {
    const chosenColor = selectedColor || selectedColors[product.name] || product.colors[0].name;
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      productName: product.name,
      price: product.price,
      image: product.image,
      color: chosenColor,
      size: selectedSize,
      baseProduct: product,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);
  };

  const deleteCartItem = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const editCartItem = (item) => {
    if (!item.baseProduct) {
      return;
    }

    const productColors = item.baseProduct.colors.map((color) => color.name);
    const productSizes = item.baseProduct.sizes;
    const currentColorIndex = productColors.indexOf(item.color);
    const nextColor = productColors[(currentColorIndex + 1) % productColors.length];

    const updatedSize = productSizes && productSizes.length > 0
      ? productSizes[(productSizes.indexOf(item.size) + 1) % productSizes.length]
      : item.size;

    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              color: nextColor,
              size: updatedSize,
            }
          : cartItem,
      ),
    );
  };

  // Main app screen(home,cart)
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.headerEyebrow}>VINTAGE SNEAKER ARCHIVE</Text>
          <Text style={styles.headerTitle}>Vintage Store</Text>
          <Text style={styles.headerSubtitle}>Rare finds. Everyday classics.</Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setActiveTab('Cart')}
        >
          <Text style={styles.cartText}>🛒</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconText}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Maghanap ng vintage items..."
          placeholderTextColor="#3B2418"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <Text style={styles.clearText} onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              activeCategory === category && styles.activeCategoryChip,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content Area (Nagbabago base sa activeTab) */}
      <View style={styles.content}>
        {activeTab === 'Home' && (
          <ScrollView
            contentContainerStyle={styles.productGrid}
            showsVerticalScrollIndicator={false}
          >
            {products.map((product) => {
              const isSelected = selectedProduct === product.name;
              const selectedColor = selectedColors[product.name] || product.colors[0].name;
              const selectedSize = selectedSizes[product.name];

              return (
                <View key={product.name} style={styles.productCard}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedProduct(isSelected ? null : product.name)}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                      resizeMode="cover"
                      accessibilityLabel={product.name}
                    />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                  </TouchableOpacity>

                  {isSelected && (
                    <View style={styles.optionContainer}>
                      <Text style={styles.sizeLabel}>Select color</Text>
                      <View style={styles.colorRow}>
                        {product.colors.map((color) => {
                          const isActive = selectedColor === color.name;

                          return (
                            <TouchableOpacity
                              key={color.name}
                              style={[
                                styles.colorOption,
                                { backgroundColor: color.value },
                                isActive && styles.activeColorOption,
                              ]}
                              onPress={() =>
                                setSelectedColors((current) => ({
                                  ...current,
                                  [product.name]: color.name,
                                }))
                              }
                              accessibilityLabel={`Choose ${color.name} color`}
                            >
                              {isActive && <Text style={styles.colorCheck}>✓</Text>}
                            </TouchableOpacity>
                          );
                        })}
                      </View>

                      <Text style={styles.sizeLabel}>Select size</Text>
                      <View style={styles.sizeRow}>
                        {product.sizes.map((size) => (
                          <TouchableOpacity
                            key={size}
                            style={[
                              styles.sizeOption,
                              selectedSize === size && styles.activeSizeOption,
                            ]}
                            onPress={() =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [product.name]: size,
                              }))
                            }
                          >
                            <Text style={styles.sizeOptionText}>{size}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.productAddButton}
                    onPress={() => {
                      if (selectedSize == null) {
                        alert('Please select a size before adding this item to your cart.');
                        return;
                      }

                      const chosenColor = selectedColors[product.name] || product.colors[0].name;
                      addToCart(product, selectedSize, chosenColor);
                      alert(`Added ${chosenColor} ${product.name} in size ${selectedSize} to cart`);
                    }}
                  >
                    <Text style={styles.productAddText}>Add to cart</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        )}

        {activeTab === 'Cart' && (
          <View style={styles.cartContainer}>
            {cartItems.length === 0 ? (
              <View style={styles.emptyCartState}>
                <Text style={styles.emptyCartIcon}>🛒</Text>
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
              </View>
            ) : (
              <>
                <ScrollView contentContainerStyle={styles.cartList} showsVerticalScrollIndicator={false}>
                  {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                      <Image source={{ uri: item.image }} style={styles.cartItemImage} resizeMode="cover" />
                      <View style={styles.cartItemDetails}>
                        <Text style={styles.cartItemName}>{item.productName}</Text>
                        <Text style={styles.cartItemMeta}>Color: {item.color}</Text>
                        {item.size ? <Text style={styles.cartItemMeta}>Size: {item.size}</Text> : null}
                        <Text style={styles.cartItemPrice}>{item.price}</Text>

                        <View style={styles.cartActions}>
                          <TouchableOpacity
                            style={styles.cartEditButton}
                            onPress={() => editCartItem(item)}
                          >
                            <Text style={styles.cartActionText}>Edit</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.cartDeleteButton}
                            onPress={() => deleteCartItem(item.id)}
                          >
                            <Text style={styles.cartActionText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={[styles.loginButton, { marginTop: 15, paddingHorizontal: 16, backgroundColor: '#A05B39' }]}
                  onPress={() => setCartItems([])}
                >
                  <Text style={styles.loginButtonText}>Clear Cart</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

      </View>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Text style={[styles.navIcon, activeTab === 'Home' && styles.activeNavText]}>
            🏠
          </Text>
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EBDD',
  },
  loginWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  loginCard: {
    backgroundColor: '#FFFDFB',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E9DECF',
    shadowColor: '#382028',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C7A6B',
    marginTop: 4,
  },
  header: {
    minHeight: 132,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C221E',
    borderBottomWidth: 4,
    borderBottomColor: '#C66A3D',
  },
  headerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  headerEyebrow: {
    marginBottom: 7,
    color: '#E4A16F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  headerTitle: {
    color: '#FFFDFB',
    fontSize: 27,
    fontWeight: '800',
  },
  headerSubtitle: {
    marginTop: 4,
    color: '#D8C8B8',
    fontSize: 13,
  },
  cartButton: {
    width: 48,
    height: 48,
    position: 'relative',
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4A16F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cartText: {
    fontSize: 22,
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#A05B39',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F3F34',
    marginBottom: 8,
    marginLeft: 4,
  },
  loginInput: {
    backgroundColor: '#F8F3EE',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2C221E',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotText: {
    color: '#A05B39',
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#2C221E',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFDFB',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#7A685C',
    fontSize: 13,
  },
  footerLink: {
    color: '#A05B39',
    fontWeight: '700',
    marginLeft: 6,
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F3EE',
    marginHorizontal: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6DFD5',
    elevation: 2,
  },
  searchIconText: {
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C221E',
  },
  clearText: {
    fontSize: 16,
    color: '#8C7A6B',
    paddingHorizontal: 4,

  },
  //design for category 
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  categoryChip: {
    backgroundColor: '#F8F3EE',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  activeCategoryChip: {
    backgroundColor: '#2C221E',
    borderColor: '#2C221E',
  },
  categoryText: {
    color: '#4F3F34',
    fontSize: 12,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFDFB',
  },
  // end of category design
  content: {
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  emptyCartState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyCartText: {
    color: '#4F3F34',
    fontSize: 16,
    fontWeight: '600',
  },
  cartList: {
    paddingBottom: 20,
    gap: 10,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DECF',
    padding: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    color: '#2C221E',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  cartItemMeta: {
    color: '#6F5944',
    fontSize: 12,
    marginBottom: 2,
  },
  cartItemPrice: {
    color: '#A05B39',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  cartActions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  cartEditButton: {
    flex: 1,
    backgroundColor: '#2C221E',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cartDeleteButton: {
    flex: 1,
    backgroundColor: '#A05B39',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cartActionText: {
    color: '#FFFDFB',
    fontSize: 12,
    fontWeight: '700',
  },
  productCard: {
    width: '48%',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  productImage: {
    width: '100%',
    height: 132,
    backgroundColor: '#EED7CB',
    borderRadius: 6,
  },
  productName: {
    marginTop: 8,
    color: '#2C221E',
    fontSize: 13,
    fontWeight: '600',
  },
  productPrice: {
    marginTop: 3,
    color: '#A05B39',
    fontSize: 13,
    fontWeight: '700',
  },
  optionContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E9DECF',
  },
  sizeLabel: {
    color: '#6F5944',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  //color of shoes
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 6,
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeColorOption: {
    borderWidth: 2,
    borderColor: '#2C221E',
    transform: [{ scale: 1.05 }],
  },
  colorCheck: {
    color: '#FFFDFB',
    fontSize: 11,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  sizeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F4EBDD',
    borderWidth: 1,
    borderColor: '#E2D5C2',
  },
  activeSizeOption: {
    backgroundColor: '#E8D3BF',
    borderColor: '#8D5E3C',
    borderWidth: 2,
  },
  sizeOptionText: {
    color: '#2C221E',
    fontSize: 12,
    fontWeight: '700',
  },
  productAddButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#5A3825',
    borderRadius: 6,
  },
  productAddText: {
    color: '#FFFDFB',
    fontSize: 12,
    fontWeight: '700',
  },
  contentText: {
    fontSize: 18,
    color: '#2C221E',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFDFB',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9DECF',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  navLabel: {
    fontSize: 12,
    color: '#8C7A6B',
    marginTop: 2,
    fontWeight: '600',
  },
  activeNavText: {
    opacity: 1,
    color: '#A05B39',
  },
});
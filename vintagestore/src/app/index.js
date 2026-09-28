import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const categories = ['All', 'Basketball', 'Running', 'Skate', 'High-Top'];
  const products = [
    {
      name: 'Red Nike Flyknit',
      price: '₱999',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
      sizes: [8, 9, 10, 11],
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
      sizes: [8, 9, 10, 11],
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
      sizes: [8, 9, 10, 11],
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
      sizes: [8, 9, 10, 11],
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
      sizes: [8, 9, 10, 11],
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
      sizes: [7, 8, 9, 10, 11],
      colors: [
        { name: 'White', value: '#F7F3EE' },
        { name: 'Black', value: '#2C221E' },
        { name: 'Blue', value: '#4F6E8E' },
      ],
    },
  ];
  // 1. DITO ILAGAY ANG MGA LOGIN STATES (Line 6)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigation states (pure state tabs)
  const [activeTab, setActiveTab] = useState('Home');
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // 2. DITO ILAGAY ANG LOGIN GATEKEEPER (Bago mag-return)
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginWrap}>
          <View style={styles.loginCard}>
            <Text style={styles.logoBadge}>VS</Text>
            <Text style={styles.title}>Vintage Store</Text>
            <Text style={styles.subtitle}>Sign in to access exclusive VintageSneakers items</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.loginInput}
                placeholder="Enter your email"
                placeholderTextColor="#A89F91"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.loginInput}
                placeholder="Enter your password"
                placeholderTextColor="#A89F91"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                if (email && password) {
                  setIsLoggedIn(true);
                } else {
                  alert('Paki-lagay ang Email at Password');
                }
              }}
            >
              <Text style={styles.loginButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>New here?</Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  // Main app screen(home,cart,profile)
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Vintage Store</Text>
          <Text style={styles.headerSubtitle}>Welcome to your shop</Text>
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
          placeholderTextColor="#A89F91"
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
                            style={styles.sizeOption}
                            onPress={() => {
                              setCartCount((current) => current + 1);
                              setSelectedProduct(null);
                              alert(`Added ${selectedColor} ${product.name} in size ${size} to cart`);
                            }}
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
                      const chosenColor = selectedColors[product.name] || product.colors[0].name;
                      setCartCount((current) => current + 1);
                      alert(`Added ${chosenColor} ${product.name} to cart`);
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
          <View style={styles.centerView}>
            {cartCount > 0 && (
              <TouchableOpacity
                style={[styles.loginButton, { marginTop: 15, paddingHorizontal: 16, backgroundColor: '#A05B39' }]}
                onPress={() => setCartCount(0)}
              >
                <Text style={styles.loginButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {activeTab === 'User' && (
          <View style={styles.centerView}>
            <View style={styles.userAccountCard}>
              <View style={styles.userHeaderRow}>
                <Text style={styles.userAccountTitle}>User Account</Text>
                <TouchableOpacity
                  style={styles.userSettingsButton}
                  onPress={() => alert('Settings opened')}
                >
                  <Text style={styles.userSettingsText}>⚙️</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.userAccountInfo}>Member since 2026</Text>

              <View style={styles.userAccountMeta}>
                <Text style={styles.userAccountLabel}>Signed in as</Text>
                <Text style={styles.userAccountEmail}>{email || 'member@vintagestore.com'}</Text>
              </View>

              <TouchableOpacity
                style={[styles.loginButton, { marginTop: 20, paddingHorizontal: 20 }]}
                onPress={() => setIsLoggedIn(false)}
              >
                <Text style={styles.loginButtonText}>LOG OUT</Text>
              </TouchableOpacity>
            </View>
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

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('User')}
        >
          <Text style={[styles.navIcon, activeTab === 'User' && styles.activeNavText]}>
            👤
          </Text>
          <Text style={[styles.navLabel, activeTab === 'User' && styles.activeNavText]}>
            User Acc
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
    elevation: 8,
  },
  logoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2C221E',
    color: '#F8F3EE',
    fontSize: 18,
    fontWeight: '700',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 18,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#8D5E3C',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#F7EDE4',
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C221E',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C7A6B',
    marginTop: 4,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DECF',
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
    backgroundColor: '#FFFFFF',
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
  sizeOptionText: {
    color: '#2C221E',
    fontSize: 12,
    fontWeight: '700',
  },
  productAddButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#2C221E',
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
  userAccountCard: {
    width: '90%',
    backgroundColor: '#FFFDFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9DECF',
    padding: 20,
    shadowColor: '#382028',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  userHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAccountTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C221E',
  },
  userSettingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4EBDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  userSettingsText: {
    fontSize: 20,
  },
  userAccountInfo: {
    fontSize: 14,
    color: '#8C7A6B',
    marginBottom: 14,
  },
  userAccountMeta: {
    backgroundColor: '#F8F3EE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    padding: 12,
  },
  userAccountLabel: {
    fontSize: 12,
    color: '#8C7A6B',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  userAccountEmail: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C221E',
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
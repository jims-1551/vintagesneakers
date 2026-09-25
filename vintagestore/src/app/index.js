import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
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
          <Text style={styles.title}>Vintage Store</Text>
          <Text style={styles.subtitle}>Welcome to your shop</Text>
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

      {/* Main Content Area (Nagbabago base sa activeTab) */}
      <View style={styles.content}>
        {activeTab === 'Home' && (
          <View style={styles.centerView}>
            <TouchableOpacity
              style={[styles.loginButton, { marginTop: 15, paddingHorizontal: 16 }]}
              onPress={() => setCartCount(cartCount + 1)}
            >
              <Text style={styles.loginButtonText}>+ Add Sample Item to Cart</Text>
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity
              style={[styles.loginButton, { marginTop: 20, paddingHorizontal: 20 }]}
              onPress={() => setIsLoggedIn(false)}
            >
              <Text style={styles.loginButtonText}>LOG OUT</Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
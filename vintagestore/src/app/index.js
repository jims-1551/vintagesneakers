import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  // 1. DITO ILAGAY ANG MGA LOGIN STATES (Line 6)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigation states (pure state tabs)
  const [activeTab, setActiveTab] = useState('home');// adi didi an home, users, cart
  const [activeSubTab, setActiveSubTab] = useState(0);

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
        <Text style={styles.title}>Vintage Store</Text>
        <Text style={styles.subtitle}>Welcome to your shop</Text>
      </View>
   
      // cart button
      <TouchableOpacity 
        style={styles.cartButton }
        onPress={() => setActiveTab('Cart')}
        >
          <Text style={styles.cartText}>🛒</Text>
          <view style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </view>
        </TouchableOpacity>

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
            <text style={styles.clearText}>Clear</text>
            
            ❌
          </Text>
        )}
      </View>

      {/* Main Content Area */}
      <View style={styles.content} />
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
    shadowColor: '#3B2D20',
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C221E',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8C7A6B',
    marginTop: 8,
    marginBottom: 20,
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
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2C221E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  loginButtonText: {
    color: '#F9F5F0',
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 15,
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
    paddingVertical: 12,
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
});
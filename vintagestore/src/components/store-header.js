import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Header ng store. Nagpapakita ng brand name at cart button na may badge count.
export default function StoreHeader({ cartCount, onOpenCart }) {
  return (
    <View style={styles.header}>
      {/* Brand/intro section sa kaliwa ng header. */}
      <View style={styles.headerCopy}>
        <Text style={styles.headerTitle}>Vintage Store</Text>
        <Text style={styles.headerSubtitle}>Welcome to the Sneakers&Streetwear</Text>
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={onOpenCart} accessibilityLabel="Open cart">
        <Text style={styles.cartText}>🛒</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 132,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C221E',
    borderBottomWidth: 1,
    borderBottomColor: '#d6c6be',
  },

  headerCopy: {
    flex: 1,
    paddingRight: 12,
  },

  headerTitle: { color: '#FFFDFB', fontSize: 27, fontWeight: '800' },
  headerSubtitle: { marginTop: 4, color: '#D8C8B8', fontSize: 13 },
  
  //cartButton
  cartButton: {
    position: 'relative',
    width: 48,
    height: 48,
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#25201d',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: { fontSize: 22 },
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
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
});
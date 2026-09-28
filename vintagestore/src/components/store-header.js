import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StoreHeader({ cartCount, onOpenCart }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text style={styles.headerEyebrow}>THE SNEAKER ARCHIVE</Text>
        <Text style={styles.headerTitle}>Vintage Store</Text>
        <Text style={styles.headerSubtitle}>Welcome to the Vintage Store</Text>
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
    paddingBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2C221E',
    borderBottomWidth: 4,
    borderBottomColor: '#C66A3D',
  },
  headerCopy: { flex: 1, paddingRight: 12 },
  headerEyebrow: {
    marginBottom: 7,
    color: '#E4A16F',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  headerTitle: { color: '#FFFDFB', fontSize: 27, fontWeight: '800' },
  headerSubtitle: { marginTop: 4, color: '#D8C8B8', fontSize: 13 },
  cartButton: {
    position: 'relative',
    width: 48,
    height: 48,
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4A16F',
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
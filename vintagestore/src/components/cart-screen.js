import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Screen na nagpapakita ng lahat ng item na napili sa cart.
// May mga action para i-edit, i-delete, at i-clear ang buong cart.
export default function CartScreen({ cartItems, onEditItem, onDeleteItem, onClearCart }) {
  // Kun wara sulod ang cart, ipapakita ang empty state instead of list.
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyCartState}>
        <Text style={styles.emptyCartIcon}>🛒</Text>
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scrollable list ng mga cart items. */}
      <ScrollView contentContainerStyle={styles.cartList} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} resizeMode="cover" />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.productName}</Text>
              <Text style={styles.cartItemMeta}>Color: {item.color}</Text>
              {item.size ? <Text style={styles.cartItemMeta}>Size: {item.size}</Text> : null}
              <Text style={styles.cartItemPrice}>{item.price}</Text>

              {/* Mga action button para bagohon o tanggalon ang item sa cart. */}
              <View style={styles.cartActions}>
                <TouchableOpacity style={styles.cartEditButton} onPress={() => onEditItem(item)}>
                  <Text style={styles.cartActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cartDeleteButton}
                  onPress={() => onDeleteItem(item.id)}
                >
                  <Text style={styles.cartActionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* asya ini an code san cart button para tangalon an tanan na item sa cart */}
      <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 12 },
  emptyCartState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyCartIcon: { fontSize: 40, marginBottom: 8 },
  emptyCartText: { color: '#4F3F34', fontSize: 16, fontWeight: '600' },
  cartList: { paddingBottom: 20, gap: 10 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DECF',
    padding: 10,
  },
  cartItemImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  cartItemDetails: { flex: 1, justifyContent: 'center' },
  cartItemName: { color: '#2C221E', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  cartItemMeta: { color: '#6F5944', fontSize: 12, marginBottom: 2 },
  cartItemPrice: { color: '#A05B39', fontSize: 14, fontWeight: '700', marginTop: 4 },
  cartActions: { flexDirection: 'row', marginTop: 10, gap: 8 },
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
  cartActionText: { color: '#FFFDFB', fontSize: 12, fontWeight: '700' },
  clearButton: {
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#A05B39',
    borderRadius: 14,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFDFB',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
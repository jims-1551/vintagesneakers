import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function CartScreen({
  cartItems,
  editingSelection,
  onEditItem,
  onUpdateEditingSelection,
  onSaveEdit,
  onCancelEdit,
  onDeleteItem,
  onClearCart,
}) {
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
      {/* Ipinapakita ang mga item sa cart sa isang listahang maaaring i-scroll. */}
      <ScrollView contentContainerStyle={styles.cartList} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => {
          // Kapag ito ang kasalukuyang ine-edit na item, gamitin ang pansamantalang pagpili.
          const isEditing = editingSelection?.itemId === item.id;
          const currentColor = isEditing ? editingSelection.color : item.color;
          const currentSize = isEditing ? editingSelection.size : item.size;
          const availableColors = item.baseProduct?.colors || [];
          const availableSizes = item.baseProduct?.sizes || [];

          return (
            <View key={item.id} style={styles.cartItem}>
              <Image source={ item.image } style={styles.cartItemImage} resizeMode="cover" />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.productName}</Text>
                <Text style={styles.cartItemMeta}>Color: {currentColor}</Text>
                {currentSize ? <Text style={styles.cartItemMeta}>Size: {currentSize}</Text> : null}
                <Text style={styles.cartItemPrice}>{item.price}</Text>

                {/* Ipakita ang pagpili ng variant habang nag-e-edit, o ang normal na mga action. */}
                {isEditing ? (
                  <View style={styles.editPanel}>
                    <Text style={styles.optionLabel}>Choose color</Text>
                    <View style={styles.optionRow}>
                      {availableColors.map((option) => (
                        <TouchableOpacity
                          key={option.name}
                          style={[
                            styles.optionButton,
                            { backgroundColor: option.value },
                            currentColor === option.name && styles.selectedOptionButton,
                          ]}
                          onPress={() => onUpdateEditingSelection('color', option.name)}
                        >
                          {currentColor === option.name && <Text style={styles.optionCheck}>✓</Text>}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <Text style={styles.optionLabel}>Choose size</Text>
                    <View style={styles.sizeOptionRow}>
                      {availableSizes.map((size) => (
                        <TouchableOpacity
                          key={size}
                          style={[
                            styles.sizeOption,
                            currentSize === size && styles.selectedSizeOption,
                          ]}
                          onPress={() => onUpdateEditingSelection('size', size)}
                        >
                          <Text style={styles.sizeOptionText}>{size}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View style={styles.editActions}>
                      <TouchableOpacity
                        style={styles.saveEditButton}
                        onPress={() => onSaveEdit(item.id, currentColor, currentSize)}
                      >
                        <Text style={styles.cartActionText}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.cancelEditButton} onPress={onCancelEdit}>
                        <Text style={styles.cartActionText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
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
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Tawagin ang callback para alisin ang lahat ng item sa cart. */}
      <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
        <Text style={styles.clearButtonText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// Mga style para sa layout ng cart, item details, edit controls, at mga button.
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
  editPanel: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E9DECF',
  },
  optionLabel: {
    color: '#6F5944',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  optionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOptionButton: { borderWidth: 2, borderColor: '#2C221E', transform: [{ scale: 1.05 }] },
  optionCheck: {
    color: '#FFFDFB',
    fontSize: 12,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sizeOptionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  sizeOption: {
    minWidth: 34,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#F4EBDD',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    alignItems: 'center',
  },
  selectedSizeOption: { backgroundColor: '#E8D3BF', borderColor: '#8D5E3C', borderWidth: 2 },
  sizeOptionText: { color: '#2C221E', fontSize: 11, fontWeight: '700' },
  editActions: { flexDirection: 'row', gap: 8 },
  saveEditButton: {
    flex: 1,
    backgroundColor: '#2C221E',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelEditButton: {
    flex: 1,
    backgroundColor: '#A05B39',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
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
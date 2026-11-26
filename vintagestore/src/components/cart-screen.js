import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CartScreen({
  cartItems,
  onDeleteItem,
  onClearCart,
  onUpdateQuantity,
  onEditVariant,
  onContinueShopping,
}) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [draftColor, setDraftColor] = useState('');
  const [draftSize, setDraftSize] = useState(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
  const formatPrice = (amount) =>
    `₱${amount.toLocaleString('en-PH', { maximumFractionDigits: 2 })}`;

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setDraftColor(item.color);
    setDraftSize(item.size);
  };

  const saveVariant = (itemId) => {
    onEditVariant(itemId, draftColor, draftSize);
    setEditingItemId(null);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyCartState}>
        <Text style={styles.emptyCartIcon}>🛒</Text>
        <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
        <Text style={styles.emptyCartText}>Find a vintage favorite and it will show up here.</Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onContinueShopping}
          accessibilityRole="button"
        >
          <Text style={styles.continueButtonText}>Continue shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <View>
          <Text style={styles.cartTitle}>Your cart</Text>
          <Text style={styles.cartSubtitle}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
          </Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClearCart}
          accessibilityRole="button"
          accessibilityLabel="Clear all items from cart"
        >
          <Text style={styles.clearButtonText}>Clear cart</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.cartList} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} resizeMode="cover" />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemCategory}>{item.category}</Text>
              <Text style={styles.cartItemName}>{item.productName}</Text>
              <View style={styles.variantRow}>
                <Text style={styles.variantChip}>Color: {item.color}</Text>
                {item.size ? <Text style={styles.variantChip}>Size: {item.size}</Text> : null}
              </View>
              <Text style={styles.cartItemPrice}>{formatPrice(item.unitPrice)} each</Text>

              <View style={styles.itemActions}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
                    onPress={() => onUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    accessibilityRole="button"
                    accessibilityLabel={`Decrease ${item.productName} quantity`}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => onUpdateQuantity(item.id, 1)}
                    accessibilityRole="button"
                    accessibilityLabel={`Increase ${item.productName} quantity`}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEditing(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Edit color or size for ${item.productName}`}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => onDeleteItem(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.productName} from cart`}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
              {editingItemId === item.id && (
                <View style={styles.editor}>
                  <Text style={styles.editorLabel}>Color</Text>
                  <View style={styles.editorOptions}>
                    {item.availableColors.map((color) => (
                      <TouchableOpacity
                        key={color.name}
                        style={[
                          styles.colorChoice,
                          draftColor === color.name && styles.selectedChoice,
                        ]}
                        onPress={() => setDraftColor(color.name)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: draftColor === color.name }}
                        accessibilityLabel={`Choose ${color.name}`}
                      >
                        <View style={[styles.colorDot, { backgroundColor: color.value }]} />
                        <Text style={styles.choiceText}>{color.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={styles.editorLabel}>Size</Text>
                  <View style={styles.editorOptions}>
                    {item.availableSizes.map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[styles.sizeChoice, draftSize === size && styles.selectedChoice]}
                        onPress={() => setDraftSize(size)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: draftSize === size }}
                        accessibilityLabel={`Choose size ${size}`}
                      >
                        <Text style={styles.choiceText}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.editorActions}>
                    <TouchableOpacity
                      style={styles.cancelEditButton}
                      onPress={() => setEditingItemId(null)}
                      accessibilityRole="button"
                    >
                      <Text style={styles.cancelEditText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveEditButton}
                      onPress={() => saveVariant(item.id)}
                      accessibilityRole="button"
                    >
                      <Text style={styles.saveEditText}>Save changes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <Text style={styles.lineTotal}>{formatPrice(item.unitPrice * item.quantity)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({itemCount} items)</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <Text style={styles.summaryNote}>Shipping and any applicable fees are not included.</Text>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            editingItemId !== null && styles.disabledCheckoutButton,
          ]}
          onPress={() => setCheckoutVisible(true)}
          disabled={editingItemId !== null}
          accessibilityRole="button">
          <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={checkoutVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckoutVisible(false)}>
        <View style={styles.checkoutBackdrop}>
          <View style={styles.checkoutPanel}>
            <View style={styles.checkoutHeader}>
              <View>
                <Text style={styles.checkoutTitle}>Checkout</Text>
                <Text style={styles.checkoutSubtitle}>Review your selected items</Text>
              </View>
              <Pressable
                onPress={() => setCheckoutVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close checkout">
                <Text style={styles.checkoutClose}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.checkoutItems}
              showsVerticalScrollIndicator={false}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.checkoutItem}>
                  <View style={styles.checkoutItemCopy}>
                    <Text style={styles.checkoutItemName}>{item.productName}</Text>
                    <Text style={styles.checkoutItemVariant}>
                      {item.color} · Size {item.size} · Qty {item.quantity}
                    </Text>
                  </View>
                  <Text style={styles.checkoutItemTotal}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.checkoutTotalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
            </View>
            <Text style={styles.checkoutNotice}>
              Checkout preview only. Payment and order submission aren't connected yet.
            </Text>
            <TouchableOpacity
              style={styles.checkoutBackButton}
              onPress={() => setCheckoutVisible(false)}
              accessibilityRole="button">
              <Text style={styles.checkoutBackText}>Back to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  emptyCartState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28 },
  emptyCartIcon: { fontSize: 48, marginBottom: 12 },
  emptyCartTitle: { color: '#2C221E', fontSize: 20, fontWeight: '800' },
  emptyCartText: {
    color: '#6F5944',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 280,
  },
  continueButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: '#5A3825',
    borderRadius: 10,
  },
  continueButtonText: { color: '#FFFDFB', fontSize: 14, fontWeight: '700' },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cartTitle: { color: '#2C221E', fontSize: 22, fontWeight: '800' },
  cartSubtitle: { color: '#6F5944', fontSize: 13, marginTop: 3 },
  clearButton: {
    borderWidth: 1,
    borderColor: '#D8C8B8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: { color: '#8B4A35', fontSize: 12, fontWeight: '700' },
  cartList: { paddingBottom: 12, gap: 10 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFDFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E9DECF',
    padding: 12,
  },
  cartItemImage: { width: 82, height: 96, borderRadius: 9, marginRight: 11 },
  cartItemDetails: { flex: 1, minWidth: 0 },
  cartItemCategory: {
    color: '#A05B39',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cartItemName: { color: '#2C221E', fontSize: 15, fontWeight: '700', marginTop: 3 },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 7 },
  variantChip: {
    color: '#6F5944',
    backgroundColor: '#F7F1E9',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 10,
  },
  cartItemPrice: { color: '#8C7A6B', fontSize: 11, marginTop: 7 },
  itemActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9DECF',
    borderRadius: 7,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: { opacity: 0.35 },
  quantityButtonText: { color: '#5A3825', fontSize: 18, fontWeight: '600' },
  quantityText: {
    minWidth: 24,
    textAlign: 'center',
    color: '#2C221E',
    fontSize: 13,
    fontWeight: '700',
  },
  removeButton: { paddingVertical: 6, paddingHorizontal: 2 },
  removeButtonText: { color: '#9B4D3D', fontSize: 11, fontWeight: '700' },
  editButton: { paddingVertical: 6, paddingHorizontal: 2 },
  editButtonText: { color: '#5A3825', fontSize: 11, fontWeight: '700' },
  editor: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#F9F5EF',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  editorLabel: {
    color: '#6F5944',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  editorOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  colorChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#FFFDFB',
  },
  selectedChoice: { borderColor: '#A05B39', backgroundColor: '#F4EBDD' },
  colorDot: { width: 13, height: 13, borderRadius: 7, borderWidth: 1, borderColor: '#D8C8B8' },
  sizeChoice: {
    minWidth: 34,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#FFFDFB',
  },
  choiceText: { color: '#4F3F34', fontSize: 11, fontWeight: '600' },
  editorActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 2 },
  cancelEditButton: { paddingHorizontal: 11, paddingVertical: 8 },
  cancelEditText: { color: '#6F5944', fontSize: 11, fontWeight: '700' },
  saveEditButton: {
    backgroundColor: '#5A3825',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveEditText: { color: '#FFFDFB', fontSize: 11, fontWeight: '700' },
  lineTotal: { color: '#2C221E', fontSize: 12, fontWeight: '800', marginLeft: 6 },
  summary: {
    padding: 14,
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#E9DECF',
    borderRadius: 12,
    marginTop: 8,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { color: '#6F5944', fontSize: 13, fontWeight: '600' },
  summaryValue: { color: '#2C221E', fontSize: 14, fontWeight: '700' },
  summaryNote: { color: '#8C7A6B', fontSize: 11, marginTop: 6 },
  summaryDivider: { height: 1, backgroundColor: '#E9DECF', marginVertical: 10 },
  totalLabel: { color: '#2C221E', fontSize: 15, fontWeight: '800' },
  totalValue: { color: '#A05B39', fontSize: 18, fontWeight: '800' },
  checkoutButton: {
    minHeight: 48,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A3825',
    borderRadius: 9,
  },
  checkoutButtonText: { color: '#FFFDFB', fontSize: 14, fontWeight: '700' },
  disabledCheckoutButton: { opacity: 0.45 },
  checkoutBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(25, 18, 14, 0.48)',
  },
  checkoutPanel: {
    maxHeight: '85%',
    padding: 20,
    backgroundColor: '#FFFDFB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  checkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkoutTitle: { color: '#2C221E', fontSize: 22, fontWeight: '800' },
  checkoutSubtitle: { color: '#6F5944', fontSize: 13, marginTop: 3 },
  checkoutClose: { color: '#6F5944', fontSize: 30, lineHeight: 32, paddingHorizontal: 6 },
  checkoutItems: { flexGrow: 0, maxHeight: 300 },
  checkoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9DECF',
  },
  checkoutItemCopy: { flex: 1, paddingRight: 12 },
  checkoutItemName: { color: '#2C221E', fontSize: 14, fontWeight: '700' },
  checkoutItemVariant: { color: '#746355', fontSize: 12, marginTop: 5 },
  checkoutItemTotal: { color: '#2C221E', fontSize: 13, fontWeight: '700' },
  checkoutTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  checkoutNotice: { color: '#8A7B6D', fontSize: 12, lineHeight: 18, marginTop: 12 },
  checkoutBackButton: {
    minHeight: 46,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#D8C8B8',
  },
  checkoutBackText: { color: '#5A3825', fontSize: 14, fontWeight: '700' },
});

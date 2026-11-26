import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { saveOrder } from '../data/store-database';

const PAYMENT_METHOD = 'Cash on Delivery (COD)';

export default function CheckoutFlow({
  cartItems,
  subtotal,
  disabled,
  onClearCart,
}) {
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [receiptError, setReceiptError] = useState('');

  const completeDemoCheckout = async () => {
    setCheckoutBusy(true);
    setCheckoutError('');

    try {
      const savedReceipt = await saveOrder(cartItems, PAYMENT_METHOD);
      setReceipt(savedReceipt);
      setCheckoutVisible(false);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : 'Could not save this order locally.'
      );
    } finally {
      setCheckoutBusy(false);
    }
  };

  const finishReceipt = async () => {
    setReceiptError('');
    const cleared = await onClearCart();

    if (cleared) {
      setReceipt(null);
    } else {
      setReceiptError('Could not clear the cart from this device. Please try again.');
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.checkoutButton, disabled && styles.disabledCheckoutButton]}
        onPress={() => setCheckoutVisible(true)}
        disabled={disabled}
        accessibilityRole="button">
        <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
      </TouchableOpacity>

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

            <View style={styles.paymentMethodSection}>
              <Text style={styles.paymentMethodLabel}>PAYMENT METHOD</Text>
              <View style={styles.paymentMethodOption}>
                <View style={styles.selectedRadio}>
                  <View style={styles.selectedRadioDot} />
                </View>
                <View style={styles.paymentMethodCopy}>
                  <Text style={styles.paymentMethodName}>{PAYMENT_METHOD}</Text>
                  <Text style={styles.paymentMethodDescription}>
                    Pay in cash when your order arrives.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.checkoutTotalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
            </View>
            <Text style={styles.checkoutNotice}>
              Local demo checkout. The order is saved on this device only; no payment is
              taken and no delivery is arranged.
            </Text>
            {checkoutError ? (
              <Text style={styles.checkoutError} accessibilityRole="alert">
                Could not save order: {checkoutError}
              </Text>
            ) : null}
            <TouchableOpacity
              style={[
                styles.completeCheckoutButton,
                checkoutBusy && styles.disabledCheckoutButton,
              ]}
              onPress={completeDemoCheckout}
              disabled={checkoutBusy}
              accessibilityRole="button">
              <Text style={styles.completeCheckoutText}>
                {checkoutBusy ? 'Saving order…' : 'Complete demo checkout'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkoutBackButton}
              onPress={() => setCheckoutVisible(false)}
              accessibilityRole="button">
              <Text style={styles.checkoutBackText}>Back to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ReceiptModal
        receipt={receipt}
        error={receiptError}
        onClose={() => {
          setReceiptError('');
          setReceipt(null);
        }}
        onDone={finishReceipt}
      />
    </>
  );
}

function ReceiptModal({ receipt, error, onClose, onDone }) {
  if (!receipt) {
    return null;
  }

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.receiptBackdrop}>
        <View style={styles.receiptPanel}>
          <Text style={styles.receiptCheck}>✓</Text>
          <Text style={styles.receiptTitle}>Your receipt</Text>
          <Text style={styles.demoLabel}>DEMO RECEIPT — NOT A REAL ORDER</Text>
          <Text style={styles.receiptMeta}>Order {receipt.orderNumber}</Text>
          <Text style={styles.receiptMeta}>{receipt.date}</Text>
          <View style={styles.receiptPayment}>
            <Text style={styles.receiptPaymentLabel}>Payment method</Text>
            <Text style={styles.receiptPaymentValue}>{receipt.paymentMethod}</Text>
          </View>

          <ScrollView
            style={styles.receiptItems}
            showsVerticalScrollIndicator={false}>
            {receipt.items.map((item) => (
              <View key={item.id} style={styles.receiptItem}>
                <View style={styles.receiptItemCopy}>
                  <Text style={styles.receiptItemName}>{item.productName}</Text>
                  <Text style={styles.receiptItemVariant}>
                    {item.color} · Size {item.size} · Qty {item.quantity}
                  </Text>
                </View>
                <Text style={styles.receiptItemTotal}>{formatPrice(item.total)}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.checkoutTotalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(receipt.total)}</Text>
          </View>
          <Text style={styles.checkoutNotice}>
            Saved locally for reference only. COD payment and order delivery are not active.
          </Text>
          {error ? (
            <Text style={styles.checkoutError} accessibilityRole="alert">
              {error}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.completeCheckoutButton}
            onPress={onDone}
            accessibilityRole="button">
            <Text style={styles.completeCheckoutText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function formatPrice(amount) {
  return `₱${amount.toLocaleString('en-PH', { maximumFractionDigits: 2 })}`;
}

const styles = StyleSheet.create({
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
  paymentMethodSection: { marginTop: 16 },
  paymentMethodLabel: {
    marginBottom: 8,
    color: '#8A6F58',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F7F1E9',
    borderWidth: 1,
    borderColor: '#A05B39',
    borderRadius: 9,
  },
  selectedRadio: {
    width: 18,
    height: 18,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#A05B39',
    borderRadius: 9,
  },
  selectedRadioDot: {
    width: 8,
    height: 8,
    backgroundColor: '#A05B39',
    borderRadius: 4,
  },
  paymentMethodCopy: { flex: 1 },
  paymentMethodName: { color: '#2C221E', fontSize: 13, fontWeight: '700' },
  paymentMethodDescription: { color: '#746355', fontSize: 11, marginTop: 3 },
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
  totalLabel: { color: '#2C221E', fontSize: 15, fontWeight: '800' },
  totalValue: { color: '#A05B39', fontSize: 18, fontWeight: '800' },
  checkoutNotice: { color: '#8A7B6D', fontSize: 12, lineHeight: 18, marginTop: 12 },
  checkoutError: { color: '#A12A24', fontSize: 12, lineHeight: 18, marginTop: 8 },
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
  completeCheckoutButton: {
    minHeight: 46,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A3825',
    borderRadius: 9,
  },
  completeCheckoutText: { color: '#FFFDFB', fontSize: 14, fontWeight: '700' },
  receiptBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(25, 18, 14, 0.48)',
  },
  receiptPanel: {
    width: '100%',
    maxWidth: 460,
    maxHeight: '90%',
    alignSelf: 'center',
    padding: 22,
    backgroundColor: '#FFFDFB',
    borderRadius: 18,
  },
  receiptCheck: {
    color: '#3D7256',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  receiptTitle: {
    marginTop: 6,
    color: '#2C221E',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  demoLabel: {
    marginTop: 8,
    color: '#A05B39',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  receiptMeta: {
    marginTop: 8,
    color: '#746355',
    fontSize: 12,
    textAlign: 'center',
  },
  receiptPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    marginTop: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E9DECF',
  },
  receiptPaymentLabel: { color: '#746355', fontSize: 12 },
  receiptPaymentValue: { color: '#2C221E', fontSize: 12, fontWeight: '700' },
  receiptItems: { flexGrow: 0, maxHeight: 260, marginTop: 16 },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9DECF',
  },
  receiptItemCopy: { flex: 1, paddingRight: 12 },
  receiptItemName: { color: '#2C221E', fontSize: 14, fontWeight: '700' },
  receiptItemVariant: { color: '#746355', fontSize: 12, marginTop: 5 },
  receiptItemTotal: { color: '#2C221E', fontSize: 13, fontWeight: '700' },
});

import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CartScreen from '../components/cart-screen';
import HomeScreen from '../components/home-screen';
import StoreBottomNavigation from '../components/store-bottom-navigation';
import StoreHeader from '../components/store-header';

export default function StoreScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cartItems, setCartItems] = useState([]);
  const [editingSelection, setEditingSelection] = useState(null);

  const addToCart = (product, size, color) => {
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      productName: product.name,
      price: product.price,
      image: product.image,
      color,
      size,
      baseProduct: product,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);
  };

  const startEditCartItem = (item) => {
    if (!item.baseProduct) {
      return;
    }

    setEditingSelection({
      itemId: item.id,
      color: item.color,
      size: item.size,
    });
  };

  const updateEditingSelection = (field, value) => {
    setEditingSelection((current) => {
      if (!current) {
        return current;
      }

      return { ...current, [field]: value };
    });
  };

  const saveCartItemEdit = (itemId, color, size) => {
    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, color, size } : cartItem,
      ),
    );
    setEditingSelection(null);
  };

  const cancelCartItemEdit = () => {
    setEditingSelection(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader
        cartCount={cartItems.length}
        onOpenCart={() => setActiveTab('Cart')}
      />
      <View style={styles.content}>
        {activeTab === 'Home' ? (
          <HomeScreen onAddToCart={addToCart} />
        ) : (
          <CartScreen
            cartItems={cartItems}
            editingSelection={editingSelection}
            onEditItem={startEditCartItem}
            onUpdateEditingSelection={updateEditingSelection}
            onSaveEdit={saveCartItemEdit}
            onCancelEdit={cancelCartItemEdit}
            onDeleteItem={(id) =>
              setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
            }
            onClearCart={() => setCartItems([])}
          />
        )}
      </View>
      <StoreBottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4EBDD' },
  content: { flex: 1 },
});
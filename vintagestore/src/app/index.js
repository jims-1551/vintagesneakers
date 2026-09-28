import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CartScreen from '../components/cart-screen';
import HomeScreen from '../components/home-screen';
import StoreBottomNavigation from '../components/store-bottom-navigation';
import StoreHeader from '../components/store-header';

export default function StoreScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cartItems, setCartItems] = useState([]);

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

  const editCartItem = (item) => {
    if (!item.baseProduct) {
      return;
    }

    const colors = item.baseProduct.colors.map((color) => color.name);
    const sizes = item.baseProduct.sizes;
    const nextColor = colors[(colors.indexOf(item.color) + 1) % colors.length];
    const nextSize = sizes[(sizes.indexOf(item.size) + 1) % sizes.length];

    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, color: nextColor, size: nextSize } : cartItem,
      ),
    );
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
            onEditItem={editCartItem}
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
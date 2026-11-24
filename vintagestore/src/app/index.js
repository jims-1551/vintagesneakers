import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import CartScreen from '../components/cart-screen';
import HomeScreen from '../components/home-screen';
import StoreBottomNavigation from '../components/store-bottom-navigation';
import StoreHeader from '../components/store-header';

export default function StoreScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cartItems, setCartItems] = useState([]);
  
   //ini an code para mahingadto an product sa cart
  const addToCart = (product, size, color) => {
    const cartItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      productName: product.name,
      category: product.category,
      unitPrice: Number(String(product.price).replace(/[^\d.]/g, '')),
      image: product.image,
      availableColors: product.colors,
      availableSizes: product.sizes,
      color,
      size,
      quantity: 1,
    };

    setCartItems((currentItems) => {
      const matchingItem = currentItems.find(
        (item) =>
          item.productName === cartItem.productName &&
          item.color === cartItem.color &&
          item.size === cartItem.size
      );

      if (!matchingItem) {
        return [...currentItems, cartItem];
      }

      return currentItems.map((item) =>
        item.id === matchingItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const updateCartQuantity = (id, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const editCartVariant = (id, color, size) => {
    setCartItems((currentItems) => {
      const editedItem = currentItems.find((item) => item.id === id);

      if (!editedItem) {
        return currentItems;
      }

      const matchingItem = currentItems.find(
        (item) =>
          item.id !== id &&
          item.productName === editedItem.productName &&
          item.color === color &&
          item.size === size
      );

      if (matchingItem) {
        return currentItems.flatMap((item) => {
          if (item.id === id) {
            return [];
          }

          if (item.id === matchingItem.id) {
            return [{ ...item, quantity: item.quantity + editedItem.quantity }];
          }

          return [item];
        });
      }

      return currentItems.map((item) =>
        item.id === id ? { ...item, color, size } : item
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader
        
        //ini an code para mahingadto an cart screen kun gin click an cart icon
        cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        onOpenCart={() => setActiveTab('Cart')}
      />
      <View style={styles.content}>
        {activeTab === 'Home' ? (
          <HomeScreen onAddToCart={addToCart} />
        ) : (

          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onEditVariant={editCartVariant}
            onContinueShopping={() => setActiveTab('Home')}
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
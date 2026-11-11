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
      price: product.price,
      image: product.image,
      color,
      size,
    };

    setCartItems((currentItems) => [...currentItems, cartItem]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StoreHeader
        
        //ini an code para mahingadto an cart screen kun gin click an cart icon
        cartCount={cartItems.length}
        onOpenCart={() => setActiveTab('Cart')}
      />
      <View style={styles.content}>
        {activeTab === 'Home' ? (
          <HomeScreen onAddToCart={addToCart} />
        ) : (

          <CartScreen
            cartItems={cartItems}
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
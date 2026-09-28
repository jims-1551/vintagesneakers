import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const categories = ['All', 'Basketball', 'Running', 'Skate', 'High-Top'];
const products = [
  {
    name: 'Red Nike Flyknit',
    price: '₱999',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Red', value: '#2C221E' },
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#ff4a02' },
    ],
  },
  {
    name: 'Nike Air Max',
    price: '₱1200',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Blue', value: '#2C221E' },
      { name: 'Cream', value: '#EADCC6' },
      { name: 'Gray', value: '#817e7b' },
    ],
  },
  {
    name: 'Air Jordan 1',
    price: '₱1200',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', value: '#2C221E' },
      { name: 'Black', value: '#F7F3EE' },
      { name: 'Brown', value: '#8D5E3C' },
    ],
  },
  {
    name: 'Puma Smash V2, Perforated Leather',
    price: '₱999',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Orange', value: '#2C221E' },
      { name: 'Green', value: '#F7F3EE' },
      { name: 'Beige', value: '#D4B894' },
    ],
  },
  {
    name: 'Nike Sneaker',
    price: '₱1200',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Gold', value: '#2C221E' },
      { name: 'Navy', value: '#F7F3EE' },
      { name: 'Pink', value: '#D89CB0' },
    ],
  },
  {
    name: 'Adidas Superstar',
    price: '₱1400',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=85',
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Blue', value: '#4F6E8E' },
    ],
  },
];

export default function HomeScreen({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconText}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Maghanap ng vintage items..."
          placeholderTextColor="#3B2418"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Text style={styles.clearText} onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      <View style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryChip, activeCategory === category && styles.activeCategoryChip]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.productGrid} showsVerticalScrollIndicator={false}>
        {products.map((product) => {
          const isSelected = selectedProduct === product.name;
          const selectedColor = selectedColors[product.name] || product.colors[0].name;
          const selectedSize = selectedSizes[product.name];

          return (
            <View key={product.name} style={styles.productCard}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setSelectedProduct(isSelected ? null : product.name)}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                  accessibilityLabel={product.name}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>

              {isSelected && (
                <View style={styles.optionContainer}>
                  <Text style={styles.sizeLabel}>Select color</Text>
                  <View style={styles.colorRow}>
                    {product.colors.map((color) => {
                      const isActive = selectedColor === color.name;

                      return (
                        <TouchableOpacity
                          key={color.name}
                          style={[
                            styles.colorOption,
                            { backgroundColor: color.value },
                            isActive && styles.activeColorOption,
                          ]}
                          onPress={() =>
                            setSelectedColors((current) => ({ ...current, [product.name]: color.name }))
                          }
                          accessibilityLabel={`Choose ${color.name} color`}
                        >
                          {isActive && <Text style={styles.colorCheck}>✓</Text>}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <Text style={styles.sizeLabel}>Select size</Text>
                  <View style={styles.sizeRow}>
                    {product.sizes.map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[styles.sizeOption, selectedSize === size && styles.activeSizeOption]}
                        onPress={() =>
                          setSelectedSizes((current) => ({ ...current, [product.name]: size }))
                        }
                      >
                        <Text style={styles.sizeOptionText}>{size}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={styles.productAddButton}
                onPress={() => {
                  if (selectedSize == null) {
                    alert('Please select a size before adding this item to your cart.');
                    return;
                  }

                  onAddToCart(product, selectedSize, selectedColor);
                  alert(`Added ${selectedColor} ${product.name} in size ${selectedSize} to cart`);
                }}
              >
                <Text style={styles.productAddText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F3EE',
    marginHorizontal: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6DFD5',
    elevation: 2,
  },
  searchIconText: { marginRight: 10, fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: '#2C221E' },
  clearText: { fontSize: 16, color: '#8C7A6B', paddingHorizontal: 4 },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  categoryChip: {
    backgroundColor: '#F8F3EE',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  activeCategoryChip: { backgroundColor: '#2C221E', borderColor: '#2C221E' },
  categoryText: { color: '#4F3F34', fontSize: 12, fontWeight: '600' },
  activeCategoryText: { color: '#FFFDFB' },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  productCard: {
    width: '48%',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FFFDFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  productImage: { width: '100%', height: 132, backgroundColor: '#EED7CB', borderRadius: 6 },
  productName: { marginTop: 8, color: '#2C221E', fontSize: 13, fontWeight: '600' },
  productPrice: { marginTop: 3, color: '#A05B39', fontSize: 13, fontWeight: '700' },
  optionContainer: { marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E9DECF' },
  sizeLabel: {
    color: '#6F5944',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colorRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, gap: 6 },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2D5C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeColorOption: { borderWidth: 2, borderColor: '#2C221E', transform: [{ scale: 1.05 }] },
  colorCheck: {
    color: '#FFFDFB',
    fontSize: 11,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sizeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  sizeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F4EBDD',
    borderWidth: 1,
    borderColor: '#E2D5C2',
  },
  activeSizeOption: { backgroundColor: '#E8D3BF', borderColor: '#8D5E3C', borderWidth: 2 },
  sizeOptionText: { color: '#2C221E', fontSize: 12, fontWeight: '700' },
  productAddButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#5A3825',
    borderRadius: 6,
  },
  productAddText: { color: '#FFFDFB', fontSize: 12, fontWeight: '700' },
});
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

// Listahan ng mga category filter sa homepage tulad ng basketball, running, at skate.
const categories = ['All', 'Sneakers', 'Shorts', 'T-shirts', 'Jackets' , 'caps'];

// Ang mga product na ginpapakita sa shop. Ang bawat item ay may pangalan, presyo, larawan, available sizes, at color options.
const products = [
  {
    name: 'Red Nike Flyknit',
    category: 'Sneakers',
    price: '₱999',
    image: require('../../assets/images/rednike.jpg'),
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Red', value: '#2C221E' },
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#ff4a02' },
    ],
    details: [
      { label: 'Style', value: 'Running' },
      { label: 'Material', value: 'Flyknit mesh' },
      { label: 'Condition', value: 'Very good' },
    ],
  },
  {
    name: 'Nike Air Max',
    category: 'Sneakers',
    price: '₱1200',
    image: require('../../assets/images/nikeairmax.avif'),
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Blue', value: '#2C221E' },
      { name: 'Cream', value: '#EADCC6' },
      { name: 'Gray', value: '#817e7b' },
    ],
    details: [
      { label: 'Style', value: 'Lifestyle' },
      { label: 'Material', value: 'Leather + air sole' },
      { label: 'Condition', value: 'Excellent' },
    ],
  },
  {
    name: 'Air Jordan 1',
    category: 'Sneakers',
    price: '₱1200',
    image: require('../../assets/images/airjordan1.avif'),
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', value: '#2C221E' },
      { name: 'Black', value: '#F7F3EE' },
      { name: 'Brown', value: '#8D5E3C' },
    ],
    details: [
      { label: 'Style', value: 'High-top' },
      { label: 'Material', value: 'Leather upper' },
      { label: 'Condition', value: 'Collector grade' },
    ],
  },
  {
    name: 'Puma Smash V2, Perforated Leather',
    category: 'Sneakers',
    price: '₱999',
    image: require('../../assets/images/puma.avif'),
    sizes: [ '5', '6', '7', '8', '9', '10', '11' ],
    colors: [
      { name: 'Orange', value: '#2C221E' },
      { name: 'Green', value: '#F7F3EE' },
      { name: 'Beige', value: '#D4B894' },
    ],
    details: [
      { label: 'Style', value: 'Skate' },
      { label: 'Material', value: 'Perforated leather' },
      { label: 'Condition', value: 'Good' },
    ],
  },
  {
    name: 'Carhartt double knee work pant',
    category: 'Pants',
    price: '₱1200',
    image: require('../../assets/images/carhartt.jpg'),
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'Gold', value: '#2C221E' },
      { name: 'Navy', value: '#F7F3EE' },
      { name: 'Pink', value: '#D89CB0' },
    ],
    details: [
      { label: 'Style', value: 'Streetwear' },
      { label: 'Material', value: 'maong' },
      { label: 'Condition', value: 'Lightly worn' },
    ],
  },
  {
    name: 'Jnco',
    category: 'Pants',
    price: '₱1200',
    image: require('../../assets/images/jnco.jpg'),
    sizes: [ 'm' , 'l', 'xl' ],
    colors: [
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#551e08' },
      { name: 'Blue', value: '#050a0f' },
    ],
    details: [
      { label: 'Style', value: 'Classic' },
      { label: 'Material', value: 'suede' },
      { label: 'Condition', value: 'Excellent' },
    ],
  },
  {
    name: 'Dbtk',
    category: 'T-shirts',
    price: '₱1200',
    image: require('../../assets/images/dbtk.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'Cream', value: '#F5E8D1' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Navy', value: '#243C5E' },
    ],
    details: [
      { label: 'Style', value: 'gengs' },
      { label: 'Material', value: 'cotton' },
      { label: 'Condition', value: 'Good' },
    ],
  },
  {
    name: 'los grasyas',
    category: 'Shorts',
    price: '₱699',
    image: require('../../assets/images/grasya.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'White', value: '#075275' },
      { name: 'Black', value: '#0c0502' },
      { name: 'Grey', value: '#d4cab5' },
    ],
    details: [
      { label: 'Style', value: 'gengs' },
      { label: 'Material', value: 'Leather' },
      { label: 'Condition', value: 'Very good' },
    ],
  },
  {
    name: 'crave',
    category: 'T-shirts',
    price: '₱799',
    image: require('../../assets/images/crave.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'Black', value: '#2C221E' },
      { name: 'Cream', value: '#F7F3EE' },
      { name: 'Brown', value: '#8A6644' },
    ],
    details: [
      { label: 'Style', value: 'Skate' },
      { label: 'Material', value: 'cotton' },
      { label: 'Condition', value: 'Lightly worn' },
    ],
  },
  {
    name: 'Productive',
    category: 'Jackets',
    price: '₱1500',
    image: require('../../assets/images/pro.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Red', value: '#B24E44' },
    ],
    details: [
      { label: 'Style', value: 'gengs' },
      { label: 'Material', value: 'cotton' },
      { label: 'Condition', value: 'Clean used' },
    ],
  },
  {
    name: 'Pretiest',
    category: 'Jackets',
    price: '₱1500',
    image: require('../../assets/images/pretiest.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'Gray', value: '#9DA3A6' },
      { name: 'White', value: '#F7F3EE' },
      { name: 'Blue', value: '#596D7E' },
    ],
    details: [
      { label: 'Style', value: 'casual' },
      { label: 'Material', value: 'Mesh' },
      { label: 'Condition', value: 'Excellent' },
    ],
  },
  {
    name: 'Malaag',
    category: 'T-shirts',
    price: '₱600',
    image: require('../../assets/images/malaag.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'Silver', value: '#C4C7CB' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Blue', value: '#3D5D86' },
    ],
    details: [
      { label: 'Style', value: 'gengs' },
      { label: 'Material', value: 'cotton' },
      { label: 'Condition', value: 'Premium' },
    ],
  },
  {
    name: 'Hassuru',
    category: 'Shorts',
    price: '₱499',
    image: require('../../assets/images/hassuru.jpg'),
    sizes: [ 's', 'm', 'l', 'xl' ],
    colors: [
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Gray', value: '#8C8B8A' },
    ],
    details: [
      { label: 'Style', value: 'jorts' },
      { label: 'Material', value: 'maong' },
      { label: 'Condition', value: 'New' },
    ],
  },
  {
    name: 'Tambay v22',
    category: 'caps',
    price: '₱1299',
    image: require('../../assets/images/tambay.jpg'),
    sizes: [5, 6, 7, 8, 9, 10, 11],
    colors: [
      { name: 'White', value: '#F7F3EE' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Tan', value: '#C7A77B' },
    ],
    details: [
      { label: 'Style', value: 'Minimal' },
      { label: 'Material', value: 'Canvas upper' },
      { label: 'Condition', value: 'Very good' },
    ],
  },
  {
    name: 'Rolex Gold(two tone)',
    category: 'watch',
    price: '₱1599',
    image: require('../../assets/images/relo.jpg'),
    sizes: [ '39mm', '49mm' ],
    colors: [
      { name: 'Beige', value: '#D8C8AE' },
      { name: 'Black', value: '#2C221E' },
      { name: 'Olive', value: '#69765B' },
    ],
    details: [
      { label: 'Style', value: 'Casual' },
      { label: 'Material', value: 'metal' },
      { label: 'Condition', value: 'Brand new' },
    ],
  },
];

export default function HomeScreen({ onAddToCart }) {
  // Ginagamit para mag-type at mag-filter ng product sa search bar.
  const [searchQuery, setSearchQuery] = useState('');
  // Kung aling category ang currently active, halimbawa: All o Running.
  const [activeCategory, setActiveCategory] = useState('All');
  // Kung aling product card ang currently opened para makita ang option ng color/size.
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Nag-iimbak ng napiling kulay per product para ma-preserve ang state.
  const [selectedColors, setSelectedColors] = useState({});
  // Nag-iimbak ng napiling size per product bago i-add sa cart.
  const [selectedSizes, setSelectedSizes] = useState({});

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search bar para maghanap ng item sa store. */}
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

      {/* Row ng category chips. Kapag pinindot, magbabago ang active category. */}
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

      {/* Listahan ng products na naka-wrap sa ScrollView para scrollable ang page. */}
      <ScrollView contentContainerStyle={styles.productGrid} showsVerticalScrollIndicator={false}>
        {filteredProducts.length === 0 ? (
          <Text style={styles.emptyState}>No shoes match your search.</Text>
        ) : (
          filteredProducts.map((product) => {
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
                    source={product.image }
                    style={styles.productImage}
                    resizeMode="cover"
                    accessibilityLabel={product.name}
                  />
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </TouchableOpacity>

                {/* Kapag pinindot ang product card, ipinapakita ang color, size, at shoe details. */}
                {isSelected && (
                  <View style={styles.optionContainer}>
                    <Text style={styles.sizeLabel}>Details</Text>
                    <View style={styles.detailGrid}>
                      {product.details.map((detail) => (
                        <View key={detail.label} style={styles.detailItem}>
                          <Text style={styles.detailLabel}>{detail.label}</Text>
                          <Text style={styles.detailValue}>{detail.value}</Text>
                        </View>
                      ))}
                    </View>

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

                {/* Button na nagdadagdag ng napiling item sa cart. Dapat may selected size bago ma-add. */}
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
          })
        )}
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
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 6,
  },
  detailItem: {
    width: '31%',
    paddingVertical: 6,
    paddingHorizontal: 5,
    backgroundColor: '#F7F1E9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBDCC8',
  },
  detailLabel: { color: '#8A6F58', fontSize: 9, fontWeight: '600', marginBottom: 2 },
  detailValue: { color: '#2C221E', fontSize: 9, fontWeight: '700' },
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
  emptyState: {
    width: '100%',
    paddingVertical: 24,
    textAlign: 'center',
    color: '#6F5944',
    fontSize: 14,
    fontWeight: '600',
  },
  productAddButton: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#5A3825',
    borderRadius: 6,
  },
  productAddText: { color: '#FFFDFB', fontSize: 12, fontWeight: '700' },
});
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search sneakers, clothes, accessories..."
        placeholderTextColor="#9A8C7E"
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Search products"
      />
      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText('')}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Text style={styles.clearText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    marginHorizontal: 20,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#E2D5C2',
    borderRadius: 10,
  },
  searchIcon: {
    width: 44,
    textAlign: 'center',
    color: '#A05B39',
    fontSize: 22,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#2C221E',
    fontSize: 14,
  },
  clearButton: {
    width: 38,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: '#8C7A6B',
    fontSize: 24,
    lineHeight: 26,
  },
});
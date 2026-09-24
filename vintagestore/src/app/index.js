import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vintage Store</Text>
        <Text style={styles.subtitle}>Welcome to your shop</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconText}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Maghanap ng vintage items..."
          placeholderTextColor="#A89F91"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <Text style={styles.clearText} onPress={() => setSearchQuery('')}>
            ✕
          </Text>
        )}
      </View>

      {/* Main Content Area */}
      <View style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C221E',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8C7A6B',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6DFD5',
    elevation: 2,
  },
  searchIconText: {
    marginRight: 10,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C221E',
  },
  clearText: {
    fontSize: 16,
    color: '#8C7A6B',
    paddingHorizontal: 4,
  },
  content: {
    flex: 1,
  },
});
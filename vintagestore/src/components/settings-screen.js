import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen({
  categories,
  selectedCategory,
  onSelectCategory,
  email,
  onSignOut,
}) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Personalize your shopping experience.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>USER ACCOUNT</Text>
        <View style={styles.accountCard}>
          <View style={styles.accountDetails}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{email ? email[0].toUpperCase() : 'G'}</Text>
            </View>
            <View style={styles.accountCopy}>
              <Text style={styles.accountName}>{email ? 'Demo account' : 'Guest session'}</Text>
              <Text style={styles.accountEmail}>
                {email || 'Browsing as a guest'}
              </Text>
            </View>
          </View>
          <Text style={styles.accountNote}>
            Demo profile only. Account verification isn't connected yet.
          </Text>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={onSignOut}
            accessibilityRole="button">
            <Text style={styles.signOutText}>{email ? 'Sign out' : 'Return to sign in'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SHOPPING PREFERENCES</Text>
        <View style={styles.preferenceCard}>
          <Text style={styles.preferenceTitle}>Default product category</Text>
          <Text style={styles.preferenceDescription}>
            Choose the category selected when you return to Home during this session.
          </Text>
          <View style={styles.categoryList}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryOption, isSelected && styles.selectedCategoryOption]}
                  onPress={() => onSelectCategory(category)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}>
                  <Text
                    style={[
                      styles.categoryOptionText,
                      isSelected && styles.selectedCategoryOptionText,
                    ]}>
                    {category}
                  </Text>
                  {isSelected ? <Text style={styles.checkmark}>✓</Text> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    color: '#2C221E',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 5,
    color: '#6F5944',
    fontSize: 14,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    marginBottom: 10,
    color: '#8A6F58',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  accountCard: {
    padding: 16,
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: '#2C221E',
  },
  avatarText: {
    color: '#FFFDFB',
    fontSize: 18,
    fontWeight: '800',
  },
  accountCopy: {
    flex: 1,
  },
  accountName: {
    color: '#2C221E',
    fontSize: 15,
    fontWeight: '700',
  },
  accountEmail: {
    marginTop: 4,
    color: '#746355',
    fontSize: 13,
  },
  accountNote: {
    marginTop: 14,
    color: '#8A7B6D',
    fontSize: 11,
    lineHeight: 16,
  },
  signOutButton: {
    minHeight: 42,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8C8B8',
  },
  signOutText: {
    color: '#8B4A35',
    fontSize: 13,
    fontWeight: '700',
  },
  preferenceCard: {
    padding: 16,
    backgroundColor: '#FFFDFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  preferenceTitle: {
    color: '#2C221E',
    fontSize: 16,
    fontWeight: '700',
  },
  preferenceDescription: {
    marginTop: 5,
    color: '#746355',
    fontSize: 13,
    lineHeight: 19,
  },
  categoryList: {
    gap: 8,
    marginTop: 16,
  },
  categoryOption: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#FAF6F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9DECF',
  },
  selectedCategoryOption: {
    backgroundColor: '#F4EBDD',
    borderColor: '#A05B39',
  },
  categoryOptionText: {
    color: '#4F3F34',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryOptionText: {
    color: '#2C221E',
    fontWeight: '700',
  },
  checkmark: {
    color: '#A05B39',
    fontSize: 16,
    fontWeight: '800',
  },
});

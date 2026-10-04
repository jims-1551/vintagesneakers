import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Bottom navigation tabs para lumipat sa Home at Cart screen.
const tabs = [
  { name: 'Home', icon: '🏠' },
  { name: 'Cart', icon: '🛒' },
];

export default function StoreBottomNavigation({ activeTab, onChangeTab }) {
  return (
    <View style={styles.bottomNav}>
      {/* Ipinapakita ang bawat tab at tinitingnan kung active ang selected tab. */}
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => onChangeTab(tab.name)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.navIcon, isActive && styles.activeNavText]}>{tab.icon}</Text>
            <Text style={[styles.navLabel, isActive && styles.activeNavText]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFDFB',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9DECF',
  },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 20, opacity: 0.5 },
  navLabel: { fontSize: 12, color: '#8C7A6B', marginTop: 2, fontWeight: '600' },
  activeNavText: { opacity: 1, color: '#A05B39' },
});
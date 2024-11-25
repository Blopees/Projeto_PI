import { Stack, Link } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';

export default function RootLayout() {
  const pathname = usePathname(); 

  // Verifica se o pathname não é '/' ou '/Registro/registro'
  const showNavBar = pathname !== '/' && pathname !== '/Registro/registro';

  return (
    <View style={{ flex: 1 }}>
      <Stack />

      {/* Condicional para renderizar a barra de navegação */}
      {showNavBar && (
        <View style={styles.navBar}>
          <Text>
            <Link href="/interno/inicio">
              <Ionicons name="home" size={30} color="#08c75d" style={styles.icon} />
            </Link>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  icon: {
    padding: 10,
  },
});

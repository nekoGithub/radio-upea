import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// Prevenir ocultado automático del splash
SplashScreen.preventAutoHideAsync();

export default function CustomSplash() {
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      // Simula carga de datos u otros efectos
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Oculta el splash nativo
      await SplashScreen.hideAsync();

      // Navega a la vista principal
      router.replace('/(tabs)');
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003070', // fondo azul
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // para que no quede pegado a los bordes
  },
  image: {
    width: '100%',       // ocupa todo el ancho posible
    height: undefined,   // la altura se ajusta automáticamente
    aspectRatio: 1,      // mantiene la proporción cuadrada
  },
});

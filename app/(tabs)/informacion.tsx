import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InformacionScreen: React.FC = () => {
  const handleSocialMediaPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const handleMenuPress = (option: string) => {
    console.log(`Pressed: ${option}`);
    // Aquí puedes agregar la navegación o lógica específica para cada opción
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Información</Text>
      </View>

      {/* Version Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Versión</Text>
          <Text style={styles.infoValue}>v1.0</Text>
        </View>

        {/* Radio UPEA Section */}
        <View style={styles.radioSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../assets/images/logo.jpg')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.radioInfo}>
            <Text style={styles.radioTitle}>Radio UPEA</Text>
            <Text style={styles.radioSubtitle}>Tu radio favorita en línea</Text>
          </View>
        </View>

        {/* Menu Options */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Términos de servicio')}
        >
          <Text style={styles.menuItemText}>Términos de servicio</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Política de privacidad')}
        >
          <Text style={styles.menuItemText}>Política de privacidad</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Contacto')}
        >
          <Text style={styles.menuItemText}>Contacto</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Social Media Section */}
      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Redes sociales</Text>

        <TouchableOpacity
          style={[styles.socialButton, styles.youtubeButton]}
          onPress={() => handleSocialMediaPress('https://youtube.com/@radioupea')}
        >
          <Ionicons name="logo-youtube" size={24} color="white" />
          <Text style={[styles.socialButtonText, styles.whiteText]}>Youtube</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => handleSocialMediaPress('https://facebook.com/radioupea')}
        >
          <Ionicons name="logo-facebook" size={24} color="white" />
          <Text style={[styles.socialButtonText, styles.whiteText]}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.tiktokButton]}
          onPress={() => handleSocialMediaPress('https://tiktok.com/@radioupea')}
        >
          <Ionicons name="logo-tiktok" size={24} color="white" />
          <Text style={[styles.socialButtonText, styles.whiteText]}>Tik Tok</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingTop: 45,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  infoSection: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  radioSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc', // opcional: por si hay un pequeño espacio
  },

  logoImage: {
    width: '100%',
    height: '100%',
  },
  radioInfo: {
    alignItems: 'center',
  },
  radioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  radioSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  socialSection: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
  },
  whiteText: {
    color: 'white',
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  tiktokButton: {
    backgroundColor: '#000000',
  },
});

export default InformacionScreen;
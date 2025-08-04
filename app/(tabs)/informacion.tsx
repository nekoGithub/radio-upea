import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Información</Text>
          <Text style={styles.headerSubtitle}>Radio UPEA</Text>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Version Info */}
          <View style={styles.versionSection}>
            <Text style={styles.versionLabel}>Versión actual</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionValue}>v2.0.0</Text>
            </View>
          </View>

          {/* Radio UPEA Section */}
          <View style={styles.radioSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo.jpg')}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.radioInfo}>
              <Text style={styles.radioTitle}>Radio UPEA</Text>
              <Text style={styles.radioSubtitle}>Tu radio favorita en línea</Text>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Configuración</Text>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuPress('Términos de servicio')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: '#007AFF20' }]}>
                  <Ionicons name="document-text" size={20} color="#007AFF" />
                </View>
                <Text style={styles.menuItemText}>Términos de servicio</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuPress('Política de privacidad')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: '#34C75920' }]}>
                  <Ionicons name="shield-checkmark" size={20} color="#34C759" />
                </View>
                <Text style={styles.menuItemText}>Política de privacidad</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuPress('Contacto')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: '#FF951520' }]}>
                  <Ionicons name="mail" size={20} color="#FF9515" />
                </View>
                <Text style={styles.menuItemText}>Contacto</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Media Section */}
        <View style={styles.socialCard}>
          <Text style={styles.socialTitle}>Síguenos en redes sociales</Text>
          
          <TouchableOpacity 
            style={[styles.socialButton, styles.youtubeButton]}
            onPress={() => handleSocialMediaPress('https://youtube.com/@radioupea')}
          >
            <Ionicons name="logo-youtube" size={24} color="white" />
            <Text style={[styles.socialButtonText, styles.whiteText]}>YouTube</Text>
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
            <Text style={[styles.socialButtonText, styles.whiteText]}>TikTok</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: "10%",
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  mainCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  versionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  versionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  versionBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  versionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  radioSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  radioInfo: {
    alignItems: 'center',
  },
  radioTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  radioSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  socialCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
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
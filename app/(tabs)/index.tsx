import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RadioScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationValues] = useState(
    Array.from({ length: 40 }, () => new Animated.Value(Math.random() * 30 + 4))
  );

  // Función para generar nuevas alturas aleatorias
  const generateRandomHeight = () => Math.random() * 25 + 4;

  // Animación del visualizador
  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        animationValues.forEach((animValue, index) => {
          Animated.timing(animValue, {
            toValue: generateRandomHeight(),
            duration: 150 + Math.random() * 100,
            useNativeDriver: false,
          }).start();
        });
      }, 200);
    } else {
      // Cuando no está reproduciendo, resetear a valores bajos
      animationValues.forEach((animValue) => {
        Animated.timing(animValue, {
          toValue: 4,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const audioLevels = [
    4, 8, 6, 12, 10, 15, 8, 18, 14, 20, 16, 22, 12, 25, 18, 28, 20, 24, 16, 30,
    26, 22, 18, 14, 10, 16, 20, 24, 18, 12, 8, 6, 10, 14, 18, 22, 16, 12, 8, 4
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.liveContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <TouchableOpacity>
          <Feather name="share" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <View style={styles.cardContainer}>
        <ImageBackground
          source={require('../../assets/images/radioupea.png')}
          style={styles.card}
          imageStyle={{ borderRadius: 24 }}
          resizeMode="contain"
        >


          {/* Sound waves */}
          <View style={styles.soundWaves}>
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.soundWave,
                  {
                    width: 60 + i * 20,
                    height: 60 + i * 20,
                    opacity: 0.3 - i * 0.05,
                  }
                ]}
              />
            ))}
          </View>
        </ImageBackground>

      </View>
      {/* Live Badge */}
      <View style={styles.liveBadge}>
        <Text style={styles.liveBadgeText}>LIVE</Text>
      </View>


      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="volume-off" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <MaterialIcons name="thumb-up" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Frequency Display */}
      <Text style={styles.frequency}>FM 100.0</Text>

      {/* Audio Visualizer */}
      <View style={styles.visualizer}>
        {audioLevels.map((level, index) => (
          <View
            key={index}
            style={[
              styles.audioBar,
              {
                height: level,
                backgroundColor: `hsl(${(index * 9) % 360}, 70%, 60%)`,
              }
            ]}
          />
        ))}
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: -5,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4444',
    marginRight: 8,
  },
  liveText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardContainer: {
    marginHorizontal: 40,
    marginBottom: 0,
    marginTop: 40, // 👈 bajamos más la imagen
    position: 'relative',
  },
  card: {
    borderRadius: 24,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 340, // 👈 aumentamos tamaño de imagen
    position: 'relative',
    overflow: 'hidden',
  },


  radioTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  microphonesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 20,
  },
  microphoneWrapper: {
    alignItems: 'center',
  },
  classicMic: {
    alignItems: 'center',
  },
  micTop: {
    width: 30,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
  micBody: {
    width: 24,
    height: 60,
    backgroundColor: '#F5F5F5',
    marginTop: -5,
  },
  micStand: {
    width: 3,
    height: 30,
    backgroundColor: '#757575',
  },
  micBase: {
    width: 20,
    height: 8,
    backgroundColor: '#424242',
    borderRadius: 4,
  },
  modernMic: {
    alignItems: 'center',
  },
  modernMicBody: {
    width: 25,
    height: 80,
    borderRadius: 12,
  },
  modernMicMesh: {
    position: 'absolute',
    top: 10,
    width: 20,
    height: 50,
    backgroundColor: '#666',
    borderRadius: 10,
    opacity: 0.7,
  },
  soundWaves: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  soundWave: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
  },
  liveBadge: {
    // elimina position absolute
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-end', // para que quede a la derecha debajo de la imagen
    marginRight: 50,        // igual que margen horizontal del contenedor
    marginTop: 8,
    marginBottom: 20,          // espacio arriba del texto LIVE
  },

  liveBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#003070',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  frequency: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  visualizer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 60,
    marginHorizontal: 20,
    marginBottom: 30,
    gap: 2,
  },
  audioBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 4,
  },
  cardOverlay: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

});

export default RadioScreen;
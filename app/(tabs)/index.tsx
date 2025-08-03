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
  Animated,
  Share
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const RadioScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
    console.log(isPlaying ? 'Pausando radio...' : 'Reproduciendo radio...');
    // Aquí puedes agregar la lógica para conectar/desconectar el stream de audio
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? 'Audio activado' : 'Audio silenciado');
    // Aquí puedes agregar la lógica para silenciar/activar el audio
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? 'Like removido' : 'Like agregado');
    // Aquí puedes agregar la lógica para guardar el like en preferencias
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: '¡Escucha Radio UPEA en vivo! Tu radio favorita en línea - FM 100.0',
        title: 'Radio UPEA',
        url: 'https://radioupea.com', // Reemplaza con tu URL real
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartido via:', result.activityType);
        } else {
          console.log('Compartido exitosamente');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartir cancelado');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  // Usar los valores animados para el visualizador
  const audioLevels = animationValues.map((animValue, index) => ({
    animValue,
    staticHeight: [4, 8, 6, 12, 10, 15, 8, 18, 14, 20, 16, 22, 12, 25, 18, 28, 20, 24, 16, 30,
      26, 22, 18, 14, 10, 16, 20, 24, 18, 12, 8, 6, 10, 14, 18, 22, 16, 12, 8, 4][index] || 4
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.liveContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
          <Feather name="share" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <View style={styles.cardContainer}>
        <ImageBackground
          source={require('../../assets/images/radioupea.png')}
          style={styles.card}
          imageStyle={{ borderRadius: 15 }}
          resizeMode="cover"
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
                    opacity: isPlaying ? 0.3 - i * 0.05 : 0.1,
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
        <TouchableOpacity 
          style={[
            styles.controlButton,
            isMuted && { backgroundColor: '#FF4444' }
          ]}
          onPress={toggleMute}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name={isMuted ? "volume-off" : "volume-up"} 
            size={28} 
            color={isMuted ? "white" : "#333"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.playButton}
          onPress={togglePlayPause}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={32} 
            color="white"
            style={!isPlaying && { paddingLeft: 4 }}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.controlButton,
            isLiked && { backgroundColor: '#FF4444' }
          ]}
          onPress={toggleLike}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name={isLiked ? "thumb-up" : "thumb-up-off-alt"} 
            size={28} 
            color={isLiked ? "white" : "#333"} 
          />
        </TouchableOpacity>
      </View>

      {/* Frequency Display */}
      <Text style={styles.frequency}>FM 100.0</Text>

      {/* Audio Visualizer */}
      <View style={styles.visualizer}>
        {audioLevels.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.audioBar,
              {
                height: isPlaying ? item.animValue : item.staticHeight,
                backgroundColor: isPlaying 
                  ? `hsl(${(index * 9) % 360}, 70%, 60%)`
                  : '#e0e0e0',
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
    marginTop: 40,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 300,
    padding: 50,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: 8,
    marginBottom: 20,
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
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
  Share,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const RadioScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState<any>(null);
  const [animationValues] = useState(
    Array.from({ length: 40 }, () => new Animated.Value(Math.random() * 30 + 4))
  );

  // Stream URL
  const STREAM_URL = 'https://tvstream.upea.bo/hls/oSs0jSWumTFIIVY97559.m3u8';

  // Configurar Audio al montar el componente
  useEffect(() => {
    setupAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const setupAudio = async () => {
    try {
      // Configurar el modo de audio para reproducción
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  // Función para generar nuevas alturas aleatorias
  const generateRandomHeight = () => Math.random() * 25 + 4;

  // Animación del visualizador
  useEffect(() => {
    let interval = null;

    if (isPlaying && !isLoading) {
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
  }, [isPlaying, isLoading]);

  const togglePlayPause = async () => {
    try {
      setIsLoading(true);
      
      if (sound && isPlaying) {
        // Pausar
        await sound.pauseAsync();
        setIsPlaying(false);
      } else if (sound && !isPlaying) {
        // Reanudar
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        // Crear nuevo sonido y reproducir
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: STREAM_URL },
          { 
            shouldPlay: true,
            isLooping: false,
            volume: isMuted ? 0.0 : 1.0,
          }
        );
        
        setSound(newSound);
        setIsPlaying(true);

        // Listener para cuando termine (aunque en streams no debería pasar)
        newSound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.isLoaded) {
            setIsLoading(false);
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
            if (status.error) {
              console.error('Playback error:', status.error);
              setIsPlaying(false);
              Alert.alert(
                'Error de conexión',
                'No se pudo conectar con la radio. Verifica tu conexión a internet.',
                [{ text: 'OK' }]
              );
            }
          }
        });
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setIsLoading(false);
      setIsPlaying(false);
      Alert.alert(
        'Error',
        'No se pudo conectar con la radio. Verifica tu conexión a internet o intenta más tarde.',
        [{ text: 'OK' }]
      );
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const toggleMute = async () => {
    try {
      if (sound) {
        const newVolume = isMuted ? 1.0 : 0.0;
        await sound.setVolumeAsync(newVolume);
        setIsMuted(!isMuted);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      const message = `📻 ¡Escucha Radio UPEA en vivo! 🎶\nTu radio favorita en línea - FM 100.0\n🔗 https://fm100.upea.bo/`;

      const result = await Share.share({
        message: message,
        title: 'Radio UPEA',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartido vía:', result.activityType);
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

  const getPlayButtonContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingDot, styles.loadingAnimation]} />
          <Animated.View style={[styles.loadingDot, styles.loadingAnimation, { opacity: 0.7 }]} />
          <Animated.View style={[styles.loadingDot, styles.loadingAnimation, { opacity: 0.4 }]} />
        </View>
      );
    }
    
    return (
      <Ionicons 
        name={isPlaying ? "pause" : "play"} 
        size={28} 
        color="white"
        style={!isPlaying && { marginLeft: 3 }}
      />
    );
  };

  const audioLevels = [
    4, 8, 6, 12, 10, 15, 8, 18, 14, 20, 16, 22, 12, 25, 18, 28, 20, 24, 16, 30,
    26, 22, 18, 14, 10, 16, 20, 24, 18, 12, 8, 6, 10, 14, 18, 22, 16, 12, 8, 4
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.liveContainer}>
          <View style={[styles.liveIndicator, { 
            backgroundColor: isPlaying ? '#FF4444' : '#ccc' 
          }]} />
          <Text style={styles.liveText}>
            {isPlaying ? 'LIVE' : 'OFFLINE'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
          <Feather name="share" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content Card */}
      <View style={styles.mainCard}>
        {/* Radio Image */}
        <View style={styles.cardContainer}>
          <ImageBackground
            source={require('../../assets/images/radioupea.png')}
            style={styles.card}
            imageStyle={{ borderRadius: 20 }}
            resizeMode="cover"
          >
            {/* Sound waves */}
            <View style={styles.soundWaves}>
              {[...Array(4)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.soundWave,
                    {
                      width: 80 + i * 30,
                      height: 80 + i * 30,
                      opacity: isPlaying ? 0.4 - i * 0.08 : 0.1,
                    }
                  ]}
                />
              ))}
            </View>
          </ImageBackground>
        </View>

        {/* Live Badge */}
        <View style={[styles.liveBadge, {
          backgroundColor: isPlaying ? '#FF4444' : '#999'
        }]}>
          <Text style={styles.liveBadgeText}>
            {isLoading ? 'CONECTANDO...' : isPlaying ? 'EN VIVO' : 'DETENIDO'}
          </Text>
        </View>

        {/* Station Info */}
        <View style={styles.stationInfo}>
          <Text style={styles.stationName}>Radio UPEA</Text>
          <Text style={styles.frequency}>FM 100.0</Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={toggleMute}
            disabled={!sound}
          >
            <MaterialIcons 
              name={isMuted ? "volume-off" : "volume-up"} 
              size={24} 
              color={isMuted ? "#fff" : "#666"} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.playButton, isLoading && styles.playButtonLoading]}
            onPress={togglePlayPause}
            disabled={isLoading}
          >
            {getPlayButtonContent()}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.controlButton, isLiked && styles.controlButtonActive]}
            onPress={toggleLike}
          >
            <MaterialIcons 
              name={isLiked ? "thumb-up" : "thumb-up-off-alt"} 
              size={24} 
              color={isLiked ? "#fff" : "#666"} 
            />
          </TouchableOpacity>
        </View>

        {/* Audio Visualizer */}
        <View style={styles.visualizerContainer}>
          <Text style={styles.visualizerLabel}>
            {isLoading ? 'Conectando...' : 'Ecualizador'}
          </Text>
          <View style={styles.visualizer}>
            {audioLevels.map((level, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.audioBar,
                  {
                    height: (isPlaying && !isLoading) ? animationValues[index] : 4,
                    backgroundColor: (isPlaying && !isLoading) 
                      ? `hsl(${200 + (index * 3) % 60}, 70%, 60%)` 
                      : '#e0e0e0',
                  }
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: "10%",
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  mainCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    paddingVertical: 30,
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
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  soundWaves: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundWave: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  liveBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  liveBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  stationInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  frequency: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#007AFF',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#003070',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#003070',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonLoading: {
    backgroundColor: '#555',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  loadingAnimation: {
    opacity: 0.4,
  },
  visualizerContainer: {
    alignItems: 'center',
  },
  visualizerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 15,
  },
  visualizer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    gap: 2,
  },
  audioBar: {
    width: 3,
    borderRadius: 2,
    minHeight: 4,
  },
});

export default RadioScreen;
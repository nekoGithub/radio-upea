import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Noticia = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaCompleta: string;
  contenidoCompleto: string;
};

const GaleriaScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Noticia | null>(null);

  // Datos de ejemplo para las noticias
  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: "RadioUpea lanza nueva iniciativa comunitaria",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ha lanzado una nueva iniciativa comunitaria que busca conectar a los estudiantes con la comunidad local a través de programas educativos y culturales.",
      fechaCompleta: "2 de Agosto, 2025",
      contenidoCompleto: "Esta nueva iniciativa de Radio UPEA representa un paso importante en el fortalecimiento de los lazos entre la universidad y la comunidad. El programa incluye espacios dedicados a la música local, entrevistas con líderes comunitarios, y segmentos educativos que abordan temas de interés general.\n\nLa directora de Radio UPEA, María González, explicó que 'queremos ser un puente entre el conocimiento académico y las necesidades reales de nuestra comunidad'. El proyecto contará con la participación de estudiantes de diferentes carreras que podrán aplicar sus conocimientos en un entorno real.\n\nLos programas se transmitirán de lunes a viernes en horarios estratégicos para llegar al mayor número de oyentes posible."
    },
    {
      id: 2,
      titulo: "Nuevo estudio de grabación para estudiantes",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "La universidad inaugura un moderno estudio de grabación equipado con tecnología de última generación para la formación de futuros comunicadores.",
      fechaCompleta: "1 de Agosto, 2025",
      contenidoCompleto: "El nuevo estudio de grabación de Radio UPEA marca un hito en la formación académica de los estudiantes de comunicación. Con equipos de última generación y un diseño acústico profesional, este espacio permitirá a los estudiantes desarrollar habilidades técnicas y creativas en un ambiente real de trabajo.\n\nEl estudio cuenta con cabinas de grabación aisladas, mesa de mezclas digital, y software especializado para la producción de contenido radiofónico. Los estudiantes podrán realizar prácticas supervisadas y desarrollar proyectos que posteriormente serán transmitidos en la programación regular de la emisora."
    },
    {
      id: 3,
      titulo: "Festival de música local en Radio UPEA",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Se llevará a cabo el primer festival de música local transmitido en vivo desde los estudios de Radio UPEA con artistas de la región.",
      fechaCompleta: "31 de Julio, 2025",
      contenidoCompleto: "Radio UPEA se prepara para presentar el primer Festival de Música Local, un evento que celebrará la riqueza cultural de nuestra región. Durante tres días consecutivos, artistas locales de diferentes géneros musicales se presentarán en vivo desde nuestros estudios.\n\nEl festival incluirá entrevistas exclusivas con los músicos, presentaciones acústicas y la oportunidad para que los oyentes conozcan más sobre la escena musical local. Este evento forma parte de nuestro compromiso de promover el talento regional y crear espacios de expresión cultural."
    },
    {
      id: 4,
      titulo: "Capacitación en periodismo digital",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ofrece talleres gratuitos de periodismo digital para estudiantes y profesionales interesados en medios de comunicación.",
      fechaCompleta: "30 de Julio, 2025",
      contenidoCompleto: "Como parte de nuestro compromiso con la educación continua, Radio UPEA ha organizado una serie de talleres sobre periodismo digital y nuevas tecnologías de comunicación. Estos talleres están dirigidos tanto a estudiantes como a profesionales que deseen actualizar sus conocimientos.\n\nLos talleres cubrirán temas como producción de podcasts, uso de redes sociales para medios, técnicas de entrevista, y ética en el periodismo digital. Serán impartidos por profesionales reconocidos en el campo de la comunicación y estarán disponibles de forma gratuita para toda la comunidad."
    },
    {
      id: 5,
      titulo: "Radio UPEA amplía su cobertura",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "La emisora universitaria anuncia la ampliación de su cobertura para llegar a más comunidades rurales de la región.",
      fechaCompleta: "29 de Julio, 2025",
      contenidoCompleto: "Radio UPEA ha anunciado oficialmente la ampliación de su cobertura radiofónica, lo que permitirá llegar a comunidades rurales que anteriormente no tenían acceso a nuestra programación. Esta expansión es resultado de una inversión en nueva infraestructura y equipos de transmisión.\n\nLa ampliación incluye la instalación de repetidoras estratégicamente ubicadas y el fortalecimiento de la señal digital. Con esta mejora, Radio UPEA podrá cumplir mejor su misión de servir como medio de comunicación educativo y cultural para toda la región, llevando información, entretenimiento y educación a las comunidades más alejadas."
    },
  ];

  const handleNewsPress = (noticia: Noticia): void => {
    setSelectedNews(noticia);
    setModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  const handleRefresh = () => {
    console.log("Refrescar noticias");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header mejorado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Programas</Text>
          <Text style={styles.subtitle}>Radio UPEA</Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveCircle} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Noticias */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {noticias.map((noticia: Noticia, index: number) => (
          <TouchableOpacity
            key={noticia.id}
            style={[
              styles.newsCard,
              index === 0 && styles.featuredCard
            ]}
            onPress={() => handleNewsPress(noticia)}
            activeOpacity={0.8}
          >
            <Image 
              source={{ uri: noticia.imagen }} 
              style={[
                styles.newsImage, 
                index === 0 && styles.featuredImage
              ]}
              resizeMode="cover"
            />
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.newsCategory}>Noticias</Text>
                <Text style={styles.newsDate}>
                  {noticia.fechaCompleta.split(',')[0]}
                </Text>
              </View>
              
              <Text style={[
                styles.newsTitle,
                index === 0 && styles.featuredTitle
              ]} numberOfLines={2}>
                {noticia.titulo}
              </Text>
              
              <Text style={styles.newsDescription} numberOfLines={3}>
                {noticia.descripcion}
              </Text>
              
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Leer más</Text>
                <Ionicons name="arrow-forward" size={14} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal mejorado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={handleCloseModal}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>Noticia completa</Text>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedNews && (
              <ScrollView 
                style={styles.modalBody} 
                showsVerticalScrollIndicator={false}
              >
                <Image 
                  source={{ uri: selectedNews.imagen }} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                
                <View style={styles.modalTextContent}>
                  <View style={styles.modalMeta}>
                    <Text style={styles.modalCategory}>Noticias</Text>
                    <Text style={styles.modalDate}>{selectedNews.fechaCompleta}</Text>
                  </View>
                  
                  <Text style={styles.modalTitle}>{selectedNews.titulo}</Text>
                  
                  <View style={styles.divider} />
                  
                  <Text style={styles.modalDescription}>
                    {selectedNews.contenidoCompleto}
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'transparent',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  liveCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  featuredCard: {
    marginBottom: 20,
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  featuredImage: {
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  newsDate: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 240,
  },
  modalTextContent: {
    padding: 20,
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalCategory: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    lineHeight: 32,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 26,
  },
});

export default GaleriaScreen;

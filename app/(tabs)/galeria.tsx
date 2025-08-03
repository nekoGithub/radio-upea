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
      titulo: "RadioUpea lanza nueva iniciativa comunitaria",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ha lanzado una nueva iniciativa comunitaria que busca conectar a los estudiantes con la comunidad local a través de programas educativos y culturales.",
      fechaCompleta: "2 de Agosto, 2025",
      contenidoCompleto: "Esta nueva iniciativa de Radio UPEA representa un paso importante en el fortalecimiento de los lazos entre la universidad y la comunidad. El programa incluye espacios dedicados a la música local, entrevistas con líderes comunitarios, y segmentos educativos que abordan temas de interés general.\n\nLa directora de Radio UPEA, María González, explicó que 'queremos ser un puente entre el conocimiento académico y las necesidades reales de nuestra comunidad'. El proyecto contará con la participación de estudiantes de diferentes carreras que podrán aplicar sus conocimientos en un entorno real.\n\nLos programas se transmitirán de lunes a viernes en horarios estratégicos para llegar al mayor número de oyentes posible."
    },
    {
      id: 3,
      titulo: "RadioUpea lanza nueva iniciativa comunitaria",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ha lanzado una nueva iniciativa comunitaria que busca conectar a los estudiantes con la comunidad local a través de programas educativos y culturales.",
      fechaCompleta: "2 de Agosto, 2025",
      contenidoCompleto: "Esta nueva iniciativa de Radio UPEA representa un paso importante en el fortalecimiento de los lazos entre la universidad y la comunidad. El programa incluye espacios dedicados a la música local, entrevistas con líderes comunitarios, y segmentos educativos que abordan temas de interés general.\n\nLa directora de Radio UPEA, María González, explicó que 'queremos ser un puente entre el conocimiento académico y las necesidades reales de nuestra comunidad'. El proyecto contará con la participación de estudiantes de diferentes carreras que podrán aplicar sus conocimientos en un entorno real.\n\nLos programas se transmitirán de lunes a viernes en horarios estratégicos para llegar al mayor número de oyentes posible."
    },
    {
      id: 4,
      titulo: "RadioUpea lanza nueva iniciativa comunitaria",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ha lanzado una nueva iniciativa comunitaria que busca conectar a los estudiantes con la comunidad local a través de programas educativos y culturales.",
      fechaCompleta: "2 de Agosto, 2025",
      contenidoCompleto: "Esta nueva iniciativa de Radio UPEA representa un paso importante en el fortalecimiento de los lazos entre la universidad y la comunidad. El programa incluye espacios dedicados a la música local, entrevistas con líderes comunitarios, y segmentos educativos que abordan temas de interés general.\n\nLa directora de Radio UPEA, María González, explicó que 'queremos ser un puente entre el conocimiento académico y las necesidades reales de nuestra comunidad'. El proyecto contará con la participación de estudiantes de diferentes carreras que podrán aplicar sus conocimientos en un entorno real.\n\nLos programas se transmitirán de lunes a viernes en horarios estratégicos para llegar al mayor número de oyentes posible."
    },
    {
      id: 5,
      titulo: "RadioUpea lanza nueva iniciativa comunitaria",
      imagen: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg",
      descripcion: "Radio UPEA ha lanzado una nueva iniciativa comunitaria que busca conectar a los estudiantes con la comunidad local a través de programas educativos y culturales.",
      fechaCompleta: "2 de Agosto, 2025",
      contenidoCompleto: "Esta nueva iniciativa de Radio UPEA representa un paso importante en el fortalecimiento de los lazos entre la universidad y la comunidad. El programa incluye espacios dedicados a la música local, entrevistas con líderes comunitarios, y segmentos educativos que abordan temas de interés general.\n\nLa directora de Radio UPEA, María González, explicó que 'queremos ser un puente entre el conocimiento académico y las necesidades reales de nuestra comunidad'. El proyecto contará con la participación de estudiantes de diferentes carreras que podrán aplicar sus conocimientos en un entorno real.\n\nLos programas se transmitirán de lunes a viernes en horarios estratégicos para llegar al mayor número de oyentes posible."
    },
    // ... más noticias aquí ...
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header limpio */}
      <View style={styles.header}>
        <Text style={styles.title}>Galería - radio UPEA</Text>
        
        <View style={styles.rightHeader}>
          <View style={styles.liveIndicator}>
            <View style={styles.liveCircle} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de Noticias */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {noticias.map((noticia: Noticia) => (
          <TouchableOpacity
            key={noticia.id}
            style={styles.newsCard}
            onPress={() => handleNewsPress(noticia)}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContent}>
                <Text style={styles.newsCategory}>Noticias</Text>
                <Text style={styles.newsTitle}>{noticia.titulo}</Text>
              </View>
              <Image 
                source={{ uri: noticia.imagen }} 
                style={styles.newsImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de Información */}
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
              <Text style={styles.modalHeaderTitle}>Más información</Text>
              <View style={{ width: 24 }} />
            </View>
            
            {selectedNews && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <Image 
                  source={{ uri: selectedNews.imagen }} 
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalCategory}>Noticias</Text>
                  <Text style={styles.modalTitle}>{selectedNews.titulo}</Text>
                  <Text style={styles.modalDate}>{selectedNews.fechaCompleta}</Text>
                  <Text style={styles.modalDescription}>{selectedNews.contenidoCompleto}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButton: {
    padding: 8,
    marginLeft: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  newsCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    marginBottom: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    marginRight: 15,
  },
  newsCategory: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  newsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  newsImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalBody: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalTextContent: {
    padding: 20,
  },
  modalCategory: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    lineHeight: 28,
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default GaleriaScreen;

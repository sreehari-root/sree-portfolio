import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { toast } from 'sonner-native';

export default function GalleryScreen() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchImages();
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(!!user);
  };

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('gallery')
        .list();

      if (error) throw error;

      const imageUrls = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = supabase // Get the whole data object first
            .storage
            .from('gallery')
            .getPublicUrl(file.name);
            
          // Append a timestamp as a query parameter to prevent caching issues
          const publicUrlWithTimestamp = `${urlData.publicUrl}?t=${new Date().getTime()}`; 
          return publicUrlWithTimestamp; 
        })
      );

      setImages(imageUrls);
      console.log("Generated Image URLs:", imageUrls); // Add this line

    } catch (error) {
      console.error("Error fetching images:", error); // Add console log for debugging
      toast.error('Failed to fetch images');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64FileData = result.assets[0].base64;
        const fileName = `image-${Date.now()}.jpg`;
        const { error } = await supabase.storage
          .from('gallery')
          .upload(fileName, decode(base64FileData), {
            contentType: 'image/jpeg'
          });

        if (error) throw error;
        
        toast.success('Image uploaded successfully');
        fetchImages();
      }
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Gallery" 
        icon="photo-library" 
        colors={['#4ECDC4', '#45B7AF']} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.imageContainer}
              onPress={() => setSelectedImage(uri)}
            >
              <Image source={{ uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {isAdmin && (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <MaterialIcons name="add-photo-alternate" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Image</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%', // Takes up slightly less than half width
    aspectRatio: 1, // Makes it square
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden', // Important for borderRadius
    backgroundColor: 'white', // Background while loading/if error
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%', // Fills the container
    height: '100%', // Fills the container
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});
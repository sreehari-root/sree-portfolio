import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';
import * as DocumentPicker from 'expo-document-picker';
import { Video } from 'expo-av';
import { decode } from 'base64-arraybuffer';
import { toast } from 'sonner-native';

export default function VideosScreen() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchVideos();
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(!!user);
  };

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from('videos')
        .list();

      if (error) throw error;

      const videoUrls = await Promise.all(
        data.map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from('videos')
            .getPublicUrl(file.name);
          return {
            url: publicUrl,
            title: file.name.replace(/\.[^/.]+$/, "")
          };
        })
      );

      setVideos(videoUrls);
    } catch (error) {
      toast.error('Failed to fetch videos');
    }
  };

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*', // Allows picking any video type
        copyToCacheDirectory: true,
      });

      // Use 'assets' array introduced in newer expo-document-picker versions
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // Use a unique name, perhaps including the original name if desired
        const fileExt = asset.name.split('.').pop();
        const fileName = `video-${Date.now()}.${fileExt || 'mp4'}`; // Use original extension or default
        const contentType = asset.mimeType ?? 'video/mp4'; // Use detected MIME type or default

        // Fetch the file as a blob directly
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        // Upload the blob
        const { error } = await supabase.storage
          .from('videos')
          .upload(fileName, blob, { // Pass the blob directly
            contentType: contentType, // Use detected or default content type
            upsert: false // Optional: set to true to overwrite existing file with same name
          });

        if (error) {
          console.error("Supabase upload error:", error); // Log detailed error
          throw error; // Re-throw error to be caught below
        }
        
        toast.success('Video uploaded successfully');
        fetchVideos(); // Refresh the list
      } else if (result.canceled) {
         // Optional: Handle cancellation
         console.log('Video picking cancelled');
      } else {
         // Handle cases where assets might be missing unexpectedly
         console.warn('Document picker did not return expected assets.');
      }
    } catch (error) {
      console.error("Video upload failed:", error); // Log the specific error
      toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Videos" 
        icon="video-library" 
        colors={['#FF8C42', '#FF7235']} 
      />
      
      <ScrollView style={styles.content}>
        {videos.map((video, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.videoCard}
            onPress={() => setSelectedVideo(video.url)}
          >
            <MaterialIcons name="play-circle-filled" size={40} color="#FF8C42" />
            <Text style={styles.videoTitle}>{video.title}</Text>
          </TouchableOpacity>
        ))}

        {isAdmin && (
          <TouchableOpacity style={styles.addButton} onPress={pickVideo}>
            <MaterialIcons name="video-call" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Video</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={!!selectedVideo} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedVideo(null)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          {selectedVideo && (
            <Video
              source={{ uri: selectedVideo }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              useNativeControls
              style={styles.modalVideo}
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
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
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
  videoTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8C42',
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
  modalVideo: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({ title, icon, colors }) {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <MaterialIcons name={icon} size={32} color="white" />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 44, // To center the title accounting for back button
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Sample blog data - this can be moved to a separate file later for easier management
const blogData = [
  {
    id: '1',
    title: 'Insomnia',
    image: require('../../assets/images/Blogs/Insomnia 1.jpg'),
    route: 'InsomniaDetail'
  },
  {
    id: '2',
    title: 'Hypersomnia',
    image: require('../../assets/images/Blogs/Insomnia 1.jpg'),
    route: 'HypersomniaDetail'
  },
  {
    id: '3',
    title: 'Snoring',
    image: require('../../assets/images/Blogs/Insomnia 2.jpg'),
    route: 'SnoringDetail'
  },
  {
    id: '4',
    title: 'Breathing abnormal pauses while sleeping',
    image: require('../../assets/images/Blogs/Insomnia 2.jpg'),
    route: 'BreathingDetail'
  },
  {
    id: '5',
    title: 'Bruxism',
    image: require('../../assets/images/Blogs/Insomnia 2.jpg'),
    route: 'BruxismDetail'
  },
  {
    id: '6',
    title: 'RestlessLeg',
    image: require('../../assets/images/Blogs/Insomnia 2.jpg'),
    route: 'RestlessLegDetail'
  },
];

const Sleeppedia = () => {
  const navigation = useNavigation();

  const handleBlogPress = (route) => {
    navigation.navigate(route);
  };

  return (
    <LinearGradient colors={['#121212', '#000000']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleeppedia</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {blogData.map((blog) => (
          <TouchableOpacity 
            key={blog.id}
            style={styles.blogCard}
            onPress={() => handleBlogPress(blog.route)}
            activeOpacity={0.8}
          >
            <ImageBackground 
              source={blog.image} 
              style={styles.blogImage}
              imageStyle={styles.blogImageStyle}
            >
              <LinearGradient 
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} 
                style={styles.blogGradient}
              >
                <View style={styles.blogContent}>
                  <Text style={styles.blogTitle}>{blog.title}</Text>
                  <Ionicons name="chevron-forward" size={24} color="#FFF" />
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  blogCard: {
    height: 120,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1c1c1c',
    // Add a glass-like effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  blogImage: {
    width: '100%',
    height: '100%',
  },
  blogImageStyle: {
    borderRadius: 12,
  },
  blogGradient: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 12,
  },
  blogContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  blogTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    // Add text shadow for better readability over images
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Sleeppedia;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HypersomniaDetail = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#121212', '#000000']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <Image 
            source={require('../../../assets/images/icons/premium.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Shuteye</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={require('../../../assets/images/Blogs/Insomnia 1.jpg')} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>Hypersomnia</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Hypersomnia is a condition characterized by excessive daytime sleepiness and prolonged nighttime sleep.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>People with hypersomnia may sleep for 10 hours or more, yet still feel tired during the day.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>This condition can significantly impact daily functioning and quality of life.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Hypersomnia can be primary (idiopathic) or secondary to other medical conditions.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>It affects approximately 4-6% of the population.</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Excessive daytime sleepiness despite adequate or prolonged nighttime sleep</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Difficulty waking up in the morning or from naps</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Prolonged sleep episodes (10+ hours)</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Feeling unrefreshed after long sleep periods</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Cognitive difficulties and "brain fog"</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Anxiety or irritability related to excessive sleepiness</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Treatment Options</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Stimulant medications to promote wakefulness</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Treatment of underlying conditions (if hypersomnia is secondary)</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Regular sleep schedule and good sleep hygiene</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Avoiding alcohol and sedating medications</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Scheduled short naps during the day</Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  headerImage: {
    width: width,
    height: 250,
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
    // Add text shadow for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  sectionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
  },
  bulletText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
});

export default HypersomniaDetail;
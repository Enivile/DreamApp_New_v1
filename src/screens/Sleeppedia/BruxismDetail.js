import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BruxismDetail = () => {
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
          source={require('../../../assets/images/Blogs/Insomnia 2.jpg')} 
          style={styles.headerImage}
          resizeMode="cover"
        />
        
        <Text style={styles.title}>Bruxism (Teeth Grinding)</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Bruxism is a condition in which you grind, gnash or clench your teeth unconsciously when you're awake or during sleep.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Sleep bruxism is considered a sleep-related movement disorder and people who clench or grind their teeth during sleep are more likely to have other sleep disorders.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Mild bruxism may not require treatment, but in some people, bruxism can be frequent and severe enough to lead to jaw disorders, headaches, damaged teeth and other problems.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Because you may have sleep bruxism and be unaware of it until complications develop, it's important to know the signs and symptoms.</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Teeth grinding or clenching, which may be loud enough to wake up your sleep partner</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Teeth that are flattened, fractured, chipped or loose</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Worn tooth enamel, exposing deeper layers of your tooth</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Increased tooth pain or sensitivity</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Tired or tight jaw muscles, or a locked jaw that won't open or close completely</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Jaw, neck or face pain or soreness</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Causes</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Stress and anxiety: Increased stress and anxiety can lead to teeth grinding.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Abnormal bite: When teeth don't line up properly, it can lead to bruxism.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Sleep disorders: Sleep apnea and other sleep disorders are linked to bruxism.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Medications and substances: Certain psychiatric medications, tobacco, caffeine, alcohol, and recreational drugs may increase the risk.</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Treatment Options</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Dental approaches: Mouth guards and splints can protect teeth from grinding during sleep.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Stress management: Reducing stress through meditation, counseling, or exercise can help.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Behavior change: Learning proper mouth and jaw position can help some people.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Medication: Muscle relaxants or Botox injections may be prescribed in severe cases.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Treating associated disorders: Addressing sleep apnea or other sleep disorders may reduce bruxism.</Text>
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
    marginRight: 8,
  },
  logoText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    // Add a glass-like effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    // Add a glass-like effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 10,
  },
  bulletPoint: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    color: '#DDD',
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
});

export default BruxismDetail;
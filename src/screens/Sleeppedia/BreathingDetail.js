import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BreathingDetail = () => {
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
        
        <Text style={styles.title}>Sleep Apnea</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Sleep apnea is a serious sleep disorder that occurs when a person's breathing is interrupted during sleep.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>People with untreated sleep apnea stop breathing repeatedly during their sleep, sometimes hundreds of times during the night.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>This means the brain and the rest of the body may not get enough oxygen.</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>There are two types: obstructive sleep apnea (OSA) and central sleep apnea (CSA).</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>OSA is more common and occurs when throat muscles relax, while CSA occurs when your brain doesn't send proper signals to the muscles that control breathing.</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Loud snoring (primarily in OSA)</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Episodes of stopped breathing during sleep (reported by another person)</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Gasping for air during sleep</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Awakening with a dry mouth or sore throat</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Morning headache</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Excessive daytime sleepiness (hypersomnia)</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Risk Factors</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Excess weight: Fat deposits around the upper airway may obstruct breathing</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Neck circumference: People with thicker necks might have narrower airways</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Family history: Sleep apnea can be hereditary</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Age: Sleep apnea occurs more frequently in older adults</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Use of alcohol, sedatives or tranquilizers: These substances relax the muscles in your throat</Text>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Treatment Options</Text>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Continuous Positive Airway Pressure (CPAP) therapy</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Oral appliances to keep the throat open</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Lifestyle changes (weight loss, avoiding alcohol before bed)</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Surgery to remove tissue or reposition the jaw</Text>
          </View>
          
          <View style={styles.bulletPointContainer}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Treatment of associated medical problems</Text>
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

export default BreathingDetail;
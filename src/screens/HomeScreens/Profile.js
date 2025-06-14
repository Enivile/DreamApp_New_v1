import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

// Initial sections data structure
const initialSections = [
  {
    title: "Tracker",
    data: [
      { id: "1", name: "Wake-up Alarm", value: "Off" },
      { id: "2", name: "Placement", value: "On" },
      { id: "3", name: "Battery Warning", value: "On" },
      { id: "4", name: "Sleep Note", value: "Off" },
      { id: "5", name: "Wake-up Mood", value: "On" },
    ],
  },
  {
    title: "Settings",
    data: [
      { id: "6", name: "Language", value: "Automatic" },
      { id: "7", name: "Sleep Reminder", value: "Off" },
      { id: "8", name: "Rate Us", value: "" },
      { id: "9", name: "Feedback", value: "" },
      { id: "10", name: "More", value: "" },
    ],
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { currentUser, userDetails, isAuthenticated, isPremium, loading, logout } = useAuth();
  
  // State for sections data
  const [sections, setSections] = useState(initialSections);
  
  // Handle item press in the settings list
  const handleItemPress = (item) => {
    // Handle other items as needed
    // Sleep reminder functionality has been removed
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = async () => {
    await logout();
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
      </View>
    );
  }

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={styles.notLoggedInContainer}>
          <Image 
            source={require('../../assets/Logo.png')} 
            style={styles.logoImage} 
          />
          <Text style={styles.notLoggedInTitle}>Sign in to your account</Text>
          <Text style={styles.notLoggedInSubtitle}>Sign in to access your profile, track your sleep patterns, and sync your data across devices</Text>
          
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
          >
            <LinearGradient
              colors={["#0D47A1", "#082B6C"]}
              style={styles.loginButtonGradient}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Logged in state
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      
      {/* Sleep Reminder Modal removed */}
      <View style={styles.profileContainer}>
        {currentUser.photoURL ? (
          <Image
            source={{ uri: currentUser.photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImage}>
            {/* Use Image with require for local SVG or PNG avatar */}
            <Image
              source={userDetails?.gender === 'female' ? require('../../assets/default-avatars/female.png') : require('../../assets/default-avatars/male.png')}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
        )}
        <Text style={styles.profileName}>{userDetails?.fullName || currentUser.displayName || currentUser.email}</Text>
        
        {/* Account type badge and email in a row */}
        <View style={styles.badgeAndEmailContainer}>
          <View style={[styles.accountBadge, isPremium ? styles.premiumBadge : styles.freeBadge]}>
            <Ionicons name={isPremium ? "star" : "person"} size={14} color="white" style={styles.badgeIcon} />
            <Text style={styles.accountBadgeText}>{isPremium ? 'Premium Account' : 'Free Account'}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Ionicons name="mail-outline" size={14} color="#0D47A1" />
            <Text style={styles.profileEmail}>{currentUser.email}</Text>
          </View>
        </View>
        
        {/* User details section */}
        {userDetails && (
          <View style={styles.userDetailsContainer}>
            {userDetails.fullName && (
              <View style={styles.userDetailRow}>
                <Ionicons name="person-outline" size={18} color="#0D47A1" />
                <Text style={styles.userDetailLabel}>Full Name:</Text>
                <Text style={styles.userDetailValue}>{userDetails.fullName}</Text>
              </View>
            )}
            {userDetails.createdAt && (
              <View style={styles.userDetailRow}>
                <Ionicons name="calendar-outline" size={18} color="#0D47A1" />
                <Text style={styles.userDetailLabel}>Member Since:</Text>
                <Text style={styles.userDetailValue}>{new Date(userDetails.createdAt).toLocaleDateString()}</Text>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="white" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.sectionHeader}>{item.title}</Text>
            {item.data.map((subItem) => {
              // Define icons for each setting item
              let iconName = "settings-outline";
              
              // Tracker section icons
              if (subItem.name === "Wake-up Alarm") iconName = "alarm-outline";
              if (subItem.name === "Placement") iconName = "bed-outline";
              if (subItem.name === "Battery Warning") iconName = "battery-half-outline";
              if (subItem.name === "Sleep Note") iconName = "document-text-outline";
              if (subItem.name === "Wake-up Mood") iconName = "happy-outline";
              
              // Settings section icons
              if (subItem.name === "Language") iconName = "language-outline";
              if (subItem.name === "Sleep Reminder") iconName = "notifications-outline";
              if (subItem.name === "Rate Us") iconName = "star-outline";
              if (subItem.name === "Feedback") iconName = "chatbubble-outline";
              if (subItem.name === "More") iconName = "ellipsis-horizontal-outline";
              
              return (
                <TouchableOpacity 
                  key={subItem.id} 
                  style={styles.item}
                  onPress={() => handleItemPress(subItem)}
                >
                  <View style={styles.leftContainer}>
                    <Ionicons name={iconName} size={20} color="#0D47A1" style={styles.itemIcon} />
                    <Text style={styles.itemText}>{subItem.name}</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    {subItem.value ? (
                      <Text style={styles.itemValue}>{subItem.value}</Text>
                    ) : null}
                    <Ionicons name="chevron-forward" size={18} color="white" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  notLoggedInSubtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    paddingVertical: 15,
    width: '100%',
  },
  signupButtonText: {
    color: '#0D47A1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  badgeAndEmailContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  profileEmail: {
    fontSize: 14,
    color: '#aaa',
  },
  // Account badge styles
  accountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginBottom: 20,
  },
  premiumBadge: {
    backgroundColor: '#0D47A1',
  },
  freeBadge: {
    backgroundColor: '#555',
  },
  badgeIcon: {
    marginRight: 5,
  },
  accountBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // User details styles
  userDetailsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userDetailLabel: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
    marginRight: 5,
  },
  userDetailValue: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  // Logout button styles
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  itemText: {
    color: "white",
    fontSize: 14,
  },
  itemValue: {
    color: "white",
    fontSize: 14,
    marginRight: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileScreen;

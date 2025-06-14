import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StatusBar } from 'react-native';

const VideoScreen = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const auth = getAuth();

  // This effect runs when the component mounts
  useEffect(() => {
    let navigationTimer;
    let buttonTimer;

    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isUserLoggedIn = !!user;
      setIsLoggedIn(isUserLoggedIn);

      if (isUserLoggedIn) {
        // If user is logged in, navigate to Main after a short delay
        navigationTimer = setTimeout(() => {
          navigation.navigate('Main');
        }, 1500); // 1.5 seconds delay before navigation
      } else {
        // If user is not logged in, show buttons after delay
        buttonTimer = setTimeout(() => {
          setShowButtons(true);
        }, 1000);
      }
    });

    return () => {
      // Cleanup all timers and subscriptions
      if (navigationTimer) clearTimeout(navigationTimer);
      if (buttonTimer) clearTimeout(buttonTimer);
      unsubscribe(); // Unsubscribe from auth state changes
    };
  }, [navigation]);

  // This effect runs every time the screen comes into focus
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // When screen is focused, reload the video
      if (videoRef.current) {
        videoRef.current.playFromPositionAsync(0);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleNextScreen = () => {
    navigation.navigate("Main");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  
  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" // Changes text/icons to white
        translucent={true} // Makes status bar transparent
        backgroundColor="transparent" // Keeps background transparent
        />

      <Video
        ref={videoRef}
        source={require("../../assets/videos/back11.webm")}
        style={[StyleSheet.absoluteFillObject, styles.video]}
        shouldPlay
        isLooping
        resizeMode="cover"
      />

      {!isLoggedIn && showButtons && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton} onPress={handleNextScreen}>
            <Ionicons name="arrow-forward" size={24} color="#000" />
            <Text style={styles.buttonText}>Continue without login</Text>
          </TouchableOpacity>
          
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.authButton}>
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    width: "100%",
  },
  video: {
    minWidth: "100%",
  },
  roundButton: {
    flexDirection: 'row',
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  authButton: {
    backgroundColor: "rgba(29, 185, 84, 0)", // Green with opacity
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  signupButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)", // White with opacity
  },
  authButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default VideoScreen;

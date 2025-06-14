/**
 * History.js
 * 
 * This component displays a user's sound play history.
 * It allows users to view and replay recently played sounds and mixes.
 * The component requires user authentication and displays appropriate messaging when not logged in.
 */

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { useMiniPlayer } from "../../../context/MiniPlayerContext";
import { getHistory, clearHistory } from "../../../utils/favoritesHistoryService";
import * as FileSystem from "expo-file-system";
import { downloadAudioFromFirebase } from "../../../utils/firebaseAudioDownloader";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingIds, setLoadingIds] = useState([]);
  const { currentUser, isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const { miniPlayerSounds, updateMiniPlayerSounds, showMiniPlayer } = useMiniPlayer();

  // Load history when component mounts or user changes
  useEffect(() => {
    loadHistory();
  }, [currentUser]);
  
  // Reload history data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && currentUser) {
        loadHistory();
      }
      return () => {};
    }, [isAuthenticated, currentUser])
  );

  // Function to load user's play history from Firebase
  const loadHistory = async () => {
    setLoading(true);
    try {
      if (isAuthenticated && currentUser) {
        const userHistory = await getHistory(currentUser.uid, 50); // Limit to 50 most recent items
        setHistory(userHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error loading history:", error);
      Alert.alert("Error", "Failed to load play history. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle playing a sound or mix from history
  const handlePlayFromHistory = async (historyItem) => {
    setLoadingIds((prev) => [...prev, historyItem.id]);
    
    try {
      if (historyItem.type === "mix") {
        // Handle playing a mix (multiple sounds)
        const downloadedSounds = [];
        
        for (const sound of historyItem.sounds) {
          const uri = await ensureSoundDownloaded(sound);
          downloadedSounds.push({ ...sound, uri });
        }
        
        updateMiniPlayerSounds(downloadedSounds);
        showMiniPlayer(downloadedSounds);
      } else {
        // Handle playing a single sound
        const uri = await ensureSoundDownloaded(historyItem);
        
        const isAlreadyAdded = miniPlayerSounds.some((s) => s.id === historyItem.id);
        if (!isAlreadyAdded) {
          const updatedSounds = [...miniPlayerSounds, { ...historyItem, uri }];
          updateMiniPlayerSounds(updatedSounds);
          showMiniPlayer(updatedSounds);
        }
      }
      
      navigation.navigate("MainPlayer");
    } catch (error) {
      Alert.alert("Playback failed", error.message || "An error occurred while preparing the sound.");
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== historyItem.id));
    }
  };

  // Helper function to ensure a sound is downloaded
  const ensureSoundDownloaded = async (sound) => {
    const firebasePath = sound.firebasePath || `whiteNoises/${sound.name.replace(/ /g, "_")}.mp3`;
    const fileName = firebasePath.split("/").pop();
    const localUri = FileSystem.documentDirectory + fileName;
    
    const fileInfo = await FileSystem.getInfoAsync(localUri);
    if (!fileInfo.exists) {
      return await downloadAudioFromFirebase(firebasePath, fileName);
    }
    
    return localUri;
  };

  // Function to clear all history
  const handleClearHistory = async () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear your entire play history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await clearHistory(currentUser.uid);
              setHistory([]);
              Alert.alert("Success", "Your play history has been cleared.");
            } catch (error) {
              console.error("Error clearing history:", error);
              Alert.alert("Error", "Failed to clear history. Please try again.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    
    // Convert Firestore timestamp to JavaScript Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    // Get current date for comparison
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Format based on how recent the date is
    if (date >= today) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= yesterday) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
             ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  // Render a history item
  const renderHistoryItem = ({ item }) => {
    const isMix = item.type === "mix";
    const timestamp = formatTimestamp(item.playedAt);
    
    return (
      <TouchableOpacity
        style={isMix ? styles.mixCard : styles.soundCard}
        onPress={() => handlePlayFromHistory(item)}
        disabled={loadingIds.includes(item.id)}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon || "musical-note-outline"} size={isMix ? 32 : 25} color="#00AEEF" />
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.timestampText}>{timestamp}</Text>
          {isMix && (
            <View style={styles.soundsContainer}>
              {item.sounds.map((sound, index) => (
                <View key={`${sound.id}-${index}`} style={styles.soundBadge}>
                  <Ionicons name={sound.icon} size={12} color="white" />
                  <Text style={styles.soundName}>{sound.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          {loadingIds.includes(item.id) ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => handlePlayFromHistory(item)}
            >
              <Ionicons name="play" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="log-in-outline" size={50} color="#00AEEF" />
          <Text style={styles.emptyStateTitle}>Login Required</Text>
          <Text style={styles.emptyStateText}>
            Please login to view your play history.
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show loading indicator while fetching history
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00AEEF" />
      </View>
    );
  }

  // Show empty state if no history
  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="time-outline" size={50} color="#00AEEF" />
          <Text style={styles.emptyStateTitle}>No Play History</Text>
          <Text style={styles.emptyStateText}>
            Your recently played sounds and mixes will appear here.
          </Text>
        </View>
      </View>
    );
  }

  // Render the list of history items with a clear button
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.clearButton}
        onPress={handleClearHistory}
      >
        <Ionicons name="trash-outline" size={16} color="white" />
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
      
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    paddingTop: 0,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  soundCard: {
    flexDirection: "row",
    backgroundColor: "rgba(35, 41, 70, 0.8)",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: "center",
  },
  mixCard: {
    flexDirection: "row",
    backgroundColor: "rgba(35, 41, 70, 0.8)",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 174, 239, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  timestampText: {
    color: "#B0B0B0",
    fontSize: 12,
    marginBottom: 4,
  },
  soundsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  soundBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  soundName: {
    color: "white",
    fontSize: 10,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    padding: 20,
  },
  emptyStateTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00AEEF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 59, 48, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  clearButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
});

export default History;
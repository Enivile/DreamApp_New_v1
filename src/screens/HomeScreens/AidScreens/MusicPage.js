import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"; 
import { Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

  const screenWidth = Dimensions.get("window").width;


const items = [
  {
    id: 3,
    title: 'Feel Better: Drift Into Peaceful Nights',
    category: 'Collections',
    image: require('../../../../assets/images/banners/Recently_Updated_3.webp'), // Use require here
    count: '7 items',
  },
  {
    id: 4,
    title: 'Thanksgiving Meditation',
    category: 'Meditation',
    image: require('../../../../assets/images/banners/Recently_Updated_4.webp'), // Use require here
    count: '6 MIN',
  },
  {
    id: 5,
    title: 'Feel Better: Drift Into Peaceful Nights',
    category: 'Collections',
    image: require('../../../../assets/images/banners/Recently_Updated_1.webp'), // Use require here
    count: '7 items',
  },
];
const MusicPage = () => {
    
  return (
    <View style={styles.recentlyUpdatedContainer}>
          {/* Header Section */}
          <View style={styles.recentlyUpdatedHeader}>
            <Text style={styles.recentlyUpdatedTitle}>Recently Updated</Text>
          </View>
          {/* Carousel Section */}
          <FlatList
          data={items}
          alwaysBounceVertical
          showsVerticalScrollIndicator={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.recentlyUpdatedSlide}>
                <Image
                  source={item.image}
                  style={styles.recentlyUpdatedCarousel2Image}
                  resizeMode="cover"
                />
                <Text style={styles.recentlyUpdatedNewBadge}>NEW</Text>
                <View style={styles.recentlyUpdatedTextContainer}>
                  <Text style={styles.recentlyUpdatedCategory}>{item.category}</Text>
                  <Text style={styles.recentlyUpdatedEntryTitle}>{item.title}</Text>
                  <Text style={styles.recentlyUpdatedEntryDetails}>{item.count}</Text>
                </View>
              </View>
          )}
          contentContainerStyle={styles.recentlyUpdatedCarousel}
          decelerationRate='normal' // Smooth scrolling
        />
        </View>
  );
    };
    
    const styles = StyleSheet.create({
      
  recentlyUpdatedContainer: {
    marginVertical: 20,
    // backgroundColor: '', // Matches your homepage theme
  },
  recentlyUpdatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  recentlyUpdatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  recentlyUpdatedSeeAll: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
  recentlyUpdatedCarousel: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    // backgroundColor: "#000000",
    // marginTop: 10,
  },
  recentlyUpdatedSlide: {
    width: screenWidth - 32, // Keeps spacing consistent with paddingHorizontal
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  recentlyUpdatedCarousel2Image: {
    width: '100%',
    height: 120,
  },
  recentlyUpdatedNewBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  recentlyUpdatedTextContainer: {
    padding: 10,
  },
  recentlyUpdatedCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  recentlyUpdatedEntryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  recentlyUpdatedEntryDetails: {
    fontSize: 12,
    color: '#CCC',
  },

    });

export default MusicPage;
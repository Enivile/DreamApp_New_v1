import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const ScreenWidth = Dimensions.get("window").width;

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const selectedDayIndex = 3; // Example: "Thursday" is selected

const Report = () => {
  return (
    <View
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}
    >
      {/* Top Bar with Day Selection */}
      <View style={styles.topBar}>
        <Text style={styles.dateText}>Thu. Nov 18</Text>
        <View style={styles.daySelector}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity key={index} style={styles.dayButton}>
              <View
                style={[
                  styles.dayCircle,
                  index === selectedDayIndex && styles.selectedDayCircle,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    index === selectedDayIndex && styles.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {/* Wrapper for first image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../../assets/images/banners/1.webp")}
          />
        </View>

        {/* Wrapper for second image */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={require("../../../assets/images/banners/2.webp")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
  scrollContainer: {
    backgroundColor: "#121212",
    marginBottom: 100,
  },
  topBar: {
    backgroundColor: "#121212",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  dateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
  },
  daySelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  dayButton: {
    padding: 5,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDayCircle: {
    borderColor: "#007bff", // Blue border for selected day
  },
  dayText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedDayText: {
    color: "#007bff", // Blue text for selected day
  },
  imageContainer: {
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageStyle: {
    width: ScreenWidth * 0.95,
    height: 600,
    resizeMode: "cover",
  },
});

export default Report;

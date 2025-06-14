import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../screens/HomeScreens/HomePage";
import AidsScreen from "../screens/HomeScreens/AidsScreen";
import { Ionicons } from "@expo/vector-icons";
import Tracker from "../screens/HomeScreens/Tracker";
import Report from "../screens/HomeScreens/Report"
import Profile from "../screens/HomeScreens/Profile";
import { LinearGradient } from 'expo-linear-gradient'; 


const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarStyle={styles.menu}
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide labels
        tabBarStyle: {
          backgroundColor: "#1c1c1c",
          borderColor: 'transparent',
          height: 50,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "#fff",  // Change active item color
      }}
    >
      <Tab.Screen
        styles={styles.menuItem}
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.sty}>
              <Ionicons name="home-outline" size={size} color={color} />
              <Text style={styles.menuText}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        styles={styles.menuItem}
        name="AidsScreen"
        component={AidsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="musical-notes-outline" size={size} color={color} />
              <Text style={styles.menuText}>Aids</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        styles={styles.menuItem}
        name="Tracker"
        component={Tracker}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <LinearGradient
                // Start and end points for the gradient direction
                start={{ x: 0, y: 0.20 }} // Gradient starts from the top-left corner
                end={{ x: 0, y: 0.80 }} // Gradient ends at the bottom-right corner
                colors={['#172d99', '#172d99']} // Colors for the gradient
                style={styles.menuItemTracker} // Style for the container
              >
                <Ionicons style={styles.menuItemTracker} name="moon-outline" size={size} color={color} />
                </LinearGradient>
                <Text style={styles.menuText}>Tracker</Text>
              
            </View>
          ),
        }}
      />
      <Tab.Screen
        styles={styles.menuItem}
        name="Journal"
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="pulse-outline" size={size} color={color} />
              <Text style={styles.menuText}>Report</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        styles={styles.menuItem}
        name="Settings"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.Tracker}>
              <Ionicons name="person-circle-outline" size={size} color={color} />
              <Text style={styles.menuText} size={8}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  menuItemTracker: {
    transform: [{ translateY: -5 }],
    // backgroundColor: "#292c61",
    // padding: 10,
    // marginHorizontal: -10,
    marginVertical: -10,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: -15,
  },
  menuItem: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  menuText: {
    color: "rgb(211 211 211)",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 3,
  },
});

export default HomeNavigator;

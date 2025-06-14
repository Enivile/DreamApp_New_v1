import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

const PlayerScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={["#121212", "#000000"]}
                style={styles.background}
            />
            
            <Animatable.View animation="fadeIn" duration={1000} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dream Audio</Text>
                <View style={styles.placeholder} />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={1200} style={styles.content}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
                
                <Text style={styles.title}>Choose Your Experience</Text>
                
                <Animatable.View animation="fadeInUp" delay={300} duration={800}>
                    <TouchableOpacity 
                        style={styles.optionButton}
                        onPress={() => navigation.navigate("AudioPlayer")}
                    >
                        <LinearGradient
                            colors={["#1DB954", "#0D8C3C"]}
                            style={styles.gradient}
                        >
                            <MaterialIcons name="music-note" size={30} color="#FFF" />
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>Audio Player</Text>
                                <Text style={styles.optionDescription}>Full-featured music player with visualizations</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
                
                <Animatable.View animation="fadeInUp" delay={500} duration={800}>
                    <TouchableOpacity 
                        style={styles.optionButton}
                        onPress={() => navigation.navigate("Player")}
                    >
                        <LinearGradient
                            colors={["#6C63FF", "#4F46E5"]}
                            style={styles.gradient}
                        >
                            <MaterialIcons name="waves" size={30} color="#FFF" />
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionTitle}>White Noise Mixer</Text>
                                <Text style={styles.optionDescription}>Mix ambient sounds for relaxation</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
                
                <Animatable.View animation="fadeIn" delay={1000} style={styles.footer}>
                    <Text style={styles.footerText}>Tap an option to begin</Text>
                </Animatable.View>
            </Animatable.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    title: {
        color: "#FFF",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40,
        textAlign: "center",
    },
    optionButton: {
        width: "100%",
        marginBottom: 20,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    gradient: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderRadius: 12,
    },
    optionTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    optionTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    optionDescription: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 14,
        marginTop: 4,
    },
    footer: {
        marginTop: 40,
    },
    footerText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 14,
    },
});

export default PlayerScreen;
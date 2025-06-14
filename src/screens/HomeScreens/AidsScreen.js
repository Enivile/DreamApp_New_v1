import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import WNall from "./AidScreens/WNall";
import WNmixes from "./AidScreens/WNmixes";
import WNrain from "./AidScreens/WNrain";
import WNasmr from "./AidScreens/WNasmr";
import WNnature from "./AidScreens/WNnature";
import WNanimal from "./AidScreens/WNanimal";
import WNcity from "./AidScreens/WNcity";
import WNspecial from "./AidScreens/WNspecial";
import RecentlyUpdatedPage from "./AidScreens/RecentlyUpdatedPage";
import MusicPage from "./AidScreens/MusicPage";
import Favorites from "./AidScreens/Favorites";
import History from "./AidScreens/History";

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const mainMenu = ['My Aids', 'White Noise', 'Music', 'Story', 'Recent Updates'];
const myAidsSubMenu = ['Favorites', 'History'];
const whiteNoiseSubMenu = ['All', 'Mixes', 'Rain', 'ASMR', 'Nature', 'Animal', 'City', 'Special'];

export default class AidsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, // Main menu active index
      subActiveIndex: 0, // Submenu active index
      subActiveIndexWhiteNoise: 0,
      enabled: true,
    };
    this.scrollViewRef = React.createRef(); // Reference to the horizontal ScrollView
    this.subScrollViewRef = React.createRef(); // Reference to the submenu ScrollView
    this.whiteNoiseSubScrollViewRef = React.createRef();
  }

  handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / ScreenWidth);
    this.setState({ activeIndex: currentIndex });
  };

  handleMenuPress = (index) => {
    // Scroll to the corresponding page
    this.scrollViewRef.current?.scrollTo({ x: index * ScreenWidth, animated: true });
    this.setState({ activeIndex: index });
  };

  handleSubMenuPress = (index) => {
    this.setState({ subActiveIndex: index });
    this.subScrollViewRef.current?.scrollTo({ x: index * ScreenWidth, animated: true });
  };

  handleSubScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / ScreenWidth);
    this.setState({ subActiveIndex: currentIndex });
  };

  handleWhiteNoiseSubMenuPress = (index) => {
    this.setState({ subActiveIndexWhiteNoise: index });
    this.whiteNoiseSubScrollViewRef.current?.scrollTo({ x: index * ScreenWidth, animated: true });
  };
  
  handleWhiteNoiseSubScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / ScreenWidth);
    this.setState({ subActiveIndexWhiteNoise: currentIndex });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <ImageBackground
          source={require('../../../assets/images/banners/aids-main-back.webp')}
          style={styles.mainBannerImage}
          imageStyle={{ height: 200 }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainScrollContainer}
          >
            {mainMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleMenuPress(index)}
                style={[
                  styles.menuItemContainer,
                  index === this.state.activeIndex && styles.activeMenuItemContainer,
                ]}
              >
                <Text
                  style={[
                    styles.itemText,
                    index === this.state.activeIndex && styles.activeItemText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView // Child ScrollView for Parent ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainPageScrollContainer}
            onScroll={this.handleScroll}
            scrollEventThrottle={16} // Ensures smooth updates
            ref={this.scrollViewRef} // Attach reference to the ScrollView
            scrollEnabled={this.state.enabled}
          >
            <View style={styles.myAidsPage}>
              {/* Submenu Section */}
              <ScrollView
                horizontal
                contentContainerStyle={styles.subMenuContainer}
                showsHorizontalScrollIndicator={false}
                onTouchStart={(ev) => { 
                  this.setState({enabled:false }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
                onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}
              >
                {myAidsSubMenu.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleSubMenuPress(index)}
                    style={[
                      styles.menuItemContainer,
                      index === this.state.subActiveIndex && styles.activeMenuItemContainer,
                    ]}
                  >
                    <Text
                      style={[
                        styles.subItemText,
                        index === this.state.subActiveIndex && styles.activeItemText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Submenu Content Section */}
              <ScrollView
                horizontal
                pagingEnabled
                onScroll={this.handleSubScroll}
                scrollEventThrottle={16}
                ref={this.subScrollViewRef}
                showsHorizontalScrollIndicator={false}
                onTouchStart={(ev) => { 
                  this.setState({enabled:false }); }}
                  onMomentumScrollEnd={(e) => { this.setState({ enabled:true }); }}
                onScrollEndDrag={(e) => { this.setState({ enabled:true }); }}
                style={styles.subPagesContainer}
              >
                <View style={styles.favouritesPage}>
                  <Favorites />
                </View>
                <View style={styles.historyPage}>
                  <History />
                </View>
              </ScrollView>
            </View>

{/* --------------------------------------------------------------------------------------------------------------------------------- */}

            <View style={styles.whiteNoisePage}>
              {/* Submenu Section */}
              <ScrollView
                horizontal
                contentContainerStyle={styles.subMenuContainer}
                showsHorizontalScrollIndicator={false}
                onTouchStart={(ev) => {
                  this.setState({ enabled: false });
                }}
                onMomentumScrollEnd={(e) => {
                  this.setState({ enabled: true });
                }}
                onScrollEndDrag={(e) => {
                  this.setState({ enabled: true });
                }}
              >
                {whiteNoiseSubMenu.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleWhiteNoiseSubMenuPress(index)}
                    style={[
                      styles.menuItemContainer,
                      index === this.state.subActiveIndexWhiteNoise &&
                        styles.activeMenuItemContainer,
                    ]}
                  >
                    <Text
                      style={[
                        styles.subItemText,
                        index === this.state.subActiveIndexWhiteNoise &&
                          styles.activeItemText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Submenu Content Section */}
              <ScrollView
                horizontal
                pagingEnabled
                contentContainerStyle={styles.subPagesContainer}
                onScroll={this.handleWhiteNoiseSubScroll}
                scrollEventThrottle={16}
                ref={this.whiteNoiseSubScrollViewRef}
                showsHorizontalScrollIndicator={false}
                onTouchStart={(ev) => {
                  this.setState({ enabled: false });
                }}
                onMomentumScrollEnd={(e) => {
                  this.setState({ enabled: true });
                }}
                onScrollEndDrag={(e) => {
                  this.setState({ enabled: true });
                }}
              >
                <View style={styles.allPage}>
                  <WNall />
                </View>
                <View style={styles.mixesPage}>
                  <WNmixes />
                </View>
                <View style={styles.rainPage}>
                  <WNrain />
                </View>
                <View style={styles.asmrPage}>
                  <WNasmr />
                </View>
                <View style={styles.naturePage}>
                  <WNnature />
                </View>
                <View style={styles.animalPage}>
                  <WNanimal />
                </View>
                <View style={styles.cityPage}>
                  <WNcity />
                </View>
                <View style={styles.specialPage}>
                  <WNspecial />
                </View>
              </ScrollView>
            </View>

            <View style={styles.musicPage}><MusicPage /></View>
            <View style={styles.storyPage}></View>
            <View style={styles.recentUpdatesPage}><RecentlyUpdatedPage /></View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const getRandomColor = () =>
  `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#121212",
  },
  mainScrollContainer: {
    paddingHorizontal: 10,
    marginTop: 80,
  },
  menuItemContainer: {
    paddingHorizontal: 10,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    borderWidth: 1,
    height: 45,
  },
  activeMenuItemContainer: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
  subItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  activeItemText: {
    color: "white",
  },
  mainBannerImage: {
    width: ScreenWidth,
  },
  mainPageScrollContainer: {
    marginTop: 10,
  },
  myAidsPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
    height: ScreenHeight - 150,
  },
  whiteNoisePage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
    // minHeight: ScreenHeight,
  },
  musicPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  storyPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  recentUpdatesPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  subMenuContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 85,
    marginHorizontal: 10,
  },
  favouritesPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  historyPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  favourites1Page: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  // subPagesContainer: {
  //   justifyContent: 'flex-start'
  // },
  allPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  mixesPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  rainPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  asmrPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  naturePage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
  animalPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,    
  },
  cityPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,    
  },
  specialPage: {
    backgroundColor: 'transparent',
    width: ScreenWidth,
    flex: 1,
  },
});

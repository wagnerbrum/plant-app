import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppLoading } from "expo";

import { Asset } from "expo-asset";

import Navigation from "./navigation";
import { Block } from "./components";

// import all user images
const images = [
    require("./assets/icons/back.png"),
    require("./assets/icons/plants.png"),
    require("./assets/icons/seeds.png"),
    require("./assets/icons/flowers.png"),
    require("./assets/icons/sprayers.png"),
    require("./assets/icons/pots.png"),
    require("./assets/icons/fertilizers.png"),
    require("./assets/images/plants_1.png"),
    require("./assets/images/plants_2.png"),
    require("./assets/images/plants_3.png"),
    require("./assets/images/explore_1.png"),
    require("./assets/images/explore_2.png"),
    require("./assets/images/explore_3.png"),
    require("./assets/images/explore_4.png"),
    require("./assets/images/explore_5.png"),
    require("./assets/images/explore_6.png"),
    require("./assets/images/avatar.png")
];

export default App = () => {
    const [isLoading, setIsLoading] = useState(false);

    handleResourceAsync = async () => {
        // we are caching all the images
        // for buffer performace on the app
        const cacheImages = images.map(img => {
            return Asset.fromModule(img).downloadAsync();
        });

        return Promise.all(cacheImages);
    };

    if (!isLoading) {
        return (
            <AppLoading
                startAsync={handleResourceAsync}
                onError={error => console.warn(error)}
                onFinish={() => setIsLoading(true)}
            />
        );
    } else {
        return (
            <Block white>
                <Navigation />
            </Block>
        );
    }
};

const styles = StyleSheet.create({});

// https://www.youtube.com/watch?v=gyiwFcrVRCM   =>  1:07:07

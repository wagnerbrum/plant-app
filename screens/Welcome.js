import React, { useState } from "react";
import {
    Animated,
    Dimensions,
    StyleSheet,
    FlatList,
    Image,
    Modal,
    ScrollView
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme } from "../constants";

const { width, height } = Dimensions.get("window");

const Welcome = props => {
    const [showTerms, setShowTerms] = useState(false);

    const scrollX = new Animated.Value(0);

    const { navigation } = props;

    function renderIllustrations() {
        const { illustrations } = props;

        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                // extraData={}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{
                            width,
                            height: height / 3,
                            overflow: "visible"
                        }}
                    />
                )}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ])}
            />
        );
    }

    function renderSteps() {
        const { illustrations } = props;
        const stepPosition = Animated.divide(scrollX, width);

        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp"
                    });

                    return (
                        <Block
                            animated
                            flex={false}
                            key={`step-${index}`}
                            color="gray"
                            style={[styles.steps, { opacity }]}
                        />
                    );
                })}
            </Block>
        );
    }

    function renderTerms() {
        return (
            <Modal animationType="slide" visible={showTerms}>
                <Block
                    padding={[theme.sizes.padding, theme.sizes.padding]}
                    space="between"
                >
                    <Text h2 light center>
                        Terms of Service
                    </Text>

                    <ScrollView
                        style={{ paddingVertical: theme.sizes.padding }}
                    >
                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>

                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>

                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>

                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>

                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>

                        <Text caption gray height={16}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </Text>
                    </ScrollView>

                    <Button gradient onPress={() => setShowTerms(false)}>
                        <Text center white>
                            I understand
                        </Text>
                    </Button>
                </Block>
            </Modal>
        );
    }

    return (
        <Block center middle>
            <Block center middle flex={0.7}>
                <Text h1 center bold>
                    Your Home.
                    <Text h1 primary>
                        Greener.
                    </Text>
                </Text>
                <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                    Enjoy the experience.
                </Text>
            </Block>
            <Block center middle>
                {renderIllustrations()}
                {renderSteps()}
            </Block>
            <Block middle flex={0.6} margin={(0, theme.sizes.padding / 2)}>
                <Button
                    gradient
                    style={{ width: width * 0.8 }}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text center semibold white>
                        Login
                    </Text>
                </Button>
                <Button
                    style={{ width: width * 0.8 }}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text center semibold>
                        Signup
                    </Text>
                </Button>
                <Button
                    style={{ width: width * 0.8 }}
                    onPress={() => setShowTerms(true)}
                >
                    <Text center caption gray>
                        Terms of service
                    </Text>
                </Button>
            </Block>
            {renderTerms()}
        </Block>
    );
};

Welcome.defaultProps = {
    illustrations: [
        { id: 1, source: require("../assets/images/illustration_1.png") },
        { id: 2, source: require("../assets/images/illustration_2.png") },
        { id: 3, source: require("../assets/images/illustration_3.png") }
    ]
};

export default Welcome;

const styles = StyleSheet.create({
    stepsContainer: {
        position: "absolute",
        bottom: theme.sizes.base * 2,
        right: 0,
        left: 0
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5
    }
});

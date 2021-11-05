import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, Animated, } from 'react-native';
import NextButton from '../components/NextButton';
import OnboardingItems from '../components/OnboardingItems';
import Paginator from '../components/Paginator';
import slides from '../data/slides';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnboardingScreen:React.FC<{navigation: any}> = ({navigation}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef: any = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if(currentIndex < slides.length -1){
            slidesRef.current.scrollToIndex({index: currentIndex + 1})
        }
        else {
            try{ 
                await AsyncStorage.setItem('@viewOnboarding','true')
                navigation.navigate("Home")
            }
            catch(err){
                console.log("Error @setItem: ",err)
            }
        }
    }

    return (
        <View style={styles.Container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItems item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex+1)*(100/slides.length)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});

export default OnboardingScreen;

import React, {useEffect, useRef} from 'react'
import { StyleSheet, Text, View, Animated, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Circle } from 'react-native-svg';

const NextButton:React.FC<{percentage: number, scrollTo: any}> = ({percentage, scrollTo}) => {
    const size = 120;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef: any = useRef(null);

    const nextButton = require('../assets/arrow.png');

    const animation = (toValue: number) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    } 

    useEffect(()=>{
        animation(percentage)
    },[percentage])

    useEffect(()=>{
        progressAnimation.addListener((value)=>{
            const strokeDashoffset = circumference - (circumference*value.value)/100;
            
            if(progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        })
    }, [percentage])

    return (
        <View style={styles.Container}>
            <Svg width={size} height={size} style={{justifyContent: 'center', alignItems: 'center'}}>
                <G rotation="-90" origin={center} >
                    <Circle strokeWidth={strokeWidth} r={radius} stroke="#E6E7E8" cx={center} cy={center} />
                    <Circle
                        ref={progressRef}
                        strokeWidth={strokeWidth}
                        r={radius} stroke="#E4338F"
                        cx={center}
                        cy={center}
                        strokeDasharray={circumference}
                    />
                </G>
                <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                    <Image source={require('../assets/arrow.png')} />
                </TouchableOpacity>
            </Svg>
        </View>
    )
}
 
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    button: {
        backgroundColor: '#f4338f',
        borderRadius: 80,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 80,
        left: 20,
        top: 20
    }
});

export default NextButton;


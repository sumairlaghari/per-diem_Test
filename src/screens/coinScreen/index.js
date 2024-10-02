import {
    SafeAreaView,
    Text,
    View,
    Pressable,
    Animated,
    Easing,
    Image
  } from 'react-native';
  import React, {useState} from 'react';
  import {GlobalImports} from '../../config/globalImports';
  import getStyles from './styles';

  const CoinScreen = props => {
    const styles = getStyles(); 

    const [sprayEffects, setSprayEffects] = useState([]);

    const generateSpray = (event) => {
        const id = Date.now(); // Unique ID for each spray
        const translateAnim = new Animated.Value(0);
        const opacityAnim = new Animated.Value(1);
    
        const { locationX, locationY } = event.nativeEvent;
        console.log('loc X => ',locationX,' loc Y => ',locationY);
    
        const newSpray = {
          id,
          translateAnim,
          opacityAnim,
          initialX: locationX + GlobalImports.wp2(10), 
          initialY: locationY + GlobalImports.wp2(40), 
          //scale: Math.random() * 0.5 + 0.5, // Random scale between 0.5 and 1
          //scale: 1,
        };
    
        setSprayEffects((prevSprays) => [...prevSprays, newSpray]);
    
        Animated.parallel([
          Animated.timing(translateAnim, {
            toValue: -100, // Move upwards by 100 units
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setSprayEffects((prevSprays) => prevSprays.filter((spray) => spray.id !== id));
        });
    };

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.wrapper}>
          <View style={styles.headingWrap}>
            <Text style={styles.heading}>{'Coin Screen'}</Text>
          </View>
          <View style={styles.coinWrapper}>
            <Pressable onPress={generateSpray} style={styles.coinStyles} >
                <Image source={GlobalImports.IMAGES.coin} style={{width: '100%', height:'100%'}} resizeMode='contain' />
            </Pressable>
            {sprayEffects.map((spray) => (
            <Animated.Image
              key={spray.id}
              source={GlobalImports.IMAGES.coin2}
              style={[
                styles.sprayImage,
                {
                  left: spray.initialX, 
                  top: spray.initialY,
                //   transform: [
                //     {
                //       translateX: spray.translateAnim.interpolate({
                //         inputRange: [0, 1],
                //         outputRange: [0, spray.randomX],
                //       }),
                //     },
                //     {
                //       translateY: spray.translateAnim.interpolate({
                //         inputRange: [0, 1],
                //         outputRange: [0, spray.randomY],
                //       }),
                //     },
                //     { scale: spray.scale },
                //   ],
                  transform: [
                    {
                      translateY: spray.translateAnim,
                    },
                    //{ scale: spray.scale },
                  ],
                  opacity: spray.opacityAnim,
                },
              ]}
            />
            ))}
          </View>
        </View>
      </View>
    );
  };
  
  export default CoinScreen;
  
import {SafeAreaView, Text, TouchableOpacity, View,TextInput, ScrollView,Image,FlatList,Animated as RAnimated, Platform} from 'react-native';
import React, {useState,useRef} from 'react';
import {GlobalImports} from '../../config/globalImports';
import getStyles from './styles';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import TextComp from './textComp';

const OnBoarding = props => {

  const dispatch = GlobalImports.useDispatch();
  const darkMode = GlobalImports.useSelector(state => state?.darkMode?.state);
  const colors = GlobalImports.COLORS(darkMode);
  const styles = getStyles(colors);
  const scrollX = useRef(new RAnimated.Value(0)).current;
  const flatlistScrollRef = useRef();

  const dummyData = [
    {id:1,img:GlobalImports.IMAGES.onboarding1,heading:'Lorem Sum Heading 1',desc:"Lorem sum dummy text lorem sum dummy text Lorem sum dummy text lorem sum dummy text Lorem sum dummy text"},
    {id:2,img:GlobalImports.IMAGES.onboarding2,heading:"Lorem Sum Heading 2",desc:"Lorem sum dummy text lorem sum dummy text Lorem sum dummy text lorem sum dummy text Lorem sum dummy text lorem sum dummy text Lorem sum dummy text lorem sum dummy text Lorem sum dummy text"},
    {id:3,img:GlobalImports.IMAGES.onboarding3,heading:'Lorem Sum Heading 3',desc:"Lorem sum dummy text lorem sum dummy textLorem sum dummy text lorem sum dummy textLorem sum dummy text lorem sum dummy textLorem sum dummy text lorem sum dummy text Lorem sum dummy text lorem sum dummy text Lorem sum dummy text"},
];
  const [indexVal, setIndexVal] = useState(1);

  const onNext = () => {
    if(indexVal===dummyData?.length){
        dispatch({
          type: GlobalImports.types.OnBoardOn
        })
    }else{
        flatlistScrollRef?.current?.scrollToIndex({index:indexVal});
        setIndexVal(indexVal+1);
    }
  }

  return (
    <>
  <RAnimated.FlatList
     ref={flatlistScrollRef}
     scrollEnabled={false}
     horizontal
     pagingEnabled
     showsHorizontalScrollIndicator={false}
     onScroll={RAnimated.event(
       [{nativeEvent: {contentOffset: {x: scrollX}}}],
       {useNativeDriver: true},
     )}
     data={dummyData}
     renderItem={({item,index})=>{
       return(
         <View key={item?.id} style={styles.container} >
           <View style={styles.imgWrap}>
           <Image
             source={item?.img}
             style={{width: '100%', height: '100%'}}
             resizeMode="cover"
           />
           </View>
           <TextComp data={item} />
         </View>
       )
     }}
     >
  </RAnimated.FlatList>
  <TouchableOpacity onPress={onNext} style={styles.nextButton}>
    <Text style={{color:colors.buttonText,fontFamily:GlobalImports.fonts.semiBold,}}>{indexVal===3?"GET STARTED":"NEXT"}</Text>
  </TouchableOpacity>
  <View style={{position:'absolute',zIndex:9,bottom:GlobalImports.hp2(4),alignSelf:'center'}}>
    <RNAnimatedScrollIndicators
      numberOfCards={dummyData?.length}
      scrollWidth={GlobalImports.wp2(100)}
      activeColor={'green'}
      inActiveColor={'gray'}
      scrollAnimatedValue={scrollX}
    />
  </View>
    </>
  );
};

export default OnBoarding;

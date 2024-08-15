import ICONS from "./icons";
import { IMAGES } from "./images";
import  { COLORS, } from "./theme";
import { Languages } from "./language";
import {Dimensions} from 'react-native'
import { fonts } from "./fonts";

const {width, height}= Dimensions.get('screen');

const screenWidth=width
const screenHeight= height

const wp2 = widthPerc => {
	return  width* widthPerc /100;
}

const hp2 = heightPerc => {
	return height * heightPerc/100;
}
export {
	IMAGES,
	ICONS,
	COLORS,
	Languages,
screenHeight,
screenWidth,
	wp2,
	hp2,
	fonts,
};

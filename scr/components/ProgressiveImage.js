import { View, Text, Animated, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const ProgressiveImage = ({ defaultImageSource, source, style, ...props }) => {
	const defaultImageAnimated = new Animated.Value(0);
	const ImageAnimated = new Animated.Value(0);
	const handleDefaultImageLoad = () => {
		Animated.timing(defaultImageAnimated, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};
	const handleImageLoad = () => {
		Animated.timing(ImageAnimated, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};
	return (
		<View style={styles.container}>
			<Animated.Image
				{...props}
				source={defaultImageSource}
				style={[style, { opacity: defaultImageAnimated }]}
				onLoad={handleDefaultImageLoad}
				blurRadius={1}
			/>
			<Animated.Image
				{...props}
				source={source}
				style={[style, { opacity: ImageAnimated }, styles.imageOverlay]}
				onLoad={handleImageLoad}
				blurRadius={1}
			/>
		</View>
	);
};

export default ProgressiveImage;
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
        width: 70,
		height: 70,
        borderRadius:5,
        marginRight: 15,
	},
	imageOverlay: {
        position:'absolute',
		// width: '50',
		backgroundColor:COLORS.gray				
	},
});

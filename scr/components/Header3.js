import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { images } from "../constants";

const Header3 = () => {
	return (
			<Image
				source= {images.logo1}
				alt="App Logo"
				resizeMode="contain"
				style={styles.headerImg}
			/>
	);
};

export default Header3;
const styles = StyleSheet.create({
    headerImg:{
        width: 105,
		height: 105,
        borderRadius: 50,
       
    }
});
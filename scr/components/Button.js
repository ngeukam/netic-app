import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons, Feather } from "@expo/vector-icons";

const Button = ({style1, style2, style4, buttontext, iconname, iconcolor, iconsize, onPress}) => {
	return (
		<View style={style1}>
			<Pressable onPress={onPress}>
				<View style={style2}>
					<Text style={style4}>{buttontext}</Text>
                    <Feather name= {iconname} size={iconsize} color={iconcolor}/>
				</View>
               
			</Pressable>
		</View>
	);
};

export default Button;

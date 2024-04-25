import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const Button = ({
	style1,
	style2,
	style3,
	style4,
	style5,
	iconstyle,
	buttontext,
	iconname,
	iconcolor,
	iconsize,
	ioconname,
	ioconsize,
	ioconcolor,
	imgicon,
	onPress,
	disabled,
	activityIndicator,
}) => {
	return (
		<View style={style1}>
			<Pressable onPress={onPress} style={style4} disabled={disabled}>
				<View style={style2}>
					{buttontext && <Text style={style3}>{buttontext}</Text>}
					{iconname && (
						<Feather
							name={iconname}
							size={iconsize}
							color={iconcolor}
							style={iconstyle}
						/>
					)}
					{ioconname && (
						<Ionicons
							name={ioconname}
							size={ioconsize}
							color={ioconcolor}
							style={{ marginLeft: 10 }}
						/>
					)}
					{imgicon && (
						<Image source={imgicon} resizeMode="contain" style={style5} />
					)}
					{activityIndicator && (
						<ActivityIndicator size={25} color={COLORS.white} />
					)}
				</View>
			</Pressable>
		</View>
	);
};

export default Button;

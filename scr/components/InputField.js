import { View, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const InputField = ({
	autoCapitalize,
	placeholder,
	keyboardType,
	onChangeText,
	value,
	numberOfLines,
	style,
}) => {
	return (
		<TextInput
			autoCapitalize={autoCapitalize}
			keyboardType={keyboardType}
			onChangeText={onChangeText}
			placeholder={placeholder}
			placeholderTextColor={COLORS.placeholder_text_color}
			style={style}
			value={value}
			numberOfLines={numberOfLines}
		/>
	);
};

export default InputField;

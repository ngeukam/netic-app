import { TextInput } from "react-native";
import { COLORS } from "../constants";

const InputField = ({
	autoCapitalize,
	placeholder,
	keyboardType,
	onChangeText,
	value,
	numberOfLines,
	readOnly,
	style,
	autoFocus,
	secureTextEntry
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
			readOnly={readOnly}
			numberOfLines={numberOfLines}
			autoFocus={autoFocus}
			secureTextEntry={secureTextEntry}
		/>
	);
};

export default InputField;

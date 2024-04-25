import { View } from "react-native";

const PasswordStrength = ({strength, strengthMeterStyle}) => {
	return (
		<View style={strengthMeterStyle}>
			<View
				style={{
					width: `${
						strength === "Very Strong"
							? 100
							: strength === "Strong"
							? 75
							: strength === "Moderate"
							? 50
							: strength === "Weak"
							? 25
							: 0
					}%`,
					height: 20,
					backgroundColor:
						strength === "Too Weak"
							? "red"
							: strength === "Weak"
							? "orange"
							: strength === "Moderate"
							? "yellow"
							: strength === "Strong"
							? "green"
							: "limegreen",
				}}
			></View>
		</View>
	);
};

export default PasswordStrength;

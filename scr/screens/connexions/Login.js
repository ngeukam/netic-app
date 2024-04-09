import { useState, useRef, useContext } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	Pressable,
	TextInput,
} from "react-native";
import Header3 from "../../components/Header3";
import { COLORS } from "../../constants";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const navigation = useNavigation();
	const { Login, isLoading } = useContext(AuthContext);

	const [form, setForm] = useState({
		phone_number: "",
		password: "",
	});
	const phoneInput = useRef(null);
	const handleLoginRegister = () => {
		Login(form.phone_number, form.password);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					alignItems: "center",
					paddingTop: 30,
				}}
			>
				<Header3 />
			</View>
			<KeyboardAwareScrollView>
				<View style={styles.header}>
					<View style={{ flexDirection: "row" }}>
						<Text style={styles.title}>Se Connecter</Text>
					</View>
					<Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
				</View>
				<View style={styles.form}>
					<Text style={styles.inputLabel}>Numéro de téléphone</Text>
					<PhoneInput
						ref={phoneInput}
						defaultValue={form.phone_number}
						defaultCode="CM"
						placeholder="..."
						layout="first"
						onChangeFormattedText={(phone_number) => {
							setForm({ ...form, phone_number });
						}}
						withDarkTheme
						withShadow
						containerStyle={styles.containerStyle}
						textInputStyle={styles.textInputStyle}
						codeTextStyle={styles.codeTextStyle}
						textContainerStyle={styles.textContainerStyle}
					/>

					<View style={styles.input}>
						<Text style={styles.inputLabel}>Mot de passe</Text>
						<TextInput
							autoCorrect={false}
							onChangeText={(password) => setForm({ ...form, password })}
							placeholder="********"
							placeholderTextColor="#6b7280"
							style={styles.inputControl}
							secureTextEntry={true}
							value={form.password}
							autoFocus
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<Button
				onPress={handleLoginRegister}
				style1={styles.btncontainer}
				style2={styles.btn}
				style3={styles.btnText}
				buttontext={"Se connecter"}
				disabled={isLoading ? true : false}
			/>

			<Pressable
				onPress={() => {
					navigation.navigate("Login");
				}}
			></Pressable>
			<Pressable
				onPress={() => {
					navigation.navigate("Phone");
				}}
			>
				<Text style={styles.formFooter}>
					Vous n'avez pas de compte ?{" "}
					<Text
						style={{
							textDecorationLine: "underline",
							color: COLORS.blue,
						}}
					>
						S'enregistrer
					</Text>
				</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		backgroundColor: COLORS.gray,
		justifyContent: "center",
		alignContent: "center",
		paddingBottom: 30,
	},
	header: {
		marginVertical: 20,
		paddingTop: 50,
		paddingHorizontal: 24,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#1D2A32",
		marginBottom: 1,
	},
	subtitle: {
		fontSize: 14,
		fontWeight: "500",
		color: "#929292",
	},
	btncontainer: {
		paddingHorizontal: 24,
	},
	/** Form */
	form: {
		paddingHorizontal: 24,
		paddingBottom: 10,
	},
	formFooter: {
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		textAlign: "center",
		letterSpacing: 0.15,
	},
	/** Phone Input */
	textInputStyle: {
		color: "#222",
		fontSize: 17,
		fontWeight: "500",
	},
	containerStyle: {
		borderRadius: 12,
		fontWeight: "500",
		backgroundColor: "#FFF",
		width: "100%",
		marginBottom: 16,
	},
	codeTextStyle: {
		fontSize: 17,
		color: "#222",
	},
	textContainerStyle: {
		borderRadius: 12,
		height: 44,
		backgroundColor: "#FFF",
		paddingVertical: 2,
	},
	/** Input */
	input: {
		marginBottom: 12,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "600",
		color: "#222",
		marginBottom: 8,
	},
	inputControl: {
		height: 44,
		backgroundColor: COLORS.white,
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
	},
	strengthMeter: {
		width: "100%",
		height: 10,
		backgroundColor: "#ccc",
		borderRadius: 10,
		overflow: "hidden",
	},
	suggestionsText: {
		color: COLORS.red,
	},

	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},

	btnText: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: COLORS.white,
	},
});

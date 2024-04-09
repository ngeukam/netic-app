import { useState, useEffect, useContext } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	TextInput,
} from "react-native";
import Header3 from "../../components/Header3";
import { COLORS } from "../../constants";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordStrength from "../../components/PasswordStrength";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";
import { instance } from "../../../config";
import { ToastErrorMessage } from "../../components/ToastErrorMessage";
import { Feather } from "@expo/vector-icons";
const Register = () => {
	const navigation = useNavigation();
	const { Login } = useContext(AuthContext);
	const [form, setForm] = useState({
		name: "",
		password: "",
		phone_number: "",
	});
	const [registerbol, setRegisterBol] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [strength, setStrength] = useState("");
	//GET PHONE STORE
	const GetPhoneStore = async (key) => {
		await SecureStore.getItemAsync(key).then((response) => {
			setForm({ ...form, phone_number: JSON.parse(response) });
		});
	};
	// DELETE PHONE STORE AFTER LOGIN
	const DeleteKey = async (key) => {
		await SecureStore.deleteItemAsync(key);
	};
	// State variable to track password visibility
	const [showPassword, setShowPassword] = useState(false);

	// Function to toggle the password visibility state
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
		GetPhoneStore("PhoneStore");
	}, []);
	const validatePassword = (input) => {
		setForm({ ...form, password: input });
		let newSuggestions = [];
		if (input?.length < 6) {
			newSuggestions.push("Doit avoir au moins 6 caractéres");
		}
		if (!/\d/.test(input)) {
			newSuggestions.push("Ajouter au moins un chiffre");
		}

		if (!/[A-Z]/.test(input || !/[a-z]/.test(input))) {
			newSuggestions.push("Inclure les lettres majuscules et minuscules");
		}

		if (!/[^A-Za-z0-9]/.test(input)) {
			newSuggestions.push("Inclure au moins un @ ou # ou $ ou * ");
		}

		setSuggestions(newSuggestions);

		// Determine password strength based on suggestions
		if (newSuggestions.length === 0) {
			setStrength("Very Strong");
		} else if (newSuggestions.length <= 1) {
			setStrength("Strong");
		} else if (newSuggestions.length <= 2) {
			setStrength("Moderate");
		} else if (newSuggestions.length <= 3) {
			setStrength("Weak");
		} else {
			setStrength("Too Weak");
		}
	};
	const handleSubmitRegister = async () => {
		if (form.name === "" || form.password === "") {
			ToastErrorMessage("Tous les champs sont obligatoires.");
		} else if (strength !== "Very Strong") {
			ToastErrorMessage("Votre mot de passe est assez simple.");
		} else {
			setRegisterBol(true);
			await instance
				.post("register", {
					phone_number: form.phone_number,
					name: form.name,
					password: form.password,
				})
				.then(() => {
					DeleteKey("PhoneStore");
					setForm({ name: "", password: "", phone_number: "" });
					Login(form.phone_number, form.password);
				})
				.finally(() => {
					setRegisterBol(false);
				});
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView>
				<View
					style={{
						alignItems: "center",
						paddingTop: 30,
					}}
				>
					<Header3 />
				</View>
				<View style={styles.header}>
					<View style={{ flexDirection: "row" }}>
						<Text style={styles.title}>Création de compte</Text>
					</View>
					<Text style={styles.subtitle}>Créer votre compte pour continuer</Text>
				</View>
				<View style={styles.form}>
					<View style={styles.input}>
						<Text style={styles.inputLabel}>Nom & Prénom</Text>

						<TextInput
							autoCapitalize="none"
							onChangeText={(name) => setForm({ ...form, name })}
							placeholder="Ango Dan"
							placeholderTextColor="#6b7280"
							style={styles.inputControl}
							value={form.name}
						/>
					</View>

					<View style={styles.input}>
						<Text style={styles.inputLabel}>Mot de passe</Text>
						{form.password && (
							<Text style={styles.suggestionsText}>
								{suggestions.map((suggestion, index) => (
									<Text key={index}>
										{suggestion}
										{"\n"}
									</Text>
								))}
							</Text>
						)}
						<PasswordStrength
							strength={strength}
							strengthMeterStyle={styles.strengthMeter}
						/>
						<View style={styles.containerPassEye}>
							<TextInput
								autoCorrect={false}
								onChangeText={(input) => validatePassword(input)}
								placeholder="********"
								placeholderTextColor="#6b7280"
								style={styles.inputControl2}
								secureTextEntry={!showPassword}
								value={form.password}
								autoFocus={true}
							/>
							<Feather
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color="#aaa"
								style={styles.icon}
								onPress={toggleShowPassword}
							/>
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<Button
				onPress={handleSubmitRegister}
				style1={styles.btncontainer}
				style2={styles.btn}
				style3={styles.btnText}
				buttontext={"Continuez"}
				ioconname={"arrow-forward"}
				ioconsize={25}
				ioconcolor={COLORS.white}
				activityIndicator={registerbol ? true : false}
				disabled={registerbol ? true : false}
			/>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		backgroundColor: COLORS.gray,
		justifyContent: "center",
		alignContent: "center",
		paddingBottom: 20,
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
	inputControl2: {
		flex: 1,
		paddingVertical: 10,
		paddingRight: 10,
		fontSize: 15,
		backgroundColor: COLORS.white,
		borderRadius: 12,
	},
	containerPassEye: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: 16,
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
		height: 5,
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
		color: "#fff",
	},
});

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Keyboard,
	Platform,
	TouchableWithoutFeedback,
	Pressable,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Header3 from "../../components/Header3";
import Button from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import { ToastErrorMessage } from "../../components/ToastErrorMessage";
import { instance, generateOTPCode } from "../../../config";

const Phone = () => {
	const navigation = useNavigation();
	const [phonenumber, setPhoneNumber] = useState("");
	const [otpcode, setOTPCode] = useState(null);
	const [sendotpcode, setSendOTPCode] = useState(false);
	const [valid, setValid] = useState(false);
	const [showMessage, setShowMessage] = useState(false);
	const phoneInput = useRef(null);
	console.log(otpcode);
	let listPhone = [];

	useEffect(() => {
		setOTPCode(generateOTPCode);
	}, []);
	//FUNCTIONS TO STORE IN ASYNC STORAGE
	const CodeOtpStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	const PhoneNumberStore = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	//END

	const handleSendOtpCode = async () => {
		setSendOTPCode(true);
		await instance
			.post(`send-otp`, {
				phone: phonenumber,
				otpcode: otpcode,
			})
			.then(() => {
				PhoneNumberStore("PhoneStore", JSON.stringify(phonenumber));
				CodeOtpStore("OtpStore", JSON.stringify(otpcode));
				setSendOTPCode(false);
				setPhoneNumber("");
				navigation.navigate("Otp");
			})
			.catch((e) => {
				if (e.response?.status === 400) {
					ToastErrorMessage("Ce numéro existe déjà!");
				}
			}).finally(()=> {
				setSendOTPCode(false);
			});
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
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.form}>
						<PhoneInput
							ref={phoneInput}
							defaultValue={phonenumber}
							defaultCode="CM"
							layout="first"
							placeholder="..."
							onChangeFormattedText={(text) => {
								setPhoneNumber(text);
							}}
							withDarkTheme
							withShadow
							autoFocus
							containerStyle={styles.containerStyle}
							textInputStyle={styles.textInputStyle}
							codeTextStyle={styles.codeTextStyle}
							textContainerStyle={styles.textContainerStyle}
						/>

						<Button
							onPress={() => {
								const checkValid = phoneInput.current?.isValidNumber(
									phonenumber
								);
								setValid(checkValid ? checkValid : false);
								if (checkValid) {
									handleSendOtpCode();
								} else {
									ToastErrorMessage("numéro non valide!");
								}
							}}
							style2={styles.btn}
							style3={styles.btnText}
							buttontext={"Continuez"}
							ioconname={"arrow-forward"}
							ioconsize={25}
							ioconcolor={COLORS.white}
							activityIndicator={sendotpcode ? true : false}
						/>
						<Pressable
							onPress={() => {
								navigation.navigate("Login");
							}}
						>
							<Text style={styles.formFooter}>
								Vous avez déjà un compte ?{" "}
								<Text
									style={{
										textDecorationLine: "underline",
										color: COLORS.blue,
									}}
								>
									Se connecter
								</Text>
							</Text>
						</Pressable>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Phone;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		paddingHorizontal: 16,
		backgroundColor: COLORS.gray,
		// rowGap: 10,
	},
	container_phone_error_message: {
		alignItems: "center",
		marginBottom: 10,
	},
	phone_error_message: {
		color: COLORS.red,
	},
	form: {
		paddingHorizontal: 16,
		marginVertical: 80,
	},
	formFooter: {
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		textAlign: "center",
		letterSpacing: 0.15,
		marginTop: 10,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "600",
		color: "#222",
		marginBottom: 8,
	},
	inputControl: {
		height: 50,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: "#222",
		borderWidth: 1,
		borderColor: "#C9D3DB",
		borderStyle: "solid",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
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
		height: 50,
		backgroundColor: "#FFF",
		paddingVertical: 2,
	},
	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},
	btndisabled: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: "#CCC",
		borderColor: "#CCC",
	},
	btnText: {
		fontSize: 18,
		lineHeight: 26,
		fontWeight: "600",
		color: "#fff",
	},
});

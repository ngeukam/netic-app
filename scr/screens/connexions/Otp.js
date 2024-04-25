import { useState, useEffect } from "react";
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { COLORS } from "../../constants";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header3 from "../../components/Header3";
import Button from "../../components/Button";
import RensendOtp from "../../components/RensendOtp";
import * as SecureStore from "expo-secure-store";
import { instance } from "../../../config";
import { ToastErrorMessage } from "../../components/ToastErrorMessage";

const Otp = () => {
	const navigation = useNavigation();
	const isfocused = useIsFocused();
	const [otp, setOtp] = useState(["", "", "", ""]);
	const inputs = [];

	const [resendingOtp, setResendingOtp] = useState(false);
	const [timeleft, setTimeLeft] = useState(null);
	const [targetTime, setTargetTime] = useState(null);

	const [activeResend, setActiveRend] = useState(false);
	const [otpcode, setOtpCode] = useState("");
	const [phone, setPhone] = useState("");
	const [otpbol, setOtpBol] = useState(false);
	const join_otp_input = otp.join("");
	console.log(otpcode);
	//GET OTP CODE AND PHONE
	const GetCodeOtpStore = async (key) => {
		await SecureStore.getItemAsync(key).then((response) => {
			setOtpCode(response);
		});
	};
	// DELETE OTP STORE AFTER SEND
	const DeleteKey = async (key) => {
		await SecureStore.deleteItemAsync(key);
	};

	const GetPhoneStore = async (key) => {
		await SecureStore.getItemAsync(key).then((response) => {
			setPhone(response);
		});
	};
	useEffect(() => {
		GetCodeOtpStore("OtpStore");
		GetPhoneStore("PhoneStore");
		setOtp(["", "", "", ""]);
	}, [isfocused]);
	//END
	let resendTimerInterval;

	const calculateTimeLeft = (finalTime) => {
		const difference = finalTime - +new Date();
		if (difference >= 0) {
			setTimeLeft(Math.round(difference / 1000));
		} else {
			setTimeLeft(null);
			clearInterval(resendTimerInterval);
			setActiveRend(true);
		}
	};

	const triggerTimer = (targetTimeInSeconds = 30) => {
		setTargetTime(targetTimeInSeconds);
		setActiveRend(false);
		const finalTime = +new Date() + targetTimeInSeconds * 1000;

		resendTimerInterval = setInterval(() => {
			calculateTimeLeft(finalTime), 1000;
		});
	};

	useEffect(() => {
		triggerTimer();
		return () => {
			clearInterval(resendTimerInterval);
		};
	}, []);

	const resendOtp = async () => {
		setResendingOtp(true);
		instance
			.post(`send-otp`, {
				phone_number: phone,
				otpcode: otpcode,
			})
			.then(() => {
				console.log("Otp code resend successfully!");
			})
			.catch((error) => {
				// Handle errors
				setOtp(["", "", "", ""]);
				console.error(error);
			})
			.finally(() => {
				setResendingOtp(false);
			});
	};

	const handleOtpChange = (value, index) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		// Move focus to the next box if the current one has a value
		if (value && index < newOtp.length - 1) {
			inputs[index + 1].focus();
		}
	};
	const handleSubmitOTPForm = async () => {
		setOtpBol(true);
		// if (JSON.parse(otpcode) == join_otp_input) {
		// 	navigation.navigate("Register");
		// 	setOtpBol(false);
		// 	DeleteKey("OtpStore");
		// } else {
		// 	ToastErrorMessage("Ce code ne correspond pas!");
		// 	setOtpBol(false);
		// }
		navigation.navigate("Register");
		setOtpBol(false);
		DeleteKey("OtpStore");
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
						<Text style={styles.title}>OTP</Text>

						<Text style={styles.subtitle}>
							Veuillez entrer le code reçu par sms
						</Text>

						<View style={styles.otp}>
							{otp.map((digit, index) => (
								<TextInput
									key={index}
									style={styles.box}
									maxLength={1}
									keyboardType="numeric"
									onChangeText={(value) => handleOtpChange(value, index)}
									value={digit}
									ref={(input) => {
										inputs[index] = input;
									}}
									autoFocus={true}
								/>
							))}
						</View>
						<Button
							onPress={handleSubmitOTPForm}
							style2={styles.btn}
							style3={styles.btnText}
							buttontext={"Continuez"}
							ioconname={"arrow-forward"}
							ioconsize={25}
							ioconcolor={COLORS.white}
							activityIndicator={otpbol ? true : false}
							disabled={otpbol ? true : false}
						/>

						<RensendOtp
							textStyle1={styles.footer1}
							textStyle2={styles.footer2}
							textStyle3={styles.footer3}
							resendingOtp={resendingOtp}
							resendOtp={resendOtp}
							activeResend={activeResend}
							timeleft={timeleft}
							targetTime={targetTime}
						/>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Otp;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		paddingHorizontal: 16,
		backgroundColor: COLORS.white,
		
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
	footer1: {
		color: COLORS.placeholder_text_color,
		fontSize: 15,
		fontWeight: "500",
	},
	footer2: {
		color: COLORS.black_ligth,
		fontSize: 16,
		fontWeight: "800",
	},
	footer3: {
		color: COLORS.placeholder_text_color,
		fontSize: 15,
		fontWeight: "500",
	},

	title: {
		fontSize: 30,
		fontWeight: "500",
		color: COLORS.black_ligth,
		// marginBottom: 40,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.placeholder_text_color,
		textAlign: "center",
		marginBottom: 10,
	},
	otp: {
		flexDirection: "row",
		justifyContent: "center",
	},
	box: {
		width: 60,
		height: 60,
		marginHorizontal: 10,
		marginBottom: 16,
		fontSize: 20,
		textAlign: "center",
		backgroundColor: COLORS.white,
		borderRadius: 12,
		fontWeight: "500",
		color: "#222",
		fontSize: 40,
		borderWidth: 2,
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
	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		paddingVertical: 10,
		marginBottom: 16,
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

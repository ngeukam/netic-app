import React, { useCallback, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useContext, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { images, COLORS } from "../constants";
import { AuthContext } from "../context/AuthContext";
import { instance } from "../../config";
import { useFocusEffect } from "@react-navigation/native";
import { Modal } from "react-native";
import InputField from "../components/InputField";
import { Ionicons, Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../components/Button";
import { ToastSuccessMessage } from "../components/ToastSuccessMessage";
import { ToastProfileErrorMessage } from "../components/ToastProfileErrorMessage";

const EditProfile = ({ route }) => {
	const { userId } = useContext(AuthContext);
	const [form, setForm] = useState({
		old_password: "",
		new_password: "",
	});
	console.log(form);
	const [suggestions, setSuggestions] = useState([]);
	const [strength, setStrength] = useState("");
	const [changepass, setChangePass] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const validatePassword = (input) => {
		setForm({ ...form, new_password: input });
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
	const [modalVisible, setModalVisible] = useState(false);
	const handleVisible = () => {
		setModalVisible(true);
		setForm({ old_password: "", new_password: "" });
		setChangePass(false);
	};
	useEffect(() => {
		setForm({ old_password: "", new_password: "" });
	}, []);
	const handleChangePassword = async () => {
		if (!form.old_password || !form.new_password) {
			ToastProfileErrorMessage("Champs obligatoires");
			setChangePass(false);
		} else if (strength !== "Very Strong") {
			ToastProfileErrorMessage("Le nouveau mot de passe est assez simple.");
			setChangePass(false);
		} else {
			setChangePass(true);
			await instance
				.put(`change-password/${userId}`, form)
				.then(() => {
					ToastSuccessMessage("Votre mot de passe a été modifié.");
					setModalVisible(false);
				})
				.catch((e) => {
					if (e.response?.status === 400) {
						ToastProfileErrorMessage("Erreur sur l'ancien mot de passe.");
					}
				})
				.finally(() => {
					setChangePass(false);
				});
		}
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Mes infos</Text>

						<TouchableOpacity
							onPress={() => {
								// handle onPress
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: COLORS.blue }]}>
								<FeatherIcon color="#fff" name="phone" size={20} />
							</View>

							<Text style={styles.rowLabel}>{route.params.phone} </Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="edit-3" size={20} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								handleVisible();
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: COLORS.red }]}>
								<FeatherIcon color="#fff" name="lock" size={20} />
							</View>

							<Text style={styles.rowLabel}>****************</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="edit-3" size={20} />
						</TouchableOpacity>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<View style={[styles.containerPassEye, { marginBottom: 10 }]}>
										<InputField
											onChangeText={(old_password) =>
												setForm({ ...form, old_password })
											}
											placeholder="Ancien mot de passe"
											placeholderTextColor="#6b7280"
											style={styles.inputControl2}
											secureTextEntry={!showPassword}
											value={form.old_password}
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
									{form.new_password && (
										<Text style={styles.suggestionsText}>
											{suggestions.map((suggestion, index) => (
												<Text key={index}>
													{suggestion}
													{"\n"}
												</Text>
											))}
										</Text>
									)}
									<View style={styles.containerPassEye}>
										<InputField
											onChangeText={(input) => validatePassword(input)}
											placeholder="Nouveau mot de passe"
											placeholderTextColor="#6b7280"
											style={styles.inputControl2}
											secureTextEntry={!showPassword}
											value={form.new_password}
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
									<Button
										onPress={handleChangePassword}
										style2={styles.btn}
										style3={styles.btnText}
										buttontext={"Validez"}
										ioconsize={25}
										ioconcolor={COLORS.white}
										activityIndicator={changepass ? true : false}
										disabled={changepass ? true : false}
									/>

									<TouchableOpacity
										style={[styles.button]}
										onPress={() => setModalVisible(!modalVisible)}
									>
										<Ionicons
											name="close-sharp"
											size={40}
											color={COLORS.white}
										/>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};
export default EditProfile;
const styles = StyleSheet.create({
	container: {
		padding: 0,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		borderBottomWidth: 55,
		borderBottomColor: "transparent",
	},
	/** Section */
	section: {
		paddingHorizontal: 24,
	},
	sectionTitle: {
		paddingVertical: 12,
		fontSize: 12,
		fontWeight: "600",
		color: "#9e9e9e",
		textTransform: "uppercase",
		letterSpacing: 1.1,
	},
	/** Row */
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		height: 50,
		backgroundColor: "#f2f2f2",
		borderRadius: 8,
		marginBottom: 12,
		paddingLeft: 12,
		paddingRight: 12,
	},
	rowIcon: {
		width: 32,
		height: 32,
		borderRadius: 9999,
		marginRight: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	rowLabel: {
		fontSize: 17,
		fontWeight: "400",
		color: "#0c0c0c",
	},
	rowSpacer: {
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.7)",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 2,
	},
	button: {
		borderRadius: 13,
		padding: 10,
		top: 10,
		right: 0,
		position: "absolute",
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
		marginHorizontal: 16,
		paddingHorizontal: 16,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 2,
			width: -2,
		},
		elevation: 4,
	},
	suggestionsText: {
		color: COLORS.white,
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

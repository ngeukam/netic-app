import { useCallback, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Switch,
	Image,
	useColorScheme,
} from "react-native";
import { useContext } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, images } from "../constants";
import { AuthContext } from "../context/AuthContext";
import { instance } from "../../config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const Profile = () => {
	const navigation = useNavigation();
	const { authPhone, Logout } = useContext(AuthContext);
	const isDarkMode = useColorScheme() === "dark";
	const backgroundStyle = {
		backgroundColor: isDarkMode ? COLORS.black_ligth : COLORS.white,
	};
	const [form, setForm] = useState({
		darkMode: false,
		emailNotifications: true,
		pushNotifications: false,
	});
	const [data, setData] = useState();
	const handleGetProfile = async () => {
		await instance.get(`profile`).then((response) => {
			setData(response.data?.name);
		});
	};
	useFocusEffect(
		useCallback(() => {
			handleGetProfile();
		}, [])
	);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<View style={styles.container}>
				<View style={[styles.profile, { backgroundStyle }]}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Edit_Profile", {
								name: data,
								phone: authPhone,
							});
						}}
					>
						<View style={styles.profileAvatarWrapper}>
							<Image
								alt=""
								source={(uri = images.avatar)}
								style={styles.profileAvatar}
							/>

							<View style={styles.profileAction}>
								<FeatherIcon color="#fff" name="edit-3" size={15} />
							</View>
						</View>
					</TouchableOpacity>

					<View>
						<Text style={styles.profileName}>{data}</Text>

						<Text style={styles.profileAddress}>{authPhone}</Text>
					</View>
				</View>

				<ScrollView>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Préfèrences</Text>

						<TouchableOpacity
							onPress={() => {
								// handle onPress
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
								<FeatherIcon color="#fff" name="globe" size={20} />
							</View>

							<Text style={styles.rowLabel}>Langues</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
						</TouchableOpacity>

						<View style={styles.row}>
							<View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
								<FeatherIcon color="#fff" name="moon" size={20} />
							</View>

							<Text style={styles.rowLabel}>Mode Sombre</Text>

							<View style={styles.rowSpacer} />

							<Switch
								onValueChange={(darkMode) => setForm({ ...form, darkMode })}
								value={form.darkMode}
							/>
						</View>

						<View style={styles.row}>
							<View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
								<FeatherIcon color="#fff" name="bell" size={20} />
							</View>

							<Text style={styles.rowLabel}>Push Notifications</Text>

							<View style={styles.rowSpacer} />

							<Switch
								onValueChange={(pushNotifications) =>
									setForm({ ...form, pushNotifications })
								}
								value={form.pushNotifications}
							/>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Resources</Text>

						<TouchableOpacity
							onPress={() => {
								// handle onPress
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: "#8e8d91" }]}>
								<FeatherIcon color="#fff" name="flag" size={20} />
							</View>

							<Text style={styles.rowLabel}>Signaler un Bug</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								// handle onPress
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
								<FeatherIcon color="#fff" name="mail" size={20} />
							</View>

							<Text style={styles.rowLabel}>Contacter Nous</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								// handle onPress
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
								<FeatherIcon color="#fff" name="info" size={20} />
							</View>

							<Text style={styles.rowLabel}>A propos de nous</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								Logout();
							}}
							style={styles.row}
						>
							<View style={[styles.rowIcon, { backgroundColor: COLORS.red }]}>
								<FeatherIcon color="#fff" name="log-out" size={20} />
							</View>

							<Text style={styles.rowLabel}>Déconnexion</Text>

							<View style={styles.rowSpacer} />

							<FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 0,
		flexGrow: 1,
		flexShrink: 1,
		flexBasis: 0,
		borderBottomWidth: 55,
		borderBottomColor: "transparent",
	},
	/** Profile */
	profile: {
		padding: 24,
		backgroundColor: "#fff",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	profileAvatarWrapper: {
		position: "relative",
	},
	profileAvatar: {
		width: 72,
		height: 72,
		borderRadius: 9999,
	},
	profileAction: {
		position: "absolute",
		right: -4,
		bottom: -10,
		alignItems: "center",
		justifyContent: "center",
		width: 28,
		height: 28,
		borderRadius: 9999,
		backgroundColor: "#007bff",
	},
	profileName: {
		marginTop: 20,
		fontSize: 19,
		fontWeight: "600",
		color: "#414d63",
		textAlign: "center",
	},
	profileAddress: {
		marginTop: 5,
		fontSize: 16,
		color: "#989898",
		textAlign: "center",
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
});

export default Profile;

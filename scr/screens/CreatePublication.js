import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, images } from "../constants";
import Header2 from "../components/Header2";
import BottomSheet from "../components/BottomSheet";
import SelectProductField from "../components/SelectProductField";
import SelectVehiculeField from "../components/SelectVehiculeField";
import InputField from "../components/InputField";
import SelectDeviseField from "../components/SelectDeviseField";

const CreatePublication = () => {
	const refRBSheet = useRef();
	const [product, setProduct] = useState([]);
	const [vehicule, setVehicule] = useState([]);
	const [quantity, setQuantity] = useState();
	const [budget, setBudget] = useState();
	const [device, setDivice] = useState("1");

	return (
		<SafeAreaView style={styles.container}>
			<Header2
				title="Créer une offre"
			/>

			<View style={styles.form}>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View
						style={{
							flexDirection: "column",
							flex: 1,
							flexGrow: 2.5,
							marginRight: 5,
						}}
					>
						<View style={styles.input}>
							<SelectProductField
								style={styles.inputControlSelect}
								value={product}
								setValue={setProduct}
								zIndex={3000}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
					<View style={{ flexDirection: "column", flex: 1 }}>
						<View style={styles.input}>
							<InputField
								autoCapitalize="none"
								placeholder="Quantité"
								keyboardType="numeric"
								style={styles.inputControl}
								value={quantity}
								onChangeText={(val) => {
									setQuantity(val);
								}}
							/>
						</View>
					</View>
				</View>

				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View
						style={{
							flexDirection: "column",
							flex: 1,
							flexGrow: 1,
							marginRight: 5,
						}}
					>
						<View style={styles.input}>
							<SelectVehiculeField
								style={styles.inputControlSelect}
								value={vehicule}
								setValue={setVehicule}
								zIndex={1000}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
					<View style={{ flexDirection: "column", flex: 1 }}>
						<View style={[styles.input, styles.rowdevise]}>
							<InputField
								autoCapitalize="none"
								placeholder="Budget alloué"
								keyboardType="numeric"
								style={[styles.inputControl, styles.budgetupstyle]}
								value={budget}
								onChangeText={(val) => {
									setBudget(val);
								}}
							/>
							<SelectDeviseField
								value={device}
								setValue={setDivice}
								zIndex={1000}
								style={styles.devise}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
				</View>
				<View style={styles.input}>{/* insert field */}</View>
				<View style={styles.input}>{/* insert field */}</View>
				<View style={styles.input}>{/* insert field */}</View>
				<View style={styles.input}>{/* insert field */}</View>
				<KeyboardAwareScrollView>
					<TextInput
						style={{
							flex: 1,
							textAlignVertical: "top",
							justifyContent: "flex-start",
							backgroundColor: COLORS.gray,
							borderRadius: 10,
							paddingHorizontal: 10,
						}}
						placeholder="type something here"
						// multiline={true}
						numberOfLines={4}
					/>
				</KeyboardAwareScrollView>
				<View style={styles.formAction}>
					<Pressable onPress={() => {}}>
						<View style={styles.btn}>
							<View style={{ width: 32 }} />
							<Text style={styles.btnText}>Continue</Text>
						</View>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default CreatePublication;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
	},

	/** Form */
	form: {
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	formAction: {
		marginVertical: 5,
		marginBottom: 20,
	},
	/** Input */
	input: {
		marginBottom: 12,
	},
	inputControlSelect: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 16,
		borderRadius: 12,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	inputControl: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.black_ligth,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	devise: {
		borderWidth: 1,
		borderWidth: 0,
		backgroundColor: "rgb(0,0,0,0.2)",
		borderRadius: 12,
		paddingHorizontal: 5,
		minHeight: 44,
		zIndex: 1,
		left: 105,
	},
	rowdevise: {
		flexDirection: "row",
	},
	budgetupstyle: {
		position: "absolute",
		top: 0,
		left: 0,
		paddingHorizontal: 25,
		paddingLeft: 15,
	},
	textStyle: {
		fontWeight: '500',
		color: COLORS.black_ligth,
		fontSize: 15,
	},
	/** Button */
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
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

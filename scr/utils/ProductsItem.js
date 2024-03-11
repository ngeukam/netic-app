import { Image, StyleSheet } from "react-native";
import React from "react";
import { images } from "../constants";

export const ProductsItem = [
	{
		label: "Que transportons-nous ?",
		value: "0",
	},
	{
		label: "Bouteilles de gaz",
		value: "1",
		icon: () => (
			<Image
				source={images.gaz}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Documents",
		value: "2",
		icon: () => (
			<Image
				source={images.documents}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Nourriture",
		value: "3",
		icon: () => (
			<Image
				source={images.food}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Personnes",
		value: "4",
		icon: () => (
			<Image
				source={images.human}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Cartons",
		value: "5",
		icon: () => (
			<Image
				source={images.carton}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Sacs de produits",
		value: "7",
		icon: () => (
			<Image
				source={images.seed_bag}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Aliments frais",
		value: "8",
		icon: () => (
			<Image
				source={images.shopping_bag}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Vêtements",
		value: "9",
		icon: () => (
			<Image
				source={images.cloths}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Médicaments",
		value: "10",
		icon: () => (
			<Image
				source={images.medicine}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Prélèvements",
		value: "11",
		icon: () => (
			<Image
				source={images.blood_tube}
				style={styles.icon}
			/>
		),
	},
];
const styles = StyleSheet.create({
	icon: { width: 10, height: 8, padding: 20 }
});
import { Image, StyleSheet } from "react-native";
import React from "react";
import { images } from "../constants";

export const VehiculesItem = [
	{
		label: "Véhicule adapté à la course",
		value: "0",
		icon: () => (
			<Image
				source={{}}
			/>
		),
	},
	{
		label: "Taxi",
		value: "1",
		icon: () => (
			<Image
				source={images.taxi}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Moto",
		value: "2",
		icon: () => (
			<Image
				source={images.motorbike}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Camion",
		value: "3",
		icon: () => (
			<Image
				source={images.truck}
				style={styles.icon}
			/>
		),
	},
	{
		label: "Perso",
		value: "4",
		icon: () => <Image source={images.suv} style={styles.icon} />,
	},
	{
		label: "Tricyle",
		value: "5",
		icon: () => <Image source={images.tricycle} style={styles.icon} />,
	},
	{
		label: "Avion",
		value: "6",
		icon: () => <Image source={images.airplane} style={styles.icon} />,
	},
];
const styles = StyleSheet.create({
	icon: { width: 10, height: 8, padding: 20 }
});

import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../constants";
import { ProductsItem } from "../utils/ProductsItem";

const SelectProductField = ({ style, value, setValue, zIndex, textStyle }) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(ProductsItem);

	return (
		<DropDownPicker
			placeholder="Que transportons-nous ?"
			searchable={true}
			searchPlaceholder="Saisir quelque chose"
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setValue}
			setItems={setItems}
			listItemContainerStyle={{ marginBottom: 20, paddingTop: 3 }}
			placeholderStyle={{
				color: COLORS.placeholder_text_color,
				fontSize: 15,
				fontWeight: 500,
			}}
			style={style}
			zIndex={zIndex}
			textStyle={textStyle}
		/>
	);
};

export default SelectProductField;

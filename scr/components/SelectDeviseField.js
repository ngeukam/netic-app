import { View, Text } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { DeviseItem } from "../utils/DeviseItem";
import { COLORS } from "../constants";

const SelectDeviseField = ({ style, value, setValue, zIndex, textStyle }) => {
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(DeviseItem);
	return (
		<DropDownPicker
			searchable={false}
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setValue}
			setItems={setItems}
			style={style}
			zIndex={zIndex}
			containerStyle={{ width: 70 }}
			textStyle={textStyle}
			arrowIconContainerStyle={{marginRight:7}}
			arrowIconStyle={{borderColor:COLORS.placeholder_text_color}}
		/>
	);
};

export default SelectDeviseField;

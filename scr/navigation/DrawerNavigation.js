import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import {
	DrawerItemList,
	createDrawerNavigator,
} from "@react-navigation/drawer";
import { COLORS, images } from "../constants";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import BottomTabNavigation from "./BottomTabNavigation";
import { Publications, Profile, Jobs, Invoice } from "../screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
	const { Logout, authPhone } = useContext(AuthContext);
	return (
		<Drawer.Navigator
			drawerContent={(props) => {
				return (
					<SafeAreaView>
						<View
							style={{
								height: 200,
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: COLORS.white,
							}}
						>
							<Image
								source={images.avatar}
								style={{
									height: 100,
									width: 100,
									borderRadius: 50,
									marginBottom: 12,
								}}
							/>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "bold",
									color: COLORS.black,
									marginBottom: 6,
								}}
							>
								{authPhone}
							</Text>
							{/* <Text style={{
                            fontSize: 16,
                            color: COLORS.black

                        }}>Ingénieur</Text> */}
							<Pressable
								onPress={() => {
									Logout();
								}}
							>
								<Text
									style={{
										fontSize: 16,
										color: COLORS.black,
									}}
								>
									Déconnexion
								</Text>
							</Pressable>
						</View>
						<DrawerItemList {...props} />
					</SafeAreaView>
				);
			}}
			screenOptions={{
				drawerStyle: {
					backgroundColor: COLORS.white,
					width: 250,
				},
				headerStyle: {
					backgroundColor: COLORS.white,
				},
				headerShown: false,
				headerTintColor: COLORS.black,
				drawerLabelStyle: {
					color: COLORS.black,
					fontSize: 14,
					marginLeft: -10,
				},
			}}
		>
			<Drawer.Screen
				name="Home"
				options={{
					drawerLabel: "Acceuil",
					title: "Home",
					headerShadowVisible: false,
					drawerIcon: () => (
						<Ionicons name="home-outline" size={24} color={COLORS.black} />
					),
				}}
				component={BottomTabNavigation}
			/>
			<Drawer.Screen
				name="Publications"
				options={{
					drawerLabel: "Mes demandes",
					title: "Publications",
					headerShadowVisible: true,
					drawerIcon: () => (
						<Ionicons
							name="folder-open-outline"
							size={24}
							color={COLORS.black}
						/>
					),
				}}
				component={Publications}
			/>
			<Drawer.Screen
				name="Jobs"
				options={{
					drawerLabel: "Mes jobs",
					title: "Jobs",
					headerShadowVisible: false,
					drawerIcon: () => (
						<Ionicons name="cart-outline" size={26} color={COLORS.black} />
					),
				}}
				component={Jobs}
			/>
			{/* <Drawer.Screen
        name="Wishlist"
        options={{
          drawerLabel: "Wishlist",
          title: "Wishlist",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="heart-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Favourite}
      />
      <Drawer.Screen
        name="Delivery Address"
        options={{
          drawerLabel: "Delivery Address",
          title: "Delivery Address",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="location-outline" size={24} color={COLORS.black} />
          ),
        }}
        component={Address}
      />
      <Drawer.Screen
        name="Payment Methods"
        options={{
          drawerLabel: "Payment Methods",
          title: "Payment Methods",
          headerShadowVisible: false,
          drawerIcon: () => (
            <AntDesign name="creditcard" size={24} color={COLORS.black} />
          ),
        }}
        component={PaymentMethod}
      />
      <Drawer.Screen
        name="Notifications"
        options={{
          drawerLabel: "Notifications",
          title: "Notifications",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.black}
            />
          ),
        }}
        component={Notifications}
      /> */}
			<Drawer.Screen
				name="Invoice"
				options={{
					drawerLabel: "Mes factures",
					title: "Mes factures",
					headerShadowVisible: false,
					drawerIcon: () => (
						<AntDesign name="creditcard" size={24} color={COLORS.black} />
					),
				}}
				component={Invoice}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigation;

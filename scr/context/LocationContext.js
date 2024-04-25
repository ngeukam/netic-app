import { useState, useEffect, createContext } from "react";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import * as Location from "expo-location";
export const LocationContext = createContext();
export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState();
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				ToastErrorMessage(
					"Autorisez l'accès à votre position pour un fonctionnement normal de l'application."
				);
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	return (
		<LocationContext.Provider value={{ location }}>
			{children}
		</LocationContext.Provider>
	);
};

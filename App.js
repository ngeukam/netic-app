import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";
import AppNavigation from "./scr/navigation/AppNavigation";
import { AuthProvider } from "./scr/context/AuthContext";
import { LocationProvider } from "./scr/context/LocationContext";
const App = () => {
	return (
		<LocationProvider>
			<AuthProvider>
				<RootSiblingParent>
					<AppNavigation />
				</RootSiblingParent>
			</AuthProvider>
		</LocationProvider>
	);
};
export default App;

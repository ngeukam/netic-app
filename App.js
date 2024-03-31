import { RootSiblingParent } from "react-native-root-siblings";
import "react-native-gesture-handler";
import AppNavigation from "./scr/navigation/AppNavigation";
import { AuthProvider } from "./scr/context/AuthContext";

const App = () => {
	return (
		<AuthProvider>
			<RootSiblingParent>
				<AppNavigation />
			</RootSiblingParent>
		</AuthProvider>
	);
};
export default App;

import { images } from "../constants";
export default function FChoiceVehicule(x) {
	if (x == 1) {
		return images.taxi;
	} else if (x == 2) {
		return images.motorbike;
	} else if (x == 3) {
		return images.truck;
	} else if (x == 4) {
		return images.suv;
	} else if (x == 5) {
		return images.tricycle;
	} else if (x == 6) {
		return images.airplane;
	} else if (x == 7) {
		return images.bike;
	} else if (x == 8) {
		return images.wheelbarrow;
	} else if (x == 9) {
		return images.bus;
	} else if (x == 10) {
		return images.fourgon;
	} else if (x == 11) {
		return images.train;
	}
}

import { images } from "../constants";
export default function FChoiceProd(x) {
	if (x == 1) {
		return images.gaz;
	} else if (x == 2) {
		return images.documents;
	} else if (x == 3) {
		return images.food;
	} else if (x == 4) {
		return images.human;
	} else if (x == 5) {
		return images.carton;
	} else if (x == 6) {
		return images.seed_bag;
	} else if (x == 7) {
		return images.shopping_bag;
	} else if (x == 8) {
		return images.cloths;
	} else if (x == 9) {
		return images.medicine;
	} else if (x == 10) {
		return images.blood_tube;
	} else if (x == 11) {
		return images.baggages;
	} else if (x == 12) {
		return images.garbage;
	} else if (x == 13) {
		return images.car;
	} else if (x == 14) {
		return images.material;
	}
}

import {SystemMatrix} from "../src/routes/math/SystemMatrix";
import {Quantity} from "../src/routes/math/Quantity";

describe('Conversion testing', function () {
	test('Initial test', function () {
		const matrix = new SystemMatrix([Quantity.TIME, Quantity.LENGTH, Quantity.MASS, Quantity.ELECTRIC_CHARGE, Quantity.TEMPERATURE, Quantity.LUMINOUS_INTENSITY, Quantity.AMOUNT_OF_SUBSTANCE]);
		expect(matrix.incoherant).toBe(false);
		expect(matrix.quantities.length).toBe(7);
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_POTENTIAL))).toBe("s-2 m2 kg1 C-1");
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_CHARGE))).toBe("C1");
		expect(matrix.getUnitString(matrix.convert(Quantity.CURRENT))).toBe("s-1 C1");
	});
});

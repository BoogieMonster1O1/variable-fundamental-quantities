import {SystemMatrix} from "../src/routes/math/SystemMatrix";
import {Quantity} from "../src/routes/math/Quantity";

describe('Conversion testing', function () {
	test('Charge test', function () {
		const matrix = new SystemMatrix([Quantity.TIME, Quantity.LENGTH, Quantity.MASS, Quantity.ELECTRIC_CHARGE, Quantity.TEMPERATURE, Quantity.LUMINOUS_INTENSITY, Quantity.AMOUNT_OF_SUBSTANCE]);
		expect(matrix.incoherant).toBe(false);
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_POTENTIAL))).toBe("s-2 m2 kg1 C-1");
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_CHARGE))).toBe("C1");
		expect(matrix.getUnitString(matrix.convert(Quantity.CURRENT))).toBe("s-1 C1");
	});

	test('Hertz/Dioptre test', function () {
		const matrix = new SystemMatrix([Quantity.FREQUENCY, Quantity.LENS_POWER, Quantity.MASS, Quantity.CURRENT, Quantity.TEMPERATURE, Quantity.LUMINOUS_INTENSITY, Quantity.AMOUNT_OF_SUBSTANCE]);
		expect(matrix.incoherant).toBe(false);
		expect(matrix.getUnitString(matrix.convert(Quantity.VELOCITY))).toBe("Hz1 D-1");
	});

	test('Incoherence', function () {
		const matrix = new SystemMatrix([Quantity.TIME, Quantity.LENGTH, Quantity.MASS, Quantity.ENERGY, Quantity.TEMPERATURE, Quantity.LUMINOUS_INTENSITY, Quantity.AMOUNT_OF_SUBSTANCE]);
		expect(matrix.incoherant).toBe(true);
	});

	test('SI Quantities', function () {
		const matrix = SystemMatrix.SI_QUANTITIES;
		expect(matrix.incoherant).toBe(false);
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_POTENTIAL))).toBe("s-3 m2 kg1 A-1");
		expect(matrix.getUnitString(matrix.convert(Quantity.ELECTRIC_CHARGE))).toBe("s1 A1");
		expect(matrix.getUnitString(matrix.convert(Quantity.CURRENT))).toBe("A1");
	});
});

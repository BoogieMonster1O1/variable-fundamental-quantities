import {SystemMatrix} from "../src/routes/math/SystemMatrix";
import {Quantity} from "../src/routes/math/Quantity";

describe('', function () {
	test('', function () {
		const matrix = new SystemMatrix([Quantity.TIME, Quantity.LENGTH, Quantity.MASS, Quantity.ELECTRIC_CHARGE, Quantity.TEMPERATURE, Quantity.LUMINOUS_INTENSITY, Quantity.AMOUNT_OF_SUBSTANCE]);
		const resultVector = matrix.convert(Quantity.CURRENT);
		expect(resultVector.length).toBe(7);
		const result = matrix.getUnitString(resultVector);
		console.log(result)
		console.log(resultVector)
	});
});

import {Fraction} from "./Fraction";

export interface Parameters {
    unit: string,
    shortUnit: string,
    time ?: Fraction,
    length ?: Fraction,
    mass ?: Fraction,
    current ?: Fraction,
    temperature ?: Fraction,
    luminousIntensity ?: Fraction,
    amountOfSubstance ?: Fraction,
}

/**
 * A quantity vector is a way of representing any quantity.
 *
 * <p> Each quantity is represented using seven dimensions, in the order:
 * <ul>
 *     <li>time</li>
 *     <li>length</li>
 *     <li>mass</li>
 *     <li>current</li>
 *     <li>temperature</li>
 *     <li>luminous intensity</li>
 *     <li>amount of substance</li>
 * </ul>
 * The value of each dimension is represented by a fraction, which denotes
 * the power to which the quantity corresponding to the dimension is raised.
 * </p>
 */
export class Quantity {
    public static readonly QUANTITIES: Quantity[] = [];
    private readonly _unit: string;
    private readonly _shortUnit: string;
    private readonly _vector: Fraction[];
    private readonly _name: string;

    public static byName(name: string): Quantity {
        return Quantity.QUANTITIES.find(q => q.name === name)!;
    }

    public static of(name: string, {unit, shortUnit, time = Fraction.ZERO, length = Fraction.ZERO, mass = Fraction.ZERO, current = Fraction.ZERO, temperature = Fraction.ZERO, luminousIntensity = Fraction.ZERO, amountOfSubstance = Fraction.ZERO}: Parameters): Quantity {
        const quantity: Quantity =  new Quantity(name, unit, shortUnit, [time, length, mass, current, temperature, luminousIntensity, amountOfSubstance]);
        Quantity.QUANTITIES.push(quantity);
        return quantity;
    }

    private constructor(name: string, unit: string, shortUnit: string, vector: Fraction[]) {
        this._name = name;
        this._unit = unit;
        this._shortUnit = shortUnit;
        this._vector = vector;
    }

    public get time(): Fraction {
        return this._vector[0];
    }

    public get length(): Fraction {
        return this._vector[1];
    }

    public get mass(): Fraction {
        return this._vector[2];
    }

    public get current(): Fraction {
        return this._vector[3];
    }

    public get temperature(): Fraction {
        return this._vector[4];
    }

    public get luminousIntensity(): Fraction {
        return this._vector[5];
    }

    public get amountOfSubstance(): Fraction {
        return this._vector[6];
    }

    public get vector(): Fraction[] {
        return this._vector;
    }

    public get name(): string {
        return this._name;
    }

    public get unit(): string {
        return this._unit;
    }

    public get shortUnit(): string {
        return this._shortUnit;
    }

    // Fundamental quantities
    public static readonly TIME: Quantity = Quantity.of("Time", {unit: "second", shortUnit: "s", time: Fraction.ofWhole(1)});
    public static readonly LENGTH: Quantity = Quantity.of("Length", {unit: "meter", shortUnit: "m", length: Fraction.ofWhole(1)});
    public static readonly MASS: Quantity = Quantity.of("Mass", {unit: "kilogram", shortUnit: "kg", mass: Fraction.ofWhole(1)});
    public static readonly CURRENT: Quantity = Quantity.of("Current", {unit: "ampere", shortUnit: "A", current: Fraction.ofWhole(1)});
    public static readonly TEMPERATURE: Quantity = Quantity.of("Temperature", {unit: "kelvin", shortUnit: "K", temperature: Fraction.ofWhole(1)});
    public static readonly LUMINOUS_INTENSITY: Quantity = Quantity.of("Luminous Intensity", {unit: "candela", shortUnit: "cd", luminousIntensity: Fraction.ofWhole(1)});
    public static readonly AMOUNT_OF_SUBSTANCE: Quantity = Quantity.of("Amount of Substance", {unit: "mole", shortUnit: "mol", amountOfSubstance: Fraction.ofWhole(1)});

    // Mechanics
    public static readonly FORCE: Quantity = Quantity.of("Force", {unit: "newton", shortUnit: "N", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(1)});
    public static readonly PRESSURE: Quantity = Quantity.of("Pressure", {unit: "pascal", shortUnit: "Pa", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(-1)});
    public static readonly STRESS: Quantity = Quantity.of("Stress", {unit: "pascal", shortUnit: "Pa", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(-1)});
    public static readonly ENERGY: Quantity = Quantity.of("Energy", {unit: "joule", shortUnit: "J", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});
    public static readonly WORK: Quantity = Quantity.of("Work", {unit: "joule", shortUnit: "J", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});
    public static readonly POWER: Quantity = Quantity.of("Power", {unit: "watt", shortUnit: "W", time: Fraction.ofWhole(-3), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});
    public static readonly VELOCITY: Quantity = Quantity.of("Velocity", {unit: "meter per second", shortUnit: "m/s", time: Fraction.ofWhole(-1), length: Fraction.ofWhole(1)});
    public static readonly ACCELERATION: Quantity = Quantity.of("Acceleration", {unit: "meter per second squared", shortUnit: "m/s²", time: Fraction.ofWhole(-2), length: Fraction.ofWhole(1)});
    public static readonly JERK: Quantity = Quantity.of("Jerk", {unit: "meter per second cubed", shortUnit: "m/s³", time: Fraction.ofWhole(-3), length: Fraction.ofWhole(1)});
    public static readonly SNAP: Quantity = Quantity.of("Snap", {unit: "meter per second quartic", shortUnit: "m/s⁴", time: Fraction.ofWhole(-4), length: Fraction.ofWhole(1)});
    public static readonly CRACKLE: Quantity = Quantity.of("Crackle", {unit: "meter per second quintic", shortUnit: "m/s⁵", time: Fraction.ofWhole(-5), length: Fraction.ofWhole(1)});
    public static readonly POP: Quantity = Quantity.of("Pop", {unit: "meter per second sextic", shortUnit: "m/s⁶", time: Fraction.ofWhole(-6), length: Fraction.ofWhole(1)});
    public static readonly TORQUE: Quantity = Quantity.of("Torque", {unit: "newton meter", shortUnit: "Nm", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});

    // Electromagnetism
    public static readonly ELECTRIC_CHARGE: Quantity = Quantity.of("Electric Charge", {unit: "coulomb", shortUnit: "C", time: Fraction.ofWhole(1), current: Fraction.ofWhole(1)});
    public static readonly ELECTRIC_POTENTIAL: Quantity = Quantity.of("Electric Potential", {unit: "volt", shortUnit: "V", time: Fraction.ofWhole(-3), current: Fraction.ofWhole(-1), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});
    public static readonly ELECTROMOTIVE_FORCE: Quantity = Quantity.of("Electromotive Force", {unit: "volt", shortUnit: "V", time: Fraction.ofWhole(-3), current: Fraction.ofWhole(-1), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)})
    public static readonly ELECTRIC_CAPACITANCE: Quantity = Quantity.of("Electric Capacitance", {unit: "farad", shortUnit: "F", time: Fraction.ofWhole(4), current: Fraction.ofWhole(2), mass: Fraction.ofWhole(-1), length: Fraction.ofWhole(-2)});
    public static readonly ELECTRIC_RESISTANCE: Quantity = Quantity.of("Electric Resistance", {unit: "ohm", shortUnit: "Ω", length: Fraction.ofWhole(2), mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-3), current: Fraction.ofWhole(-2)});
    public static readonly ELECTRIC_CONDUCTANCE: Quantity = Quantity.of("Electric Conductance", {unit: "siemens", shortUnit: "S", length: Fraction.ofWhole(-2), mass: Fraction.ofWhole(-1), time: Fraction.ofWhole(3), current: Fraction.ofWhole(2)});
    public static readonly MAGNETIC_FLUX: Quantity = Quantity.of("Magnetic Flux", {unit: "weber", shortUnit: "Wb", length: Fraction.ofWhole(2), mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-2), current: Fraction.ofWhole(-1)});
    public static readonly MAGNETIC_FLUX_DENSITY: Quantity = Quantity.of("Magnetic Flux Density", {unit: "tesla", shortUnit: "T", mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-2), current: Fraction.ofWhole(-1)});
    public static readonly MAGNETIC_FIELD: Quantity = Quantity.of("Magnetic field", {unit: "tesla", shortUnit: "T", mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-2), current: Fraction.ofWhole(-1)});
    public static readonly INDUCTANCE: Quantity = Quantity.of("Inductance", {unit: "henry", shortUnit: "H", length: Fraction.ofWhole(2), mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-2), current: Fraction.ofWhole(-2)});
    public static readonly CURRENT_DENSITY: Quantity = Quantity.of("Current Density", {unit: "ampere/sq. meter", shortUnit: "A/m²", length: Fraction.ofWhole(-2), current: Fraction.ofWhole(1)});
    public static readonly MAGNETIC_FIELD_STRENGTH: Quantity = Quantity.of("Magnetic Field Strength", {unit: "ampere/meter", shortUnit: "A/m", length: Fraction.ofWhole(-1), current: Fraction.ofWhole(1)});
    public static readonly ELECTRIC_FIELD_STRENGTH: Quantity = Quantity.of("Electric Field Strength", {unit: "volt/meter", shortUnit: "V/m", time: Fraction.ofWhole(-3), current: Fraction.ofWhole(-1), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(1)});
    public static readonly POTENTIAL_GRADIENT: Quantity = Quantity.of("Potential Gradient", {unit: "volt/meter", shortUnit: "V/m", time: Fraction.ofWhole(-3), current: Fraction.ofWhole(1), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(1)});
    public static readonly PERMITTIVITY: Quantity = Quantity.of("Permittivity", {unit: "farad/meter", shortUnit: "F/m", mass: Fraction.ofWhole(-1), length: Fraction.ofWhole(-3), time: Fraction.ofWhole(4), current: Fraction.ofWhole(2)});
    public static readonly PERMEABILITY: Quantity = Quantity.of("Permeability", {unit: "henry/meter", shortUnit: "H/m", mass: Fraction.ofWhole(1), length: Fraction.ofWhole(1), time: Fraction.ofWhole(-2), current: Fraction.ofWhole(-2)});

    // Thermodynamics
    public static readonly HEAT_AMOUNT: Quantity = Quantity.of("Heat amount", {unit: "joule", shortUnit: "J", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2)});
    public static readonly CELSIUS: Quantity = Quantity.of("Celsius Temperature", {unit: "celsius", shortUnit: "°C", temperature: Fraction.ofWhole(1)});
    public static readonly IRRADIANCE: Quantity = Quantity.of("Irradiance", {unit: "watt per square meter", shortUnit: "W/m²", time: Fraction.ofWhole(-3), mass: Fraction.ofWhole(1)});
    public static readonly HEAT_CAPACITY: Quantity = Quantity.of("Heat Capacity", {unit: "joule per kelvin", shortUnit: "J/K", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2), temperature: Fraction.ofWhole(-1)});
    public static readonly SPECIFIC_HEAT_CAPACITY: Quantity = Quantity.of("Specific Heat Capacity", {unit: "joule per kilogram kelvin", shortUnit: "J/kgK", time: Fraction.ofWhole(-2), length: Fraction.ofWhole(2), temperature: Fraction.ofWhole(-1)});
    public static readonly SPECIFIC_ENERGY: Quantity = Quantity.of("Specific Energy", {unit: "joule per kilogram", shortUnit: "J/kg", time: Fraction.ofWhole(-2), length: Fraction.ofWhole(2)});
    public static readonly THERMAL_CONDUCTIVITY: Quantity = Quantity.of("Thermal Conductivity", {unit: "watt per meter kelvin", shortUnit: "W/mK", time: Fraction.ofWhole(-3), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(1), temperature: Fraction.ofWhole(-1)});
    public static readonly ENERGY_DENSITY: Quantity = Quantity.of("Energy Density", {unit: "joule per cu. meter", shortUnit: "J/m³", time: Fraction.ofWhole(-2), length: Fraction.ofWhole(-1), mass: Fraction.ofWhole(1)});
    public static readonly MOLAR_ENERGY: Quantity = Quantity.of("Molar Energy", {unit: "joule/mole", shortUnit: "J/mol", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2), amountOfSubstance: Fraction.ofWhole(1)});
    public static readonly MOLAR_HEAT_CAPACITY: Quantity = Quantity.of("Molar Heat Capacity", {unit: "joule per mole kelvin", shortUnit: "J/molK", time: Fraction.ofWhole(-2), mass: Fraction.ofWhole(1), length: Fraction.ofWhole(2), temperature: Fraction.ofWhole(-1)});

    // Light and Optics
    public static readonly LENS_POWER: Quantity = Quantity.of("Lens Power", {unit: "dioptre", shortUnit: "D", length: Fraction.ofWhole(-1)});
    public static readonly LUMINOUS_FLUX: Quantity = Quantity.of("Luminous Flux", {unit: "lumen", shortUnit: "lm", luminousIntensity: Fraction.ofWhole(1)});
    public static readonly ILLUMINANCE: Quantity = Quantity.of("Illuminance", {unit: "lux", shortUnit: "lx", length: Fraction.ofWhole(2), luminousIntensity: Fraction.ofWhole(1)});

    // Fluid dynamics
    public static readonly ABSEMENT: Quantity = Quantity.of("Absement", {unit: "meter second", shortUnit: "m s", time: Fraction.ofWhole(1), length: Fraction.ofWhole(1)});
    public static readonly DYNAMIC_VISCOSITY: Quantity = Quantity.of("Dynamic Viscosity", {unit: "pascal second", shortUnit: "Pa s", mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-1), length: Fraction.ofWhole(-1)});
    public static readonly SURFACE_TENSION: Quantity = Quantity.of("Surface Tension", {unit: "newton/meter", shortUnit: "N/m", mass: Fraction.ofWhole(1), time: Fraction.ofWhole(-2)});

    // Misc
    public static readonly FREQUENCY: Quantity = Quantity.of("Frequency", {unit: "hertz", shortUnit: "Hz", time: Fraction.ofWhole(-1)});
    public static readonly RADIOACTIVITY: Quantity = Quantity.of("Radioactivity", {unit: "becquerel", shortUnit: "Bq", time: Fraction.ofWhole(-1)});
    public static readonly DOSE_EQUIVALENT: Quantity = Quantity.of("Dose Equivalent", {unit: "sievert", shortUnit: "Sv", length: Fraction.ofWhole(2), time: Fraction.ofWhole(-2)});
    public static readonly CATALYTIC_ACTIVITY: Quantity = Quantity.of("Catalytic Activity", {unit: "katal", shortUnit: "kat", time: Fraction.ofWhole(-1), amountOfSubstance: Fraction.ofWhole(1)});
    public static readonly AREA: Quantity = Quantity.of("Area", {unit: "square m", shortUnit: "m²", length: Fraction.ofWhole(2)});
    public static readonly VOLUME: Quantity = Quantity.of("Volume", {unit: "cubic m", shortUnit: "m³", length: Fraction.ofWhole(3)});
    public static readonly DENSITY: Quantity = Quantity.of("Density", {unit: "kg per cubic m", shortUnit: "kg/m³", mass: Fraction.ofWhole(1), length: Fraction.ofWhole(-3)});
}

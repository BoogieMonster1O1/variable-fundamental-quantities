import {findGcd} from "./mathutil";

export class Fraction {
    public static readonly ZERO: Fraction = new Fraction(0, 1);
    private _numerator: number;
    private _denominator: number;

    public static ofWhole(n: number): Fraction {
        return new Fraction(n, 1);
    }

    public static of(n: number, d: number): Fraction {
        return new Fraction(n, d);
    }

    private constructor(numerator: number, denominator: number) {
        this._numerator = numerator;
        this._denominator = denominator;
        this.normalize();
        if (this.denominator < 0) {
            this._numerator *= -1;
            this._denominator *= -1;
        } else if (this.denominator === 0) {
            throw new Error("Division by zero");
        }
    }

    private normalize() {
        const gcd = findGcd(this.numerator, this.denominator);
        this._numerator /= gcd;
        this._denominator /= gcd;
    }

    public get numerator(): number {
        return this._numerator;
    }

    public get denominator(): number {
        return this._denominator;
    }

    public toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

    public add(fraction: Fraction): Fraction {
        const numerator = this.numerator * fraction.denominator + this.denominator * fraction.numerator;
        const denominator = this.denominator * fraction.denominator;
        return new Fraction(numerator, denominator);
    }

    public negate(): Fraction {
        return new Fraction(-this.numerator, this.denominator);
    }

    public subtract(fraction: Fraction): Fraction {
        return this.add(fraction.negate());
    }

    public multiply(fraction: Fraction): Fraction {
        const numerator = this.numerator * fraction.numerator;
        const denominator = this.denominator * fraction.denominator;
        return new Fraction(numerator, denominator);
    }

    public inverse(): Fraction {
        return new Fraction(this.denominator, this.numerator);
    }

    public divide(fraction: Fraction): Fraction {
        return this.multiply(fraction.inverse());
    }

    public equals(fraction: Fraction): boolean {
        return this.numerator === fraction.numerator && this.denominator === fraction.denominator;
    }

    public isInteger(): boolean {
        return this.denominator === 1;
    }

    public toDecimal(): number {
        return this.numerator / this.denominator;
    }
}

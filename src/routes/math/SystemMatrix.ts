import { Fraction } from "./Fraction";
import type {Quantity} from "./Quantity";
import {inverse} from "./mathutil";

export class SystemMatrix {
    private _quantities: Quantity[];
    private _matrix: Fraction[][];
    private _inverseMatrix: Fraction[][];
    private incoherent: boolean;

    constructor(quantities: Quantity[]) {
        this._quantities = quantities;
        this._matrix = quantities.map(q => q.vector);
        this._inverseMatrix = inverse(this._matrix);
        this.incoherent = this._inverseMatrix.length === 0;
    }

    public get quantities(): Quantity[] {
        return this._quantities;
    }

    public get matrix(): Fraction[][] {
        return this._matrix;
    }

    public get inverseMatrix(): Fraction[][] {
        return this._inverseMatrix;
    }

    public get incoherant(): boolean {
        return this.incoherent;
    }

    public convert(qty: Quantity): Fraction[] {
        if (this.incoherent) {
            throw new Error("SystemMatrix is incoherent");
        }
        const result: Fraction[] = [Fraction.ZERO, Fraction.ZERO, Fraction.ZERO, Fraction.ZERO, Fraction.ZERO, Fraction.ZERO, Fraction.ZERO]
        for (let i = 0; i < this._inverseMatrix[0].length; i++) {
            for (let j = 0; j < this._inverseMatrix.length; j++) {
                result[i] = result[i].add(this._inverseMatrix[j][i].multiply(qty.vector[j]));
            }
        }
        return result;
    }

    public getUnitString(vector: Fraction[]): string {
        let main: string = "";
        for (let i = 0; i < this.quantities.length; i++) {
            if (vector[i].numerator !== 0) {
                if (main.length > 0) {
                    main += " ";
                }
                main += this.quantities[i].shortUnit;
                main += vector[i].numerator > 0 ? "" : "-";
                if (vector[i].isInteger()) {
                    main += Math.abs(vector[i].numerator);
                } else {
                    main += Math.abs(vector[i].numerator) + "/" + Math.abs(vector[i].denominator);
                }
            }
        }
        return main;
    }

    public debugPrintMatrix(): void {
        let message = "";
        message += "SystemMatrix: " + this.quantities.length + " quantities\n";
        message += "Matrix: " + this.matrix.length + "x" + this.matrix[0].length + "\n";
        message += "InverseMatrix: " + this.inverseMatrix.length + "x" + this.inverseMatrix[0].length + "\n";
        message += "Incoherent: " + this.incoherant + "\n";
        message += "Matrix:\n";
        for (let i = 0; i < this.matrix.length; i++) {
            message += "[";
            for (let j = 0; j < this.matrix[i].length; j++) {
                message += this.matrix[i][j].toString();
                if (j < this.matrix[i].length - 1) {
                    message += ", ";
                }
            }
            message += "]\n";
        }
        message += "InverseMatrix:\n";
        for (let i = 0; i < this.inverseMatrix.length; i++) {
            message += "[";
            for (let j = 0; j < this.inverseMatrix[i].length; j++) {
                message += this.inverseMatrix[i][j].toString();
                if (j < this.inverseMatrix[i].length - 1) {
                    message += ", ";
                }
            }
            message += "]\n";
        }
        console.log(message);
    }
}

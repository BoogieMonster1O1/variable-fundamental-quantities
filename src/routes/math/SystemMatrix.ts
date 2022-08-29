import type { Fraction } from "./Fraction";
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
        // Multiply qty (1xn) by inverse matrix (nxn)
        return this._inverseMatrix.map(row => {
            return row.reduce((a, b) => a.multiply(b), qty.vector[0]);
        });
    }
}

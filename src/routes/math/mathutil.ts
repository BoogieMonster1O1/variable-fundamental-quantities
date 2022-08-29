import {Fraction} from "./Fraction";

export function getGcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    }
    return getGcd(b, a % b);
}

export function determinant(matrix: Fraction[][]): Fraction {
    if (matrix.length === 0) {
        return Fraction.ofWhole(1);
    }
    if (matrix.length === 1) {
        return matrix[0][0];
    }
    if (matrix.length === 2) {
        return matrix[0][0].multiply(matrix[1][1]).subtract(matrix[0][1].multiply(matrix[1][0]));
    }
    let result = Fraction.ZERO;
    for (let i = 0; i < matrix[0].length; i++) {
        const minor: Fraction[][] = [];
        for (let j = 1; j < matrix.length; j++) {
            const minorRow: Fraction[] = [];
            for (let k = 0; k < matrix[0].length; k++) {
                if (k !== i) {
                    minorRow.push(matrix[j][k]);
                }
            }
            minor.push(minorRow);
        }
        if (i % 2 === 0) {
            result = result.add(matrix[0][i].multiply(determinant(minor)));
        } else {
            result = result.subtract(matrix[0][i].multiply(determinant(minor)));
        }
    }
    return result;
}

export function adjoint(matrix: Fraction[][]): Fraction[][] {
    const result: Fraction[][] = [];
    for (let i = 0; i < matrix[0].length; i++) {
        const row: Fraction[] = [];
        for (let j = 0; j < matrix.length; j++) {
            const minor: Fraction[][] = [];
            for (let k = 0; k < matrix[0].length; k++) {
                if (k !== i) {
                    const minorRow: Fraction[] = [];
                    for (let l = 0; l < matrix.length; l++) {
                        if (l !== j) {
                            minorRow.push(matrix[l][k]);
                        }
                    }
                    minor.push(minorRow);
                }
            }
            if (i % 2 === 0) {
                row.push(determinant(minor));
            } else {
                row.push(determinant(minor).negate());
            }
        }
        result.push(row);
    }
    return result;
}

export function inverse(matrix: Fraction[][]): Fraction[][] {
    const det = determinant(matrix);
    if (det.numerator === 0) {
        return [];
    }
    const adjointMatrix = adjoint(matrix);
    for (let i = 0; i < adjointMatrix.length; i++) {
        for (let j = 0; j < adjointMatrix[0].length; j++) {
            adjointMatrix[i][j] = adjointMatrix[i][j].divide(det);
        }
    }
    return adjointMatrix;
}

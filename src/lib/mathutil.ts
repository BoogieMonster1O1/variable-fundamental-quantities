import {Fraction} from "./Fraction";

export function findGcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    }
    return findGcd(b, a % b);
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
        const minor1: Fraction[][] = minor(matrix, 0, i);
        if (i % 2 === 0) {
            result = result.add(matrix[0][i].multiply(determinant(minor1)));
        } else {
            result = result.subtract(matrix[0][i].multiply(determinant(minor1)));
        }
    }
    return result;
}

export function inverse(matrix: Fraction[][]): Fraction[][] {
    const det = determinant(matrix);
    if (det.numerator === 0) {
        return [];
    }
    const adjointMatrix = adjunct(matrix);
    for (let i = 0; i < adjointMatrix.length; i++) {
        for (let j = 0; j < adjointMatrix[0].length; j++) {
            adjointMatrix[i][j] = adjointMatrix[i][j].divide(det);
        }
    }
    return adjointMatrix;
}

export function adjunct(matrix: Fraction[][]) {
    const result: Fraction[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        const row: Fraction[] = [];
        for (let j = 0; j < matrix[0].length; j++) {
            if ((i + j) % 2 === 0) {
                row.push(determinant(minor(matrix, i, j)));
            } else {
                row.push(determinant(minor(matrix, i, j)).negate());
            }
        }
        result.push(row);
    }
    return transpose(result)
}

export function minor(matrix: Fraction[][], row: number, column: number): Fraction[][] {
    const result: Fraction[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        if (i !== row) {
            const row: Fraction[] = [];
            for (let j = 0; j < matrix[0].length; j++) {
                if (j !== column) {
                    row.push(matrix[i][j]);
                }
            }
            result.push(row);
        }
    }
    return result;
}

export function transpose(matrix: Fraction[][]): Fraction[][] {
    const result: Fraction[][] = [];
    for (let i = 0; i < matrix[0].length; i++) {
        const row: Fraction[] = [];
        for (let j = 0; j < matrix.length; j++) {
            row.push(matrix[j][i]);
        }
        result.push(row);
    }
    return result;
}

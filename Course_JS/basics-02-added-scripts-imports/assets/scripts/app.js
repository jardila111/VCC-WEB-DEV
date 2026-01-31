const defaultResult = 0;
let currentResult = defaultResult;

function addTwoNumders(num1, num2) {
    const result = num1 + num2;
    return result;
}

addTwoNumders(1, 2);

currentResult = currentResult + 10;

let calculationDescription = `0 ${currentResult} + 10`;

outputResult(currentResult, calculationDescription);

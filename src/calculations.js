const add = (number1, number2) => number1 + number2;

const subtract = (number1, number2) => number1 - number2;

const multiply = (number1, number2) => {
    let product = number1 * number2;
    return parseFloat(product.toFixed(decimalPlaces(number1) + decimalPlaces(number2)));
};

function decimalPlaces (number) {
    var match = ('' + number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return Math.max(
        0,
        (match[1] ? match[1].length : 0) -
        (match[2] ? +match[2] : 0));
}

const divide = (number1, number2) => number1 / number2;

const sqrt = (number) => Math.sqrt(number);

const calculations = {
    "/": (num1, num2) => divide(num1, num2),
    "*": (num1, num2) => multiply(num1, num2),
    "+": (num1, num2) => add(num1, num2),
    "-": (num1, num2) => subtract(num1, num2)
};

const eNotation = (numberString) => Number.parseFloat(numberString).toExponential(5);

export { sqrt, calculations, eNotation };

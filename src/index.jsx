import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

const multiplicationOrDivision = /(\-*\d*\.?\d+)\s{1}([*/]+)\s{1}(\-*\d*\.?\d+)/;
const additionOrSubtraction = /(\-*\d*\.?\d+)\s{1}([+-]+)\s{1}(\-*\d*\.?\d+)/;
const DEFAULT_OUTPUT = "0";

const CALCULATOR_BUTTONS = {
    mainButtons: [
        { label: "answer",
            type: "answer",
            class: "top-btn",
            value: "Ans"
        },
        { label: "delete",
            type: "delete",
            class: "top-btn clear",
            value: "Del"
        },
        { label: "clear",
            type: "clear",
            class: "top-btn clear",
            value: "AC"
        },
        { label: "nine",
            type: "number",
            value: "9",
            class: "num-btn"
        },
        { label: "eight",
            type: "number",
            value: "8",
            class: "num-btn"
        },
        { label: "seven",
            type: "number",
            value: "7",
            class: "num-btn"
        },
        { label: "six",
            type: "number",
            value: "6",
            class: "num-btn"
        },
        { label: "five",
            type: "number",
            value: "5",
            class: "num-btn"
        },
        { label: "four",
            type: "number",
            value: "4",
            class: "num-btn"
        },
        { label: "three",
            type: "number",
            value: "3",
            class: "num-btn"
        },
        { label: "two",
            type: "number",
            value: "2",
            class: "num-btn"
        },
        { label: "one",
            type: "number",
            value: "1",
            class: "num-btn"
        }
    ],
    bottomButtons: [
        { label: "zero",
            type: "zero",
            value: "0",
            class: "num-btn"
        },
        { label: "decimal",
            type: "decimal",
            value: ".",
            class: "dec-btn",
            filter: ""
        },
        { label: "equals",
            type: "equals",
            value: "=",
            class: "equal-btn",
            filter: ""
        }
    ],
    operatorButtons: [
        { label: "sqRt",
            type: "sqRt",
            value: "√",
            class: "op-btn",
            calculation: (num) => Math.sqrt(num)
        },
        { label: "multiply",
            type: "operator",
            value: "*",
            class: "op-btn",
            decimalPlaces: (num) => {
                let match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                return Math.max(0,
                    (match[1] ? match[1].length : 0) -
                    (match[2] ? +match[2] : 0));
            },
            calculation: (num1, num2) => {
                let product = num1 * num2;
                return parseFloat(product.toFixed(this.decimalPlaces(num1) + this.decimalPlaces(num2)));
            }
        },
        { label: "divide",
            type: "operator",
            value: "/",
            class: "op-btn",
            calculation: (num1, num2) => num1 / num2
        },
        { label: "add",
            type: "operator",
            value: "+",
            class: "op-btn",
            calculation: (num1, num2) => num1 + num2
        },
        { label: "subtract",
            type: "operator",
            value: "-",
            class: "op-btn",
            calculation: (num1, num2) => num1 - num2
        }
    ]
};

const lastNum = (string) => {
    let outputArray = string.split(" ");
    return outputArray[outputArray.length - 1];
};

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

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            input: null,
            output: DEFAULT_OUTPUT,
            answer: "0",
            result: false,
            error: false
        };

        this.setOutput = this.setOutput.bind(this);
        this.backspace = this.backspace.bind(this);
        this.addValue = this.addValue.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.calculateSqRt = this.calculateSqRt.bind(this);
        this.reduceEquations = this.reduceEquations.bind(this);
        this.answer = this.answer.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount () {
        window.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
            this.filter(event.key);
        });
    }

    componentWillUnmount () {
        window.removeEventListener('keypress', (event) => this.filter(event.key));
    }

    filter (event) {
        const { output, error, answer } = this.state;

        if (event === "AC") {
            let newInputValue = [DEFAULT_OUTPUT];
            return this.setOutput(newInputValue);
        }
        if (event === "Backspace" || event === "Del") {
            return this.backspace();
        }
        if (/\d/.test(event)) {
            return this.addValue(event);
        }
        if (event === "Ans" && lastNum(output).length === 0) {
            return this.addValue(answer);
        }
        if (event === "." && lastNum(output).indexOf(".") === -1) {
            return this.addValue(event);
        }
        if (lastNum(output).length === 0 || lastNum(output) === "." || error) {
            if (event === "√" || event === "=" || event === "Enter") {
                return this.setOutput(["ERROR"]);
            }
        }
        if (event === "=" || event === "Enter") {
            return this.reduceEquations(output);
        }
        if (lastNum(output).length !== 0 && lastNum(output) !== "." && /[+/*-]/.test(event)) {
            return this.addOperator(event);
        }
        if (lastNum(output).length !== 0 &&
            lastNum(output) !== "." && event === "√") {
            this.reduceEquations(output);
            return this.calculateSqRt(output);
        }
    }

    setOutput (array) {
        let newOutputValue = array.join("");
        this.setState({ output: newOutputValue });
    }

    setAnswer (answer) {
        this.setState({ answer: answer });
    }

    setResult () {
        const { result } = this.state;
        this.setState({ result: !result });
    }

    setError () {
        const { error } = this.state;
        this.setState({ error: !error });
    }

    backspace (output) {
        const outputArray = [...this.state.output];
        const backspacedInput = (lastNum(this.state.output).length > 0) ?
            outputArray.slice(0, outputArray.length - 1) :
            outputArray.slice(0, outputArray.length - 3);
        this.setOutput(backspacedInput);
    }

    addValue (number) {
        const { output, result, error } = this.state;
        const inputArray = (result || error || output === DEFAULT_OUTPUT) ? [number] : [...output, number];
        if (result) {
            this.setResult();
        }
        if (error) {
            this.setError();
        }
        this.setOutput(inputArray);
    }

    addOperator (operator) {
        const { output, result } = this.state;
        let operatorString = " " + operator + " ";
        const inputArray = [...output, operatorString];
        if (result) {
            this.setResult();
        }
        this.setOutput(inputArray);
    }

    calculateSqRt = (number) => this.answer(sqrt(number));

    reduceEquations (equationString) {
        const makeEquation = (expression, equationString) => {
            const match = expression.exec(equationString);
            const num1 = parseFloat(match[1]);
            const operator = match[2];
            const num2 = parseFloat(match[3]);
            const reducedEquationString = equationString.replace(expression, calculations[operator](num1, num2));
            this.reduceEquations(reducedEquationString);
        };
        // if there are no operators (with spaces after them) left then return the answer because there are no more equations to solve
        if (!/[+\/*-]{1}\s/.test(equationString)) {
            return this.answer(equationString);
        }
        //otherwise keep making and solving equations
        const expression = (/[*/]\s/.test(equationString)) ?
            multiplicationOrDivision :
            additionOrSubtraction;

        makeEquation(expression, equationString);
    }

    answer (numberString) {
        const answer = (numberString.length > 20) ? eNotation(numberString) : numberString;
        let finalAnswer = [answer];
        this.setOutput(finalAnswer);
        this.setResult();
        this.setAnswer(finalAnswer);
    }

    render () {
        const { output } = this.state;
        return (
            <Calculator
                output={output}
                calculatorButtons={CALCULATOR_BUTTONS}
                onClick={(event) => this.filter(event.target.innerHTML)}
            />
        );
    }
}

const Button = ({ onClick, className, id, text }) => (
    <button
        onClick={onClick}
        className={className}
        id={id}
        type="button"
    >
        {text}
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string
};

const Calculator = ({ output, calculatorButtons, onClick }) => (
    <div id="calculator">
        <div id="display">
            {output}
        </div>
        <div id="mainButtons">
            {calculatorButtons.mainButtons.map(button => (
                <Button
                    onClick={onClick}
                    key={button.label}
                    className={button.class}
                    id={button.label}
                    text={button.value}
                />
            ))}
            <div id="bottomButtons">
                {calculatorButtons.bottomButtons.map(button => (
                    <Button
                        onClick={onClick}
                        key={button.label}
                        className={button.class}
                        id={button.label}
                        text={button.value}
                    />
                ))}
            </div>
        </div>
        <div id="operatorButtons">
            {calculatorButtons.operatorButtons.map(button => (
                <Button
                    onClick={onClick}
                    key={button.label}
                    className={button.class}
                    id={button.label}
                    text={button.value}
                />
            ))}
        </div>
    </div>
);

Calculator.propTypes = {
    output: PropTypes.string,
    calculatorButtons: PropTypes.object,
    onClick: PropTypes.func
};

ReactDOM.render(<App />, document.getElementById('root'));

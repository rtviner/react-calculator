import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

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

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            input: null,
            output: DEFAULT_OUTPUT,
            answer: null;
            error: null
        };

        this.setOutput = this.setOutput.bind(this);
        this.backspaceOutput = this.backspaceOutput.bind(this);
        this.sanitizeInput = this.sanitizeInput.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    setOutput (string) {
        console.log("ouputBeforeSet:", this.state.output);

        this.setState({ output: string });
    }

    backspaceOutput () {
        this.setOutput(this.state.output.slice(0, this.state.output.length - 1));
    }

    sanitizeInput (type, input) {
        let newInput;

        if (type === "clear") {
            newInput = DEFAULT_OUTPUT;
        }
        if (type === "delete") {
            this.backspaceOutput();
        }
        // if (type === "answer") {
        //     let newInput = previous formula answer?
        // }
        if (type === "number") {
            newInput = (this.state.output !== DEFAULT_OUTPUT) ?
                this.state.output + input :
                input;
        }
        // if (type === "zero") {
        //     0 as number before === nothing changes
        // }
        // if (type === "decimal") {
        //     allowed if first in string or trailing a number or operator
        // }
        // if (type === "equals") {
        //     sqrt() no number == error, decimal and nothing else === error, otherwise rerender whats on screen unless complete function, then calculate answer
        // }
        // if (type === "sqRt") {
        //     allowed if first in string or first after other operator
        // }
        // if (type === "operator") {
        //if previous character is operator, change that character to new operator pressed
        // }
        console.log("newInputAtSanitizenewInput:", newInput);
        this.setOutput(newInput);
    }

    onClick = (clickType, event) => {
        this.sanitizeInput(clickType, event.target.innerHTML);
    }

    // setInput
    // resetInput
    // clearOutput

    render () {
        const { output } = this.state;
        return (
            <Calculator
                output={output}
                calculatorButtons={CALCULATOR_BUTTONS}
                onClick={this.onClick}
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
                    onClick={() => onClick(button.type, event)}
                    key={button.label}
                    className={button.class}
                    id={button.label}
                    text={button.value}
                />
            ))}
            <div id="bottomButtons">
                {calculatorButtons.bottomButtons.map(button => (
                    <Button
                        onClick={() => onClick(button.type, event)}
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
                    onClick={() => onClick(button.type, event)}
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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

const calculatorButtons = {
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
            type: "operator",
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
                if (!match) { return 0; }
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
            formula: null,
            output: "0",
            error: null
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick = (clickType, event) => {
        console.log(clickType);
        console.log(event.target.innerHTML);
        // sanitizeInput(clickType, event);
    }

    // sanitizeInput(input) {
    //     if (clickType === "clear") {
    //         let newInput = [];
    //     }
    //     if (clickType === "delete") {
    //         let newInput = [input.slice()];
    //     }
    //     if (clickType === "answer") {
    //         let newInput =
    //     }
    //     if (clickType === "answer") {
    //         let newInput =
    //     }
    //     if (clickType === "answer") {
    //         let newInput =
    //     }
    // }


    // setInput
    // resetInput
    // setOutput
    // clearOutput

    render () {
        const { output } = this.state;
        return (
            <Calculator
                output={output}
                calculatorButtons={calculatorButtons}
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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

const topButtons = [
    { type: "clear",
        class: "top-btn clear",
        value: "AC"
    },
    { type: "delete",
        class: "top-btn clear",
        value: "Del"
    },
    { type: "answer",
        class: "top-btn",
        value: "Ans"
    }
];

const numberButtons = [
    { type: "nine",
        value: "9",
        class: "num-btn"
    },
    { type: "eight",
        value: "8",
        class: "num-btn"
    },
    { type: "seven",
        value: "7",
        class: "num-btn"
    },
    { type: "six",
        value: "6",
        class: "num-btn"
    },
    { type: "five",
        value: "5",
        class: "num-btn"
    },
    { type: "four",
        value: "4",
        class: "num-btn"
    },
    { type: "three",
        value: "3",
        class: "num-btn"
    },
    { type: "two",
        value: "2",
        class: "num-btn"
    },
    { type: "one",
        value: "1",
        class: "num-btn"
    }
];

const bottomButtons = [
    { type: "zero",
        value: "0",
        class: "num-btn"
    },
    { type: "decimal",
        value: ".",
        class: "dec-btn",
        filter: ""
    },
    { type: "equals",
        value: "=",
        class: "equal-btn",
        filter: ""
    }
];

const operatorButtons = [
    { type: "sqRt",
        value: "√",
        class: "op-btn",
        calculation: (num) => Math.sqrt(num)
    },
    { type: "multiply",
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
    { type: "divide",
        value: "/",
        class: "op-btn",
        calculation: (num1, num2) => num1 / num2
    },
    { type: "add",
        value: "+",
        class: "op-btn",
        calculation: (num1, num2) => num1 + num2
    },
    { type: "subtract",
        value: "-",
        class: "op-btn",
        calculation: (num1, num2) => num1 - num2
    }
];

const output = "Hello";

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            formula: null,
            error: null
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick = (event) => console.log(event.target);
    // setInput
    // resetInput
    // setOutput
    // clearOutput

    render () {
        return (
            <Calculator
                output={output}
                topButtons={topButtons}
                onClick={this.onClick}
                numberButtons={numberButtons}
                bottomButtons={bottomButtons}
                operatorButtons={operatorButtons}
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

const Calculator =
    ({ output, topButtons, onClick, numberButtons, bottomButtons, operatorButtons }) =>
        (
            <div id="calculator">
                <div id="display">
                    {output}
                </div>
                <div id="topButtons">
                    {topButtons.map(button => (
                        <Button
                            onClick={onClick}
                            key={button.type}
                            className={button.class}
                            id={button.type}
                            text={button.value}
                        />
                    ))}
                </div>
                <div id="numberButtons">
                    {numberButtons.map(button => (
                        <Button
                            onClick={onClick}
                            key={button.type}
                            className={button.class}
                            id={button.type}
                            text={button.value}
                        />
                    ))}
                    <div id="bottomButtons">
                        {bottomButtons.map(button => (
                            <Button
                                onClick={onClick}
                                key={button.type}
                                className={button.class}
                                id={button.type}
                                text={button.value}
                            />
                        ))}
                    </div>
                </div>
                <div id="operatorButtons">
                    {operatorButtons.map(button => (
                        <Button
                            onClick={onClick}
                            key={button.type}
                            className={button.class}
                            id={button.type}
                            text={button.value}
                        />
                    ))}
                </div>
            </div>
        );

Calculator.propTypes = {
    output: PropTypes.string,
    topButtons: PropTypes.array,
    onClick: PropTypes.func,
    numberButtons: PropTypes.array,
    bottomButtons: PropTypes.array,
    operatorButtons: PropTypes.array
};

ReactDOM.render(<App />, document.getElementById('root'));

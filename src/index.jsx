import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './style.css';

const calculatorButtons = [
    { type: "clear",
        class: "top-btn clear",
        value: "AC",
        filter: ""
    },
    { type: "delete",
        class: "top-btn clear",
        value: "Del",
        filter: ""
    },
    { type: "answer",
        class: "top-btn",
        value: "Ans",
        filter: ""
    },
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
    },
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
    },
    { type: "sqRt",
        value: "√",
        class: "op-btn",
        calculation: (num) => Math.sqrt(num)
    },
    { type: "multiply",
        value: "*",
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
        calculation: (num1, num2) => num1 / num2
    },
    { type: "add",
        value: "+",
        calculation: (num1, num2) => num1 + num2
    },
    { type: "subtract",
        value: "-",
        calculation: (num1, num2) => num1 - num2
    }
];

const output = "Hello";

class App extends React.Component {
    render () {
        return (
            <Calculator
                output={output}
                calculatorButtons={calculatorButtons}
            />
        );
    }
}

const Button = ({ className, id, text }) => (
    <button
        className={className}
        id={id}
        type="button"
    >
        {text}
    </button>
);

Button.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string
};

const Calculator = ({ output, calculatorButtons }) => (
    <div id="calculator">
        <div id="display">
            {output}
        </div>
        {calculatorButtons.map(button => (
            <Button
                key={button.type}
                className={button.class}
                id={button.type}
                text={button.value}
            />
        ))}
    </div>
);

Calculator.propTypes = {
    output: PropTypes.string,
    calculatorButtons: PropTypes.array
};

ReactDOM.render(<App />, document.getElementById('root'));

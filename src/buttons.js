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
            class: "op-btn"
        },
        { label: "multiply",
            type: "operator",
            value: "*",
            class: "op-btn"
        },
        { label: "divide",
            type: "operator",
            value: "/",
            class: "op-btn"
        },
        { label: "add",
            type: "operator",
            value: "+",
            class: "op-btn"
        },
        { label: "subtract",
            type: "operator",
            value: "-",
            class: "op-btn"
        }
    ]
};

export { CALCULATOR_BUTTONS };

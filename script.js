const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

let expression = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        if (value === "AC") {
            expression = "";
            display.value = "0";
        }

        else if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression || "0";
        }

        else if (value === "=") {

            try {
                if (!expression) return;

                if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
                    throw new Error("Invalid");
                }

                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid");
                }

                expression = String(result);
                display.value = expression;

            } catch {
                display.value = "Error";
                expression = "";
            }

        }

        else {
            expression += value;
            display.value = expression;
        }

    });

});
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (/[0-9+\-*/.%]/.test(key) && key.length === 1) {
        expression += key;
        display.value = expression;
    }

    else if (key === "Enter" || key === "=") {
        document.querySelector("button:nth-child(19)").click();
    }

    else if (key === "Backspace") {
        document.querySelector("button:nth-child(2)").click();
    }

    else if (key === "Escape") {
        document.querySelector("button:nth-child(1)").click();
    }

});
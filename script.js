class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        
        // Add animation class to the current operand
        this.currentOperandElement.classList.add('number-appear');
        
        // Remove the class after animation completes
        setTimeout(() => {
            this.currentOperandElement.classList.remove('number-appear');
        }, 300);
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const calculator = new Calculator(
    document.querySelector('.previous-operand'),
    document.querySelector('.current-operand')
);

// Add animation to number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Special animation for equals button
document.querySelector('.equals').addEventListener('click', () => {
    // Add equals effect class to the button
    const equalsButton = document.querySelector('.equals');
    equalsButton.classList.add('equals-effect');
    
    // Remove the class after animation completes
    setTimeout(() => {
        equalsButton.classList.remove('equals-effect');
    }, 1000);
    
    // Compute the result
    calculator.compute();
    
    // Add equals result animation to the display
    const currentOperand = document.querySelector('.current-operand');
    currentOperand.classList.add('equals-result');
    
    // Remove the class after animation completes
    setTimeout(() => {
        currentOperand.classList.remove('equals-result');
    }, 800);
    
    calculator.updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
}); 
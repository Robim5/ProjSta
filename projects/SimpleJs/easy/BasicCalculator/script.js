const display = document.getElementById('display');

let firstInput = '';
let operation = '';
let secondInput = '';

function AppendNum(num) {
    if (operation == '') firstInput += num;
    else secondInput += num;
    display.value += num;
}

function AppendOp(op) {
    if (firstInput == '') return alert("You need to select a number first");
    if (secondInput !== '') {
        Calculate();
    }
    if (operation === '') {
        operation = op;
        display.value += op;
    } else {
        display.value = display.value.slice(0, -1); //delete last operator
        operation = op;
        display.value += op;
    }

}

function Calculate() {
    if (firstInput == '' || secondInput == '') return alert('No numbers, sorry');
    let result;
    let first = parseFloat(firstInput);
    let second = parseFloat(secondInput);

    switch (operation) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case '*':
            result = first * second;
            break;
        case '/':
            if (second === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = first / second;
            break;
        default:
            return;
    }

    firstInput = result.toString();
    operation = '';
    secondInput = '';
    display.value = firstInput;
}

function TranformPerc() {
    let value;
    if (secondInput === '') {
        value = parseFloat(firstInput);
    } else {
        value = parseFloat(secondInput);
    }

    if (!isNaN(value)) {
        value = value / 100;

        if (secondInput === '') {
            firstInput = value.toString();
            display.value = firstInput;
        } else {
            secondInput = value.toString();
            display.value = `${firstInput}${operation}${secondInput}`
        }
    }
}

function ClearDisplay() {
    display.value = '';
    firstInput = '';
    secondInput = '';
    operation = '';
}

function DeleteLast() {
    if(display.value ==='') return; 
    if(secondInput.length > 0) secondInput = secondInput.slice(0, -1);
    else if (operation != '') operation = '';
    else if (firstInput.length > 0) firstInput = firstInput.slice(0, -1);
    display.value = display.value.slice(0, -1);
}

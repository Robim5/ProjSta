let lengthR = 10;
let upper = false;
let lower = false;
let number = false;
let symbol = false;

const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const upperTog = document.getElementById('uppercase');
const lowerTog = document.getElementById('lowercase');
const numberTog = document.getElementById('numbers');
const symbTog = document.getElementById('symbols');
const displayPass = document.getElementById('display');

const btnGen = document.getElementById('generate');
const btnCopy = document.getElementById('copy');
const btnClear = document.getElementById('clear');

lengthRange.addEventListener('input', () => {
    lengthValue.textContent = lengthRange.value;
    lengthR = lengthRange.value;
});
upperTog.addEventListener('change', () => upper = upperTog.checked);
lowerTog.addEventListener('change', () => lower = lowerTog.checked);
numberTog.addEventListener('change', () => number = numberTog.checked);
symbTog.addEventListener('change', () => symbol = symbTog.checked);

btnClear.addEventListener('click', () => {
    displayPass.value = '';
    lengthRange.value = 10;
    lengthValue.textContent = 10;
    upperTog.checked = false;
    lowerTog.checked = false;
    numberTog.checked = false;
    symbTog.checked = false;
    upper = lower = number = symbol = false;
});

btnCopy.addEventListener('click', (e) => {
    e.preventDefault();
    displayPass.select();
    document.execCommand("copy");
});

btnGen.addEventListener('click', () => {
    displayPass.value = GeneratePassword();
});

function GeneratePassword() {
    const types = [];
    if (lower) types.push('lowerF');
    if (upper) types.push('upperF');
    if (number) types.push('numberF');
    if (symbol) types.push('symbolF');

    if (types.length === 0) return "Select an option!";

    let password = '';
    for (let i = 0; i < lengthR; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        password += randomFunc[type]();
    }
    return password;
}

const randomFunc = {
    lowerF: getRanLower,
    upperF: getRanUpper,
    numberF: getRanNumber,
    symbolF: getRanSymbol
};

function getRanSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getRanNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRanUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRanLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
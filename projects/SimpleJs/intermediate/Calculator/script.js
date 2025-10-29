//vars and const
let isScientific = false;
let isSecondActive = false;
let isDegrees = true;

const display = document.getElementById('display');
const grid = document.getElementById('calculatorGrid');
const themeToggle = document.getElementById('themeToggle');
const logoImg = document.getElementById('logoImg');
const secondBtn = document.getElementById('secondBtn');
const degBtn = document.getElementById('degBtn');
const sinBtn = document.getElementById('sinBtn');
const cosBtn = document.getElementById('cosBtn');
const tanBtn = document.getElementById('tanBtn');

//theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.className = 'ri-sun-fill';
        if (logoImg.src.includes('logolight')) {
            logoImg.src = logoImg.src.replace('logolight', 'logodark');
        }
    } else {
        themeToggle.className = 'ri-moon-clear-fill';
        if (logoImg.src.includes('logodark')) {
            logoImg.src = logoImg.src.replace('logodark', 'logolight');
        }
    }
});

//toggle between basic and scientific
function toggleScientific() {
    isScientific = !isScientific;
    grid.classList.toggle('scientific');
}

//toggle 2nd functions
function toggleSecondary() {
    isSecondActive = !isSecondActive;
    secondBtn.classList.toggle('secondary-active');

    if (isSecondActive) {
        sinBtn.innerHTML = 'sin<sup>-1</sup>';
        cosBtn.innerHTML = 'cos<sup>-1</sup>';
        tanBtn.innerHTML = 'tan<sup>-1</sup>';
    } else {
        sinBtn.textContent = 'sin';
        cosBtn.textContent = 'cos';
        tanBtn.textContent = 'tan';
    }
}

//toggle between deg and rad
function toggleDegRad() {
    isDegrees = !isDegrees;
    degBtn.textContent = isDegrees ? 'deg' : 'rad';
    if (isSecondActive) {
        toggleSecondary(); 
    }
}

//trig function
function addTrigFunction(func) {
    if (isSecondActive) {
        appendToDisplay('arc' + func + '(');
    } else {
        appendToDisplay(func + '(');
    }
}

//display function
function appendToDisplay(value) {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function deleteLast() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
}

function calculateResult() {
    try {
        let expression = display.textContent;

        console.log('OE:', expression);

        //replace special chars
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/\be\b/g, Math.E);

        //percentage
        expression = expression.replace(/(\d+\.?\d*)%/g, '($1/100)');

        //factorial
        expression = expression.replace(/(\d+)!/g, (num) => {
            const n = parseInt(num);
            if (n < 0 || n > 200) throw new Error('Factorial out of range');
            return factorial(n);
        });

        //square root
        expression = expression.replace(/√\(/g, 'Math.sqrt(');

        //power
        expression = expression.replace(/\^/g, '**');

        //eval scope
        const toRad = (deg) => deg * (Math.PI / 180);
        const toDeg = (rad) => rad * (180 / Math.PI);

        //trig functions
        if (isDegrees) {
            //invert trig
            expression = expression.replace(/arcsin\(/g, 'toDeg(Math.asin(');
            expression = expression.replace(/arccos\(/g, 'toDeg(Math.acos(');
            expression = expression.replace(/arctan\(/g, 'toDeg(Math.atan(');
            
            //regular trig
            expression = expression.replace(/sin\(/g, 'Math.sin(toRad(');
            expression = expression.replace(/cos\(/g, 'Math.cos(toRad(');
            expression = expression.replace(/tan\(/g, 'Math.tan(toRad(');
            
            //add extra )
            let sinCount = (display.textContent.match(/\bsin\(/g) || []).length;
            let cosCount = (display.textContent.match(/\bcos\(/g) || []).length;
            let tanCount = (display.textContent.match(/\btan\(/g) || []).length;
            let arcsinCount = (display.textContent.match(/arcsin\(/g) || []).length;
            let arccosCount = (display.textContent.match(/arccos\(/g) || []).length;
            let arctanCount = (display.textContent.match(/arctan\(/g) || []).length;
            
            let totalWrappers = sinCount + cosCount + tanCount + arcsinCount + arccosCount + arctanCount;
            let currentClosing = (expression.match(/\)/g) || []).length;
            let originalClosing = (display.textContent.match(/\)/g) || []).length;
            
            //add the missing )
            if (totalWrappers > (currentClosing - originalClosing)) {
                expression += ')'.repeat(totalWrappers - (currentClosing - originalClosing));
            }
        } else {
            //rad mode
            expression = expression.replace(/arcsin\(/g, 'Math.asin(');
            expression = expression.replace(/arccos\(/g, 'Math.acos(');
            expression = expression.replace(/arctan\(/g, 'Math.atan(');
            expression = expression.replace(/sin\(/g, 'Math.sin(');
            expression = expression.replace(/cos\(/g, 'Math.cos(');
            expression = expression.replace(/tan\(/g, 'Math.tan(');
        }

        //log and ln
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');

        console.log('Transformed expression:', expression);

        //result expression
        const result = eval(expression);

        //validate result
        if (isNaN(result)) {
            display.textContent = 'Math Error';
        } else if (!isFinite(result)) {
            display.textContent = 'Infinity';
        } else {
            //round to avoid floating errors
            display.textContent = parseFloat(result.toFixed(10));
        }
        
        console.log('Result:', display.textContent);

    } catch (error) {
        console.error('Calculation error:', error);
        display.textContent = 'Error';
    }
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

function toDeg(radians) {
    return radians * (180 / Math.PI);
}

//support keyboard
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === '.') appendToDisplay('.');
    if (e.key === '+') appendToDisplay('+');
    if (e.key === '-') appendToDisplay('-');
    if (e.key === '*') appendToDisplay('*');
    if (e.key === '/') appendToDisplay('/');
    if (e.key === 'Enter') calculateResult();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === 'Backspace') deleteLast();
});
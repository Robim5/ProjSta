const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const btnAdd = document.getElementById('add');
const displayTask = document.getElementById('display');
const tasksDiv = document.querySelector('.tasks');
const overlay = document.querySelector('.overlay');
const editDisplay = document.getElementById('editdisplay');
const btnEdit = document.getElementById('addedit');

let currTaskText = null;
let progress = 0;
let numTasks = 0;

// add task
btnAdd.addEventListener('click', () => {
    const taskNow = displayTask.value.trim();
    if (taskNow === '') return;

    if (generateTask(taskNow)) {
        updateStats();
        displayTask.value = '';
    }
});

// Event delegation for edit / delete / check actions
tasksDiv.addEventListener('click', e => {
    const task = e.target.closest('.task');
    if (!task) return;

    // edit
    if (e.target.classList.contains('edit') || e.target.closest('.edit')) {
        const textElement = task.querySelector('p');
        currTaskText = textElement;
        editDisplay.value = textElement.textContent;
        overlay.classList.add('active');
        return;
    }

    // delete
    if (e.target.classList.contains('delete') || e.target.closest('.delete')) {
        task.remove();
        updateStats()
        return;
    }

    // check toggle
    if (e.target.classList.contains('check') || e.target.closest('.check')) {
        const checkSpan = task.querySelector('.check');
        checkSpan.classList.toggle('completed');
        task.classList.toggle('completed');
        updateStats();
        return;
    }
});

// Save edited text
btnEdit.addEventListener('click', () => {
    if (currTaskText) {
        currTaskText.textContent = editDisplay.value.trim() || currTaskText.textContent;
        currTaskText = null;
    }
    overlay.classList.remove('active');
});

overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('active');
});

function generateTask(taskText) {
    if (!taskText) return false;
    tasksDiv.innerHTML += `
        <div class="task">
            <span class="check"></span>
            <p>${escapeHtml(taskText)}</p>
            <div class="actions">
                <i class="ri-pencil-line edit"></i>
                <i class="ri-delete-bin-6-line delete"></i>
            </div>
        </div>
    `;
    return true;
}

// escape user input to avoid HTML injection
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function updateStats() {
    const taks = tasksDiv.querySelectorAll('.task');
    numTasks = taks.length;
    const completed = tasksDiv.querySelectorAll('.task.completed').length;

    if (progressText) progressText.textContent = `${completed}/${numTasks}`;

    if (progressBar) {
        progressBar.value = completed;
        progressBar.max = numTasks || 1;

    }
}

updateStats();
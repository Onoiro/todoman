// Массив задач
const tasks = [
  { id: 1, text: 'Купить молоко', completed: false },
  { id: 2, text: 'Сделать домашку', completed: false },
  { id: 3, text: 'Позвонить другу', completed: true },
  { id: 4, text: 'Записаться к врачу', completed: false }
];

// Функция рендеринга задач
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    if (task.completed) {
      checkbox.checked = true;
    }

    const text = document.createElement('span');
    text.className = 'task-text';
    if (task.completed) {
      text.classList.add('done');
    }
    text.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'task-delete';
    deleteBtn.textContent = 'Удалить';

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Рендеринг при загрузке страницы
document.addEventListener('DOMContentLoaded', renderTasks);

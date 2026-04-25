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

// Получаем элементы формы из DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

// Функция добавления новой задачи
// Зачем: создаёт объект задачи с уникальным ID и добавляет в массив
function addTask(text) {
  // Проверяем, что текст не пустой и не состоит только из пробелов
  if (!text || text.trim() === '') {
    return;
  }

  // Находим максимальный ID и создаём новый
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
  const newId = maxId + 1;

  // Создаём новую задачу
  const newTask = {
    id: newId,
    text: text.trim(),
    completed: false
  };

  // Добавляем в массив и перерисовываем список
  tasks.push(newTask);
  renderTasks();
}

// Обработчик отправки формы
// Зачем: добавляет задачу при клике на кнопку "Добавить" без перезагрузки страницы
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Блокируем стандартную отправку формы

  const inputValue = taskInput.value;
  addTask(inputValue);

  taskInput.value = ''; // Очищаем поле ввода
  taskInput.focus(); // Возвращаем фокус на поле ввода
});

// Рендеринг при загрузке страницы
document.addEventListener('DOMContentLoaded', renderTasks);

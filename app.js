// Массив задач
const tasks = [
  { id: 1, text: 'Купить молоко', completed: false },
  { id: 2, text: 'Сделать домашку', completed: false },
  { id: 3, text: 'Позвонить другу', completed: true },
  { id: 4, text: 'Записаться к врачу', completed: false }
];

// Переменные для фильтрации и поиска
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
let searchQuery = '';

// Функция удаления задачи
// Зачем: удаляет задачу из массива по ID и перерисовывает список
function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Функция смены статуса задачи
// Зачем: переключает completed true/false и перерисовывает список
function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Функция получения отфильтрованных задач
// Зачем: возвращает массив задач с учётом текущего фильтра и поиска
function getFilteredTasks() {
  let filtered = tasks;

  // Применяем фильтр по статусу
  if (currentFilter === 'active') {
    filtered = filtered.filter(task => task.completed === false);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(task => task.completed === true);
  }
  // Если currentFilter === 'all', фильтра не применяем

  // Применяем поиск по тексту
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(task => 
      task.text.toLowerCase().includes(query)
    );
  }

  return filtered;
}

// Функция рендеринга задач
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  // Используем отфильтрованный массив задач
  const filteredTasks = getFilteredTasks();

  filteredTasks.forEach(task => {
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

    // Добавляем обработчики событий
    checkbox.addEventListener('change', function() {
      toggleTask(task.id);
    });

    deleteBtn.addEventListener('click', function() {
      deleteTask(task.id);
    });
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

  // Ограничиваем длину текста до 100 символов
  const trimmedText = text.trim();
  if (trimmedText.length > 100) {
    alert('Задача слишком длинная! Максимум 100 символов.');
    return;
  }

  // Находим максимальный ID и создаём новый
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
  const newId = maxId + 1;

  // Создаём новую задачу
  const newTask = {
    id: newId,
    text: trimmedText,
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

// Получаем элементы фильтров и поиска
const searchInput = document.getElementById('search-input');
const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterDone = document.getElementById('filter-done');

// Обработчик поля поиска
// Зачем: фильтрует задачи в реальном времени при вводе текста
searchInput.addEventListener('input', function() {
  searchQuery = this.value;
  renderTasks();
});

// Обработчики кнопок фильтрации
// Зачем: показывают задачи только выбранного статуса
filterAll.addEventListener('click', function() {
  currentFilter = 'all';
  updateFilterButtons(filterAll);
  renderTasks();
});

filterActive.addEventListener('click', function() {
  currentFilter = 'active';
  updateFilterButtons(filterActive);
  renderTasks();
});

filterDone.addEventListener('click', function() {
  currentFilter = 'completed';
  updateFilterButtons(filterDone);
  renderTasks();
});

// Функция обновления подсветки кнопок фильтров
// Зачем: показывает пользователю, какой фильтр сейчас активен
function updateFilterButtons(activeButton) {
  // Убираем класс active со всех кнопок
  filterAll.classList.remove('active');
  filterActive.classList.remove('active');
  filterDone.classList.remove('active');
  // Добавляем нажатой кнопке
  activeButton.classList.add('active');
}

// Рендеринг при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  renderTasks();
  updateFilterButtons(filterAll); // Подсвечиваем "Все" по умолчанию
});

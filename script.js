// Получаем все необходимые элементы из HTML
const searchButton = document.getElementById('search-button');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const eventChoiceElement = document.getElementById('event-choice');
const goodStatElement = document.getElementById('good-stat');
const evilStatElement = document.getElementById('evil-stat');

// Переменные для управления игрой
let timerId = null;
let timeLeft = 10;

// База данных случайных событий
const events = [
  { 
    type: 'good',
    text: 'Спасти кошку с дерева',
    description: 'Мягкие лапки теперь в безопасности!'
  },
  {
    type: 'good', 
    text: 'Помочь старушке донести сумки',
    description: 'Она дала тебе леденец в форме черепа'
  },
  {
    type: 'good',
    text: 'Вернуть потерянный кошелек',
    description: 'Внутри была фотография котенка'
  },
  {
    type: 'good',
    text: 'Потушить пожар в лесу',
    description: 'Еноты тебя благодарно обнимают'
  },
  {
    type: 'good',
    text: 'Обучить детей математике',
    description: 'Теперь они любят квадратные корни'
  },
  {
    type: 'evil',
    text: 'Украсть праздничный торт',
    description: 'На нем было 666 свечек'
  },
  {
    type: 'evil',
    text: 'Разбить зеркала в доме',
    description: '7 лет неудачи... но ты же призрак!'
  },
  {
    type: 'evil',
    text: 'Спрятать пульт от телевизора',
    description: 'Семья смотрит только рекламу'
  },
  {
    type: 'evil', 
    text: 'Испортить WiFi соседям',
    description: 'Теперь они читают... книги'
  },
  {
    type: 'evil',
    text: 'Напугать почтальона',
    description: 'Он разбросал письма с криком'
  }
];

// Обработчик кнопки "Найти событие"
searchButton.addEventListener('click', () => {
  // Прячем кнопку и показываем таймер
  searchButton.classList.add('hidden');
  timerElement.classList.remove('hidden');
  
  // Запускаем обратный отсчет
  startTimer();
});

// Функция запуска таймера
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;
    
    if(timeLeft <= 0) {
      clearInterval(timerId);
      timerElement.classList.add('hidden');
      showRandomEvent();
    }
  }, 1000);
}

// Показ случайного события
function showRandomEvent() {
  // Выбираем случайное событие
  const randomIndex = Math.floor(Math.random() * events.length);
  const event = events[randomIndex];
  
  // Создаем HTML для события
  eventChoiceElement.innerHTML = `
    <h3>${event.text}</h3>
    <p class="event-description">${event.description}</p>
    <button class="event-action">Принять решение</button>
  `;

  // Находим новую кнопку и добавляем обработчик
  const actionButton = eventChoiceElement.querySelector('.event-action');
  actionButton.addEventListener('click', () => handleEventChoice(event.type));
  
  // Показываем блок с событием
  eventChoiceElement.classList.remove('hidden');
}

// Обработка выбора игрока
function handleEventChoice(choiceType) {
  if(choiceType === 'good') {
    goodStatElement.textContent = parseInt(goodStatElement.textContent) + 1;
  } else {
    evilStatElement.textContent = parseInt(evilStatElement.textContent) + 1;
  }
  resetGameState();
}

// Сброс состояния игры
function resetGameState() {
  // Скрываем блок с событием
  eventChoiceElement.classList.add('hidden');
  
  // Восстанавливаем начальные значения
  timeLeft = 10;
  timeLeftElement.textContent = timeLeft;
  
  // Показываем кнопку поиска
  searchButton.classList.remove('hidden');
}

// Инициализация игры при загрузке
function initGame() {
  // Сбрасываем статистику
  goodStatElement.textContent = '0';
  evilStatElement.textContent = '0';
  
  // Гарантируем начальное состояние
  resetGameState();
}

// Запускаем игру при загрузке страницы
window.onload = initGame;

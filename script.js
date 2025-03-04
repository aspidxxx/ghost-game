// Получаем элементы интерфейса
const searchButton = document.getElementById('search-button');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const eventChoiceElement = document.getElementById('event-choice');
const goodStatElement = document.getElementById('good-stat');
const evilStatElement = document.getElementById('evil-stat');

// Игровые переменные
let timerId = null;
let timeLeft = 2;

// Разделенные события
const goodEvents = [
  {
    text: 'Спасти кошку с дерева',
    description: 'Мягкие лапки теперь в безопасности!'
  },
  {
    text: 'Помочь старушке',
    description: 'Она дала тебе волшебный леденец'
  }
];

const evilEvents = [
  {
    text: 'Украсть торт',
    description: 'На нем было 666 свечек'
  },
  {
    text: 'Испортить WiFi',
    description: 'Соседи теперь читают книги'
  }
];

// Обработчик кнопки поиска
searchButton.addEventListener('click', () => {
  searchButton.classList.add('hidden');
  timerElement.classList.remove('hidden');
  startTimer();
});

// Запуск таймера
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;
    
    if(timeLeft <= 0) {
      clearInterval(timerId);
      timerElement.classList.add('hidden');
      showChoices();
    }
  }, 1000);
}

// Показ двух вариантов
function showChoices() {
  // Выбираем случайные события
  const good = goodEvents[Math.floor(Math.random() * goodEvents.length)];
  const evil = evilEvents[Math.floor(Math.random() * evilEvents.length)];

  // Создаем HTML
  eventChoiceElement.innerHTML = `
    <div class="choice-container">
      <div class="choice good-choice">
        <h3>${good.text}</h3>
        <button class="choice-button" data-type="good">Выбрать Добро</button>
      </div>
      <div class="choice evil-choice">
        <h3>${evil.text}</h3>
        <button class="choice-button" data-type="evil">Выбрать Зло</button>
      </div>
    </div>
  `;

  // Добавляем обработчики
  document.querySelectorAll('.choice-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const type = e.target.dataset.type;
      showResult(type === 'good' ? good : evil);
    });
  });
  
  eventChoiceElement.classList.remove('hidden');
}

// Показ результата выбора
function showResult(event) {
  eventChoiceElement.innerHTML = `
    <div class="result">
      <h3>${event.text}</h3>
      <p class="description">${event.description}</p>
      <button class="continue-button">Продолжить</button>
    </div>
  `;

  // Обновляем статистику
  if(event === good) {
    goodStatElement.textContent = parseInt(goodStatElement.textContent) + 1;
  } else {
    evilStatElement.textContent = parseInt(evilStatElement.textContent) + 1;
  }

  // Возврат к началу
  document.querySelector('.continue-button').addEventListener('click', resetGame);
}

// Сброс игры
function resetGame() {
  timeLeft = 2;
  timeLeftElement.textContent = timeLeft;
  eventChoiceElement.classList.add('hidden');
  searchButton.classList.remove('hidden');
}

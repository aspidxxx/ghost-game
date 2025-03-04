// Массив случайных событий (добавь свои варианты)
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

// Получаем элементы из HTML
const searchButton = document.getElementById('search-button');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const eventChoiceElement = document.getElementById('event-choice');
const goodChoiceButton = document.getElementById('good-choice');
const evilChoiceButton = document.getElementById('evil-choice');
const goodStatElement = document.getElementById('good-stat');
const evilStatElement = document.getElementById('evil-stat');

let timerId = null; // Идентификатор таймера
let timeLeft = 2; // Начальное время

// Обработчик клика на кнопку "Найти событие"
searchButton.addEventListener('click', () => {
    // Скрываем кнопку и показываем таймер
    searchButton.classList.add('hidden');
    timerElement.classList.remove('hidden');
    
    // Запускаем таймер
    timerId = setInterval(() => {
        timeLeft--; // Уменьшаем время на 1 секунду
        timeLeftElement.textContent = timeLeft; // Обновляем отображение
        
        // Если время вышло
        if (timeLeft <= 0) {
            clearInterval(timerId); // Останавливаем таймер
            timerElement.classList.add('hidden'); // Скрываем таймер
            showRandomEvent(); // Показываем выбор события
        }
    }, 1000); // Интервал: 1000 мс = 1 секунда
});

// Функция показа случайного события
function showRandomEvent() {
  const randomEvent = events[Math.floor(Math.random() * events.length)];
}

// Обработчик выбора "Добра"
goodChoiceButton.addEventListener('click', () => {
    const currentGood = parseInt(goodStatElement.textContent); // Текущее значение
    goodStatElement.textContent = currentGood + 1; // Увеличиваем на 1
    resetSearch(); // Сбрасываем поиск
});

// Обработчик выбора "Зла"
evilChoiceButton.addEventListener('click', () => {
    const currentEvil = parseInt(evilStatElement.textContent);
    evilStatElement.textContent = currentEvil + 1;
    resetSearch();
});

// Сброс параметров для нового поиска
function resetSearch() {
    eventChoiceElement.classList.add('hidden'); // Скрываем выбор
    searchButton.classList.remove('hidden'); // Показываем кнопку
    timeLeft = 10; // Сбрасываем таймер
    timeLeftElement.textContent = timeLeft; // Обновляем отображение
}
// Очищаем предыдущие кнопки
  eventChoiceElement.innerHTML = `
    <h3>${randomEvent.text}</h3>
    <p>${randomEvent.description}</p>
    <button class="choice-button">Выбрать</button>
  `;

  const choiceButton = document.querySelector('.choice-button');
  
  choiceButton.onclick = () => {
    if (randomEvent.type === 'good') {
      goodStatElement.textContent = parseInt(goodStatElement.textContent) + 1;
    } else {
      evilStatElement.textContent = parseInt(evilStatElement.textContent) + 1;
    }
    resetSearch();
  };

  eventChoiceElement.classList.remove('hidden');
}

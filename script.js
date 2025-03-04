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
    eventChoiceElement.classList.remove('hidden'); // Показываем блок выбора
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

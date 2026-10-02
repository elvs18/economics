/**
 * ============================================================
 * СЛОВАРЬ ЭКОНОМИСТА — КЛИЕНТСКАЯ ЛОГИКА
 * ============================================================
 * Этот файл ты пишешь сама шаг за шагом!
 * Здесь уже настроены: переключение темы и скрытый доступ для автора.
 */

// 1. КОНСТАНТЫ И СПИСКИ
const PASSCODE = 'moh-econ-2026'; // Секретный код автора (поменяй на свой)

const CATEGORIES = {
  micro: 'Микроэкономика',
  macro: 'Макроэкономика',
  finance: 'Финансы и банки',
  econometrics: 'Эконометрика',
  international: 'Мировая экономика',
  other: 'Другое'
};

const RU_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
const EN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// 2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ (STATE)
let terms = [];             // Массив всех терминов
let currentLang = 'ru';      // Текущий язык интерфейса ('ru', 'en', 'uz')
let currentCategory = 'all'; // Выбранная категория фильтра
let searchQuery = '';        // Текст поиска
let isAuthor = false;        // Статус автора (по умолчанию обычный гость)

// 3. ОСНОВНЫЕ ЭЛЕМЕНТЫ DOM
const elements = {
  // Тема
  themeToggleBtn: document.getElementById('themeToggleBtn'),

  // Поиск и фильтры
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  categoryFilter: document.getElementById('categoryFilter'),
  
  // Контейнеры карточек и алфавита
  alphabetRail: document.getElementById('alphabetRail'),
  termsList: document.getElementById('termsList'),
  emptyState: document.getElementById('emptyState'),
  totalCount: document.getElementById('totalCount'),
  filteredStats: document.getElementById('filteredStats'),

  // Модальное окно термина (доступно только автору)
  termDialog: document.getElementById('termDialog'),
  termForm: document.getElementById('termForm'),
  openAddBtn: document.getElementById('openAddBtn'),
  closeTermDialogBtn: document.getElementById('closeTermDialogBtn'),
  cancelTermBtn: document.getElementById('cancelTermBtn'),
  formLangTabs: document.getElementById('formLangTabs'),

  // Секретный доступ автора
  authorBtn: document.getElementById('authorBtn'),
  authorStatusBadge: document.getElementById('authorStatusBadge'),
  authorLogoutBtn: document.getElementById('authorLogoutBtn'),
  authorDialog: document.getElementById('authorDialog'),
  authorPassInput: document.getElementById('authorPassInput'),
  authorPassError: document.getElementById('authorPassError'),
  loginAuthorBtn: document.getElementById('loginAuthorBtn'),
  cancelAuthorBtn: document.getElementById('cancelAuthorBtn'),
  closeAuthorDialogBtn: document.getElementById('closeAuthorDialogBtn'),

  // Тренажёр флеш-карточек
  quizBtn: document.getElementById('quizBtn'),
  quizDialog: document.getElementById('quizDialog'),
  closeQuizDialogBtn: document.getElementById('closeQuizDialogBtn'),
  flashcardBox: document.getElementById('flashcardBox'),
  flashcardInner: document.getElementById('flashcardInner'),

  // Экспорт/импорт и тост
  exportBtn: document.getElementById('exportBtn'),
  importInput: document.getElementById('importInput'),
  toastMessage: document.getElementById('toastMessage')
};


/* ============================================================
   ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ОФОРМЛЕНИЯ (Светлая / Тёмная)
   ============================================================ */
elements.themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('econ_theme', newTheme);
  showToast(newTheme === 'dark' ? 'Включена тёмная тема' : 'Включена светлая тема');
});


/* ============================================================
   СКРЫТАЯ АВТОРИЗАЦИЯ АВТОРА
   Обычный посетитель не видит кнопку добавления и не знает пароль.
   Вход можно открыть:
   1) кликом по незаметному замочку в футере
   2) двойным кликом по иконке логотипа в шапке
   3) секретным сочетанием клавиш: Ctrl + Shift + A
   ============================================================ */
function openAuthorModal() {
  elements.authorDialog.showModal();
  elements.authorPassInput.value = '';
  elements.authorPassError.style.display = 'none';
  elements.authorPassInput.focus();
}

function closeAuthorModal() {
  elements.authorDialog.close();
}

// Слушатели для открытия окна автора
elements.authorBtn.addEventListener('click', openAuthorModal);
document.getElementById('brandIcon').addEventListener('dblclick', openAuthorModal);

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
    e.preventDefault();
    openAuthorModal();
  }
});

elements.closeAuthorDialogBtn.addEventListener('click', closeAuthorModal);
elements.cancelAuthorBtn.addEventListener('click', closeAuthorModal);

// Проверка пароля автора
elements.loginAuthorBtn.addEventListener('click', handleAuthorLogin);
elements.authorPassInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAuthorLogin();
});

function handleAuthorLogin() {
  if (elements.authorPassInput.value === PASSCODE) {
    isAuthor = true;
    closeAuthorModal();
    updateAuthorState();
    showToast('Вы вошли как автор! Редактирование открыто');
  } else {
    elements.authorPassError.style.display = 'block';
  }
}

// Выход из режима автора
elements.authorLogoutBtn.addEventListener('click', () => {
  isAuthor = false;
  updateAuthorState();
  showToast('Вы вышли из режима автора');
});

// Обновление интерфейса: показываем или скрываем кнопки автора
function updateAuthorState() {
  if (isAuthor) {
    elements.openAddBtn.classList.remove('hidden');
    elements.authorStatusBadge.classList.remove('hidden');
    elements.authorBtn.classList.add('hidden');
  } else {
    elements.openAddBtn.classList.add('hidden');
    elements.authorStatusBadge.classList.add('hidden');
    elements.authorBtn.classList.remove('hidden');
  }
  // Перерисовываем карточки (когда напишем renderTerms), чтобы показать/скрыть кнопки редактирования
  if (typeof renderTerms === 'function') renderTerms();
}


/* ============================================================
   ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: УВЕДОМЛЕНИЕ (TOAST)
   ============================================================ */
function showToast(text) {
  elements.toastMessage.textContent = text;
  elements.toastMessage.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    elements.toastMessage.classList.remove('show');
  }, 2200);
}


/* ============================================================
   ДАЛЕЕ ТВОЙ КОД:
   ------------------------------------------------------------
   1. renderTerms() — отрисовка карточек
   2. renderAlphabet() — генерация букв алфавита
   3. Модалка добавления термина:
      elements.openAddBtn.addEventListener('click', () => elements.termDialog.showModal());
   4. Сохранение данных в localStorage / бэкенд
   ============================================================ */

console.log('Скрипт словаря инициализирован.');
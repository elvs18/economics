/**
 * ============================================================
 * СЛОВАРЬ ЭКОНОМИСТА — КЛИЕНТСКАЯ ЛОГИКА
 * ============================================================
 * Этот файл ты пишешь сама шаг за шагом!
 * Ниже подготовлен удобный каркас с подсказками по элементам интерфейса.
 */

// 1. КОНСТАНТЫ И СПИСКИ
const CATEGORIES = {
  micro: 'Микроэкономика',
  macro: 'Макроэкономика',
  finance: 'Финансы и банки',
  econometrics: 'Эконометрика',
  international: 'Мировая экономика',
  other: 'Другое'
};

// Алфавиты для боковой панели навигации
const RU_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
const EN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// 2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ (STATE)
let terms = [];             // Здесь будет храниться массив всех карточек
let currentLang = 'ru';      // Текущий язык интерфейса ('ru', 'en', 'uz')
let currentCategory = 'all'; // Выбранная категория фильтра
let searchQuery = '';        // Текст из поисковой строки
let isAuthor = false;        // Авторизован ли автор (true / false)

// 3. ОСНОВНЫЕ ЭЛЕМЕНТЫ DOM (ДЛЯ БЫСТРОГО ДОСТУПА)
const elements = {
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

  // Модальное окно термина
  termDialog: document.getElementById('termDialog'),
  termForm: document.getElementById('termForm'),
  openAddBtn: document.getElementById('openAddBtn'),
  closeTermDialogBtn: document.getElementById('closeTermDialogBtn'),
  cancelTermBtn: document.getElementById('cancelTermBtn'),
  formLangTabs: document.getElementById('formLangTabs'),

  // Панель автора
  authorBtn: document.getElementById('authorBtn'),
  authorDialog: document.getElementById('authorDialog'),
  authorPassInput: document.getElementById('authorPassInput'),
  loginAuthorBtn: document.getElementById('loginAuthorBtn'),
  cancelAuthorBtn: document.getElementById('cancelAuthorBtn'),
  closeAuthorDialogBtn: document.getElementById('closeAuthorDialogBtn'),

  // Тренажёр флеш-карточек
  quizBtn: document.getElementById('quizBtn'),
  quizDialog: document.getElementById('quizDialog'),
  flashcardBox: document.getElementById('flashcardBox'),
  flashcardInner: document.getElementById('flashcardInner'),

  // Резервное копирование и уведомления
  exportBtn: document.getElementById('exportBtn'),
  importInput: document.getElementById('importInput'),
  toastMessage: document.getElementById('toastMessage')
};

console.log('Словарь экономиста готов к написанию логики!', elements);

/* ============================================================
   С чего начать писать функции:
   1. Функция сохранения и загрузки из localStorage:
      function saveToStorage() { localStorage.setItem('econ_terms', JSON.stringify(terms)); }
      function loadFromStorage() { ... }

   2. Функция отрисовки карточек:
      function renderTerms() { ... }

   3. Функция построения алфавита:
      function renderAlphabet() { ... }

   4. Обработчики событий (клики, ввод текста в поиск, отправка формы).
   ============================================================ */
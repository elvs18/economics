/**
 * ============================================================
 * СЛОВАРЬ ЭКОНОМИСТА (ECONOMICS HUB) — КЛИЕНТСКАЯ ЛОГИКА
 * ============================================================
 */

// 1. КОНФИГУРАЦИЯ И СЕКРЕТНЫЙ КОД АВТОРА
const PASSCODE = 'moh-econ-2026';

const RU_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
const LAT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// 2. СЛОВАРИ ИНТЕРФЕЙСА (I18N: RU / EN / UZ)
const I18N = {
  ru: {
    appTitle: 'Словарь экономиста',
    appSub: 'Интерактивный академический справочник',
    searchPh: 'Поиск по терминам, определениям или примерам...',
    allCategories: 'Все разделы',
    categories: {
      micro: 'Микроэкономика',
      macro: 'Макроэкономика',
      finance: 'Финансы и банки',
      econometrics: 'Эконометрика',
      international: 'Мировая экономика',
      other: 'Другое'
    },
    totalStats: 'Всего терминов: ',
    foundStats: 'найдено: ',
    emptyTitle: 'В словаре пока нет записей',
    emptyDesc: 'Словарь ожидает наполнения терминами от автора.',
    noSearchResults: q => `По запросу «${q}» ничего не найдено`,
    addTermBtn: 'Добавить термин',
    quizBtn: 'Тренажёр',
    exportBtn: 'Экспорт',
    importBtn: 'Импорт',
    save: 'Сохранить термин',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    confirmDelete: t => `Удалить «${t}» из словаря?`,
    savedToast: 'Термин сохранён',
    deletedToast: 'Термин удалён',
    flipHint: 'Нажмите на карточку или Пробел, чтобы перевернуть',
    cardSideTerm: 'Термин',
    cardSideDef: 'Определение',
    quizCardProgress: (cur, tot) => `Карточка ${cur} из ${tot}`,
    authorActive: 'Автор: активен',
    authorLogout: 'Выйти',
    authorWelcome: 'Вы вошли как автор! Редактирование открыто',
    authorLeft: 'Вы вышли из режима автора',
    themeDark: 'Включена тёмная тема',
    themeLight: 'Включена светлая тема',
    importedSuccess: n => `Успешно импортировано терминов: ${n}`,
    importedError: 'Ошибка при чтении файла JSON'
  },
  en: {
    appTitle: 'Economics Dictionary',
    appSub: 'Interactive Academic Study Hub',
    searchPh: 'Search terms, definitions, or examples...',
    allCategories: 'All Sections',
    categories: {
      micro: 'Microeconomics',
      macro: 'Macroeconomics',
      finance: 'Finance & Banking',
      econometrics: 'Econometrics',
      international: 'International Economics',
      other: 'Other'
    },
    totalStats: 'Total terms: ',
    foundStats: 'found: ',
    emptyTitle: 'The dictionary is empty for now',
    emptyDesc: 'Awaiting economic terms from the author.',
    noSearchResults: q => `No results found for “${q}”`,
    addTermBtn: 'Add term',
    quizBtn: 'Flashcards',
    exportBtn: 'Export',
    importBtn: 'Import',
    save: 'Save term',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: t => `Delete “${t}” from the dictionary?`,
    savedToast: 'Term saved',
    deletedToast: 'Term deleted',
    flipHint: 'Click card or press Space to flip',
    cardSideTerm: 'Term',
    cardSideDef: 'Definition',
    quizCardProgress: (cur, tot) => `Card ${cur} of ${tot}`,
    authorActive: 'Author: active',
    authorLogout: 'Log out',
    authorWelcome: 'Logged in as author! Editing enabled',
    authorLeft: 'Logged out from author mode',
    themeDark: 'Dark mode enabled',
    themeLight: 'Light mode enabled',
    importedSuccess: n => `Imported ${n} terms successfully`,
    importedError: 'Error parsing JSON file'
  },
  uz: {
    appTitle: 'Iqtisodiyot lugʻati',
    appSub: 'Interaktiv akademik oʻquv maʼlumotnomasi',
    searchPh: 'Atama, taʼrif yoki misollar boʻyicha qidiruv...',
    allCategories: 'Barcha boʻlimlar',
    categories: {
      micro: 'Mikroiqtisodiyot',
      macro: 'Makroiqtisodiyot',
      finance: 'Moliya va bank',
      econometrics: 'Ekonometrika',
      international: 'Xalqaro iqtisodiyot',
      other: 'Boshqa'
    },
    totalStats: 'Jami atamalar: ',
    foundStats: 'topildi: ',
    emptyTitle: 'Lugʻatda hali yozuvlar yoʻq',
    emptyDesc: 'Muallif tomonidan atamalar kiritilishini kutmoqda.',
    noSearchResults: q => `“${q}” boʻyicha hech narsa topilmadi`,
    addTermBtn: 'Atama qoʻshish',
    quizBtn: 'Trenajyor',
    exportBtn: 'Eksport',
    importBtn: 'Import',
    save: 'Atamani saqlash',
    cancel: 'Bekor qilish',
    edit: 'Tahrirlash',
    delete: 'Oʻchirish',
    confirmDelete: t => `“${t}” atamasini lugʻatdan oʻchirasizmi?`,
    savedToast: 'Atama saqlandi',
    deletedToast: 'Atama oʻchirildi',
    flipHint: 'Aylantirish uchun kartani bosing yoki Boʻsh joy (Space) tugmasini bosing',
    cardSideTerm: 'Atama',
    cardSideDef: 'Taʼrif',
    quizCardProgress: (cur, tot) => `Karta: ${cur} / ${tot}`,
    authorActive: 'Muallif: faol',
    authorLogout: 'Chiqish',
    authorWelcome: 'Muallif sifatida kirdingiz! Tahrirlash ochildi',
    authorLeft: 'Muallif rejimidan chiqildi',
    themeDark: 'Tungi rejim yoqildi',
    themeLight: 'Kunduzgi rejim yoqildi',
    importedSuccess: n => `Muvaffaqiyatli import qilindi: ${n} ta atama`,
    importedError: 'JSON faylini oʻqishda xatolik yuz berdi'
  }
};

// 3. СТАРТОВАЯ БАЗА ИЗ 10 ФУНДАМЕНТАЛЬНЫХ ТЕРМИНОВ (STARTER PACK)
const STARTER_TERMS = [
  {
    id: 't_gdp',
    category: 'macro',
    dateAdded: '2026-10-01T10:00:00.000Z',
    ru: {
      term: 'ВВП (Валовой внутренний продукт)',
      definition: 'Рыночная стоимость всех конечных товаров и услуг, произведённых на территории страны за определённый период времени (обычно за год).',
      example: 'Основная формула расчёта по расходам: GDP = C + I + G + NX.'
    },
    en: {
      term: 'GDP (Gross Domestic Product)',
      definition: 'The total monetary or market value of all finished goods and services produced within a country’s borders in a specific time period.',
      example: 'Calculated via expenditure approach: GDP = C + I + G + NX.'
    },
    uz: {
      term: 'YaIM (Yalpi ichki mahsulot)',
      definition: 'Mamlakat hududida maʼlum bir davr (odatda bir yil) davomida ishlab chiqarilgan barcha yakuniy tovarlar va xizmatlarning bozor qiymati.',
      example: 'Xarajatlar usulidagi formula: YaIM = C + I + G + NX.'
    }
  },
  {
    id: 't_inflation',
    category: 'macro',
    dateAdded: '2026-10-01T10:05:00.000Z',
    ru: {
      term: 'Инфляция',
      definition: 'Устойчивое долговременное повышение общего уровня цен на товары и услуги, приводящее к снижению покупательской способности денег.',
      example: 'При инфляции 8% в год покупательская способность фиксированного дохода снижается на 8%.'
    },
    en: {
      term: 'Inflation',
      definition: 'A general and progressive increase in prices of goods and services over time, resulting in a loss of purchasing power.',
      example: 'Central banks typically set an inflation target around 2% to 4% per year.'
    },
    uz: {
      term: 'Inflyatsiya',
      definition: 'Tovar va xizmatlar umumiy narx darajasining uzoq muddatli va barqaror oʻsishi, buning oqibatida pulning xarid qobiliyati pasayishi.',
      example: 'Yillik inflyatsiya 8% boʻlsa, oʻsha pulga avvalgidan kamroq mahsulot xarid qilinadi.'
    }
  },
  {
    id: 't_opp_cost',
    category: 'micro',
    dateAdded: '2026-10-01T10:10:00.000Z',
    ru: {
      term: 'Альтернативные издержки',
      definition: 'Польза или выгода от наилучшей из упущенных альтернатив при совершении выбора между несколькими взаимоисключающими вариантами.',
      example: 'Поступая в университет, студент теряет зарплату, которую мог бы заработать за эти годы на работе.'
    },
    en: {
      term: 'Opportunity Cost',
      definition: 'The loss of potential gain from other alternatives when one alternative is chosen.',
      example: 'Choosing to spend $1,000 on vacation means giving up the investment returns that $1,000 could have generated.'
    },
    uz: {
      term: 'Muqobil xarajatlar',
      definition: 'Biror qaror qabul qilinganda eng yaxshi boy berilgan ikkinchi imkoniyatdan olinishi mumkin boʻlgan samara yoki foyda.',
      example: 'Universitetda oʻqishni tanlagan talaba shu yillarda ishlashi mumkin boʻlgan oylik maoshidan voz kechadi.'
    }
  },
  {
    id: 't_elasticity',
    category: 'micro',
    dateAdded: '2026-10-01T10:15:00.000Z',
    ru: {
      term: 'Эластичность спроса по цене',
      definition: 'Показатель чувствительности объёма спроса к изменению цены товара, выражаемый в процентном соотношении.',
      example: 'Товары первой необходимости (лекарства, хлеб) имеют неэластичный спрос: рост цены мало снижает спрос.'
    },
    en: {
      term: 'Price Elasticity of Demand',
      definition: 'A measurement of the change in consumption of a product in relation to a change in its price.',
      example: 'If a 10% price increase leads to a 20% drop in quantity demanded, elasticity is -2 (elastic).'
    },
    uz: {
      term: 'Talabning narx elastikligi',
      definition: 'Tovar narxi oʻzgarganda unga boʻlgan talab hajmining qanchalik oʻzgarishini koʻrsatuvchi sezgirlik koʻrsatkichi.',
      example: 'Birinchi ehtiyoj mollari noelastik talabga ega: narx oshsa ham talab deyarli kamaymaydi.'
    }
  },
  {
    id: 't_liquidity',
    category: 'finance',
    dateAdded: '2026-10-01T10:20:00.000Z',
    ru: {
      term: 'Ликвидность',
      definition: 'Способность актива быстро и без существенных потерь в стоимости быть обращённым в наличные деньги.',
      example: 'Наличные деньги абсолютно ликвидны, а недвижимость требует времени на продажу и менее ликвидна.'
    },
    en: {
      term: 'Liquidity',
      definition: 'The ease with which an asset or security can be converted into ready cash without affecting its market price.',
      example: 'Cash and government treasury bills possess high liquidity, whereas commercial real estate is illiquid.'
    },
    uz: {
      term: 'Likvidlilik',
      definition: 'Aktivning oʻz bozor narxini sezilarli darajada yoʻqotmasdan tezda naqd pulga aylana olish qobiliyati.',
      example: 'Naqd pul mutlaq likvid hisoblanadi, koʻchmas mulk esa tez sotilmaydi va likvidligi past.'
    }
  },
  {
    id: 't_key_rate',
    category: 'finance',
    dateAdded: '2026-10-01T10:25:00.000Z',
    ru: {
      term: 'Ключевая ставка',
      definition: 'Процентная ставка, под которую центральный банк выдаёт кредиты коммерческим банкам и принимает от них деньги на депозиты.',
      example: 'Повышение ставки сдерживает инфляцию, но делает кредиты для бизнеса и граждан дороже.'
    },
    en: {
      term: 'Key Interest Rate',
      definition: 'The interest rate that a central bank charges commercial banks for loans, serving as a benchmark for borrowing costs across the economy.',
      example: 'Raising the rate cools down an overheated economy and slows inflation.'
    },
    uz: {
      term: 'Markaziy bank asosiy stavkasi',
      definition: 'Markaziy bank tomonidan tijorat banklariga kredit berish va ulardan depozit qabul qilish uchun belgilanadigan foiz stavkasi.',
      example: 'Stavkaning oshirilishi inflyatsiyani jilovlaydi, biroq biznes va aholi uchun kreditlarni qimmatlashtiradi.'
    }
  },
  {
    id: 't_regression',
    category: 'econometrics',
    dateAdded: '2026-10-01T10:30:00.000Z',
    ru: {
      term: 'Регрессионный анализ',
      definition: 'Статистический метод моделирования зависимости между зависимой переменной и одной или несколькими независимыми переменными (предикторами).',
      example: 'Метод наименьших квадратов (МНК) минимизирует сумму квадратов остатков: Y = β0 + β1*X + ε.'
    },
    en: {
      term: 'Regression Analysis',
      definition: 'A set of statistical processes for estimating the relationships between a dependent variable and one or more independent variables.',
      example: 'Ordinary Least Squares (OLS) formula: Y = β0 + β1*X + ε.'
    },
    uz: {
      term: 'Regressiya tahlili',
      definition: 'Bogʻliq oʻzgaruvchi bilan bir yoki bir nechta erkli oʻzgaruvchilar (omillar) orasidagi bogʻliqlikni modellashtirishning statistik usuli.',
      example: 'Eng kichik kvadratlar usuli (OLS): Y = β0 + β1*X + ε.'
    }
  },
  {
    id: 't_pvalue',
    category: 'econometrics',
    dateAdded: '2026-10-01T10:35:00.000Z',
    ru: {
      term: 'p-значение (p-value)',
      definition: 'Вероятность получить наблюдаемое или более экстремальное значение статистики при условии, что нулевая гипотеза верна.',
      example: 'Если p < 0.05, нулевая гипотеза отвергается, и результат признаётся статистически значимым.'
    },
    en: {
      term: 'p-value',
      definition: 'The probability of obtaining test results at least as extreme as the observed results, assuming that the null hypothesis is correct.',
      example: 'A p-value < 0.05 indicates statistical significance, leading to rejection of the null hypothesis.'
    },
    uz: {
      term: 'p-qiymat (p-value)',
      definition: 'Nol gipotezasi toʻgʻri boʻlgan sharoitda kuzatilgan yoki undan ham keskinroq natijani olish ehtimolligi.',
      example: 'Agar p < 0.05 boʻlsa, nol gipoteza rad etiladi va natija statistik ahamiyatli hisoblanadi.'
    }
  },
  {
    id: 't_comp_adv',
    category: 'international',
    dateAdded: '2026-10-01T10:40:00.000Z',
    ru: {
      term: 'Сравнительное преимущество',
      definition: 'Способность страны или производителя производить товар или услугу с более низкими альтернативными издержками, чем другие.',
      example: 'Теория Давида Рикардо показывает, что международная торговля выгодна обеим странам при специализации на сравнительных преимуществах.'
    },
    en: {
      term: 'Comparative Advantage',
      definition: 'An economy’s ability to produce a particular good or service at a lower opportunity cost than its trading partners.',
      example: 'Formulated by David Ricardo, demonstrating that countries mutually gain from trade by specializing.'
    },
    uz: {
      term: 'Qiyosiy ustunlik',
      definition: 'Mamlakat yoki ishlab chiqaruvchining biror tovarni boshqa hamkorlariga nisbatan pastroq muqobil xarajatlar bilan ishlab chiqarish qobiliyati.',
      example: 'Devid Rikardo nazariyasiga koʻra, davlatlar oʻz qiyosiy ustunliklariga ixtisoslashganda xalqaro savdodan manfaat koʻradi.'
    }
  },
  {
    id: 't_trade_balance',
    category: 'international',
    dateAdded: '2026-10-01T10:45:00.000Z',
    ru: {
      term: 'Торговый баланс',
      definition: 'Разница между стоимостью экспорта и импорта товаров и услуг страны за определённый период времени.',
      example: 'Если экспорт превышает импорт, сальдо положительное (профицит), если наоборот — дефицит (NX = X - M).'
    },
    en: {
      term: 'Balance of Trade',
      definition: 'The difference between the value of a country’s exports and imports for a given period.',
      example: 'Net Exports formula: NX = Exports - Imports. A positive balance is a trade surplus; negative is a trade deficit.'
    },
    uz: {
      term: 'Savdo balansi',
      definition: 'Muayyan vaqt davomida mamlakat tovar va xizmatlari eksporti va importi qiymati oʻrtasidagi tafovut (saldo).',
      example: 'Eksport importdan koʻp boʻlsa — ijobiy saldo (profitsit), aksincha boʻlsa — defitsit (NX = Eksport - Import).'
    }
  }
];

// 4. ОПРЕДЕЛЕНИЕ ЯЗЫКА ПО УМОЛЧАНИЮ (ИЗ БРАУЗЕРА ИЛИ LOCALSTORAGE)
function detectUserLanguage() {
  const saved = localStorage.getItem('econ_lang');
  if (saved && ['ru', 'en', 'uz'].includes(saved)) return saved;

  const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (browser.startsWith('ru') || browser.startsWith('be') || browser.startsWith('uk')) return 'ru';
  if (browser.startsWith('uz')) return 'uz';
  return 'en'; // По умолчанию для остальных — международный английский
}

// 5. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
let terms = [];
let currentLang = detectUserLanguage();
let currentCategory = 'all';
let searchQuery = '';
let isAuthor = false;
let editingTermId = null;

// Состояние тренажёра карточек
let quizCards = [];
let quizCurrentIndex = 0;

// 6. ССЫЛКИ НА ЭЛЕМЕНТЫ DOM
const elements = {
  appTitle: document.getElementById('appTitle'),
  appSub: document.getElementById('appSub'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  langSwitch: document.getElementById('langSwitch'),

  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  categoryFilter: document.getElementById('categoryFilter'),

  alphabetRail: document.getElementById('alphabetRail'),
  termsList: document.getElementById('termsList'),
  emptyState: document.getElementById('emptyState'),
  emptyTitle: document.getElementById('emptyTitle'),
  emptyDesc: document.getElementById('emptyDesc'),
  totalCount: document.getElementById('totalCount'),
  filteredStats: document.getElementById('filteredStats'),

  termDialog: document.getElementById('termDialog'),
  termDialogTitle: document.getElementById('termDialogTitle'),
  termForm: document.getElementById('termForm'),
  openAddBtn: document.getElementById('openAddBtn'),
  closeTermDialogBtn: document.getElementById('closeTermDialogBtn'),
  cancelTermBtn: document.getElementById('cancelTermBtn'),
  saveTermBtn: document.getElementById('saveTermBtn'),
  formLangTabs: document.getElementById('formLangTabs'),

  authorBtn: document.getElementById('authorBtn'),
  authorStatusBadge: document.getElementById('authorStatusBadge'),
  authorLogoutBtn: document.getElementById('authorLogoutBtn'),
  authorDialog: document.getElementById('authorDialog'),
  authorPassInput: document.getElementById('authorPassInput'),
  authorPassError: document.getElementById('authorPassError'),
  loginAuthorBtn: document.getElementById('loginAuthorBtn'),
  cancelAuthorBtn: document.getElementById('cancelAuthorBtn'),
  closeAuthorDialogBtn: document.getElementById('closeAuthorDialogBtn'),

  quizBtn: document.getElementById('quizBtn'),
  quizDialog: document.getElementById('quizDialog'),
  closeQuizDialogBtn: document.getElementById('closeQuizDialogBtn'),
  quizProgress: document.getElementById('quizProgress'),
  flashcardBox: document.getElementById('flashcardBox'),
  flashcardInner: document.getElementById('flashcardInner'),
  quizCardTitle: document.getElementById('quizCardTitle'),
  quizCardCategory: document.getElementById('quizCardCategory'),
  quizCardDef: document.getElementById('quizCardDef'),
  quizCardEx: document.getElementById('quizCardEx'),
  quizPrevBtn: document.getElementById('quizPrevBtn'),
  quizFlipBtn: document.getElementById('quizFlipBtn'),
  quizNextBtn: document.getElementById('quizNextBtn'),

  exportBtn: document.getElementById('exportBtn'),
  importInput: document.getElementById('importInput'),
  toastMessage: document.getElementById('toastMessage')
};

// 7. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И ЗАЩИТА (XSS)
function t() {
  return I18N[currentLang] || I18N.ru;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function generateId() {
  return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}

function showToast(text) {
  elements.toastMessage.textContent = text;
  elements.toastMessage.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    elements.toastMessage.classList.remove('show');
  }, 2300);
}

// Извлекаем контент карточки для активного языка (с мягким fallback при отсутствии)
function getCardContent(termObj, lang) {
  const target = termObj[lang];
  if (target && target.term && target.term.trim()) {
    return { lang, data: target, isFallback: false };
  }
  // Порядок поиска запасного варианта
  const fallbackOrder = lang === 'en' ? ['ru', 'uz'] : (lang === 'uz' ? ['ru', 'en'] : ['en', 'uz']);
  for (const fb of fallbackOrder) {
    if (termObj[fb] && termObj[fb].term && termObj[fb].term.trim()) {
      return { lang: fb, data: termObj[fb], isFallback: true };
    }
  }
  return { lang: 'en', data: termObj.en || termObj.ru || {}, isFallback: true };
}

// 8. ЗАГРУЗКА И СОХРАНЕНИЕ ДАННЫХ (LOCALSTORAGE)
function loadTerms() {
  try {
    const raw = localStorage.getItem('econ_terms');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        terms = parsed;
        return;
      }
    }
  } catch (e) {
    console.error('Ошибка загрузки терминов из localStorage:', e);
  }
  // Если данных ещё нет — загружаем стартовый набор
  terms = JSON.parse(JSON.stringify(STARTER_TERMS));
  saveTerms();
}

function saveTerms() {
  try {
    localStorage.setItem('econ_terms', JSON.stringify(terms));
  } catch (e) {
    console.error('Ошибка сохранения терминов:', e);
  }
}

// 9. ФИЛЬТРАЦИЯ И СОРТИРОВКА
function getFilteredTerms() {
  const q = searchQuery.trim().toLowerCase();

  return terms.filter(item => {
    // 1. Фильтр по категории
    if (currentCategory !== 'all' && item.category !== currentCategory) {
      return false;
    }
    // 2. Фильтр по поисковому запросу во всех 3 языках
    if (q) {
      const matchInRu = item.ru && ((item.ru.term || '').toLowerCase().includes(q) || (item.ru.definition || '').toLowerCase().includes(q));
      const matchInEn = item.en && ((item.en.term || '').toLowerCase().includes(q) || (item.en.definition || '').toLowerCase().includes(q));
      const matchInUz = item.uz && ((item.uz.term || '').toLowerCase().includes(q) || (item.uz.definition || '').toLowerCase().includes(q));
      if (!matchInRu && !matchInEn && !matchInUz) return false;
    }
    return true;
  }).sort((a, b) => {
    const nameA = (getCardContent(a, currentLang).data.term || '').trim();
    const nameB = (getCardContent(b, currentLang).data.term || '').trim();
    return nameA.localeCompare(nameB, currentLang);
  });
}

// 10. ОТРИСОВКА ИНТЕРФЕЙСА (RENDER)
function renderStaticTexts() {
  const tr = t();
  elements.appTitle.textContent = tr.appTitle;
  elements.appSub.textContent = tr.appSub;
  elements.searchInput.placeholder = tr.searchPh;
  elements.emptyTitle.textContent = tr.emptyTitle;
  elements.emptyDesc.textContent = tr.emptyDesc;

  // Кнопка тренажёра и экспорта
  const quizText = elements.quizBtn.querySelector('.btn-text');
  if (quizText) quizText.textContent = tr.quizBtn;

  // Обновление кнопок переключателя языка
  document.querySelectorAll('#langSwitch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  // Обновление категорий-чипсов
  const chips = elements.categoryFilter.querySelectorAll('.category-chip');
  chips.forEach(chip => {
    const cat = chip.dataset.category;
    const labelSpan = chip.querySelector('span:last-child');
    if (labelSpan) {
      labelSpan.textContent = cat === 'all' ? tr.allCategories : tr.categories[cat];
    }
    chip.classList.toggle('active', cat === currentCategory);
  });
}

function renderAlphabet(visibleTerms) {
  const alphabet = currentLang === 'ru' ? RU_ALPHABET : LAT_ALPHABET;
  const counts = {};

  visibleTerms.forEach(item => {
    const termName = (getCardContent(item, currentLang).data.term || '').trim();
    const firstLetter = termName.charAt(0).toLocaleUpperCase(currentLang === 'ru' ? 'ru-RU' : 'en-US');
    if (firstLetter) {
      counts[firstLetter] = (counts[firstLetter] || 0) + 1;
    }
  });

  elements.alphabetRail.innerHTML = alphabet.map(letter => {
    const count = counts[letter] || 0;
    const has = count > 0;
    return `
      <button 
        type="button" 
        class="rail-letter ${has ? 'active' : ''}" 
        data-letter="${letter}"
        ${has ? '' : 'tabindex="-1" aria-disabled="true"'}
        title="${letter}${has ? ' (' + count + ')' : ''}"
      >
        ${letter}
      </button>
    `;
  }).join('');
}

function renderTerms() {
  const tr = t();
  const visible = getFilteredTerms();

  // Статистика
  elements.totalCount.textContent = terms.length;
  if (searchQuery || currentCategory !== 'all') {
    elements.filteredStats.textContent = ` · ${tr.foundStats}${visible.length}`;
  } else {
    elements.filteredStats.textContent = '';
  }

  // Обновление алфавитной полосы
  renderAlphabet(visible);

  // Пустое состояние
  if (terms.length === 0) {
    elements.emptyState.classList.remove('hidden');
    elements.emptyTitle.textContent = tr.emptyTitle;
    elements.emptyDesc.textContent = tr.emptyDesc;
    elements.termsList.innerHTML = '';
    return;
  }

  if (visible.length === 0) {
    elements.emptyState.classList.remove('hidden');
    elements.emptyTitle.textContent = tr.noSearchResults(searchQuery || tr.categories[currentCategory]);
    elements.emptyDesc.textContent = '';
    elements.termsList.innerHTML = '';
    return;
  }

  elements.emptyState.classList.add('hidden');

  // Группировка по первой букве
  const groups = {};
  visible.forEach(item => {
    const termName = (getCardContent(item, currentLang).data.term || '').trim();
    const firstLetter = termName.charAt(0).toLocaleUpperCase(currentLang === 'ru' ? 'ru-RU' : 'en-US') || '#';
    (groups[firstLetter] = groups[firstLetter] || []).push(item);
  });

  const sortedLetters = Object.keys(groups).sort((a, b) => a.localeCompare(b, currentLang));

  elements.termsList.innerHTML = sortedLetters.map(letter => {
    const cardsHtml = groups[letter].map(createTermCardHtml).join('');
    return `
      <section class="letter-section" id="letter-${letter}">
        <div class="letter-heading">
          <span>${letter}</span>
          <span class="letter-count-badge">${groups[letter].length}</span>
        </div>
        <div class="terms-cards-grid">
          ${cardsHtml}
        </div>
      </section>
    `;
  }).join('');
}

function createTermCardHtml(item) {
  const tr = t();
  const { lang, data, isFallback } = getCardContent(item, currentLang);
  const categoryLabel = item.category ? (tr.categories[item.category] || item.category) : '';
  const fallbackBadge = isFallback ? `<span class="card-lang-badge">${lang.toUpperCase()}</span>` : '';

  return `
    <article class="term-card" data-id="${item.id}">
      <div class="card-top">
        <div class="card-title-group">
          <h3 class="card-term-title">${escapeHtml(data.term)}</h3>
          <div class="card-badge-row">
            ${categoryLabel ? `<span class="category-tag cat-${escapeHtml(item.category)}">${escapeHtml(categoryLabel)}</span>` : ''}
            ${fallbackBadge}
          </div>
        </div>

        ${isAuthor ? `
        <div class="card-actions">
          <button type="button" class="action-icon-btn edit-term-btn" title="${tr.edit}" aria-label="${tr.edit}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </button>
          <button type="button" class="action-icon-btn danger delete-term-btn" title="${tr.delete}" aria-label="${tr.delete}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18"/>
              <path d="M8 6V4h8v2"/>
              <path d="M19 6l-1 14H6L5 6"/>
            </svg>
          </button>
        </div>` : ''}
      </div>

      <p class="card-definition">${escapeHtml(data.definition)}</p>

      ${data.example ? `
      <div class="card-example">
        ${escapeHtml(data.example)}
      </div>` : ''}
    </article>
  `;
}

function renderAll() {
  renderStaticTexts();
  renderTerms();
}

// 11. ФОРМА СОЗДАНИЯ И РЕДАКТИРОВАНИЯ (МОДАЛЬНОЕ ОКНО ДЛЯ АВТОРА)
function openTermModal(termToEdit = null) {
  const tr = t();
  editingTermId = termToEdit ? termToEdit.id : null;
  elements.termDialogTitle.textContent = termToEdit ? tr.edit : tr.addTermBtn;

  ['ru', 'en', 'uz'].forEach(l => {
    const src = (termToEdit && termToEdit[l]) ? termToEdit[l] : {};
    const cap = l.charAt(0).toUpperCase() + l.slice(1);
    const inputTerm = document.getElementById('inputTerm' + cap);
    const inputDef = document.getElementById('inputDef' + cap);
    const inputEx = document.getElementById('inputEx' + cap);

    if (inputTerm) inputTerm.value = src.term || '';
    if (inputDef) inputDef.value = src.definition || '';
    if (inputEx) inputEx.value = src.example || '';
  });

  const selectCat = document.getElementById('inputCategory');
  if (selectCat) selectCat.value = termToEdit ? termToEdit.category : 'macro';

  // Сброс ошибок валидации
  document.getElementById('groupTermRu').classList.remove('has-error');
  document.getElementById('groupDefRu').classList.remove('has-error');

  // Переключение на вкладку текущего языка или RU
  switchFormPane('ru');
  elements.termDialog.showModal();

  setTimeout(() => {
    const focusEl = document.getElementById('inputTermRu');
    if (focusEl) focusEl.focus();
  }, 50);
}

function closeTermModal() {
  elements.termDialog.close();
  elements.termForm.reset();
  editingTermId = null;
}

function switchFormPane(targetPane) {
  elements.formLangTabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === targetPane);
  });
  elements.termForm.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.dataset.pane === targetPane);
  });
}

function handleTermSubmit(e) {
  e.preventDefault();
  const tr = t();

  const termRu = (document.getElementById('inputTermRu').value || '').trim();
  const defRu = (document.getElementById('inputDefRu').value || '').trim();

  const isRuTermValid = !!termRu;
  const isRuDefValid = !!defRu;

  document.getElementById('groupTermRu').classList.toggle('has-error', !isRuTermValid);
  document.getElementById('groupDefRu').classList.toggle('has-error', !isRuDefValid);

  if (!isRuTermValid || !isRuDefValid) {
    switchFormPane('ru');
    return;
  }

  const payload = {
    category: document.getElementById('inputCategory').value || 'other',
    ru: {
      term: termRu,
      definition: defRu,
      example: (document.getElementById('inputExRu').value || '').trim()
    },
    en: {
      term: (document.getElementById('inputTermEn').value || '').trim(),
      definition: (document.getElementById('inputDefEn').value || '').trim(),
      example: (document.getElementById('inputExEn').value || '').trim()
    },
    uz: {
      term: (document.getElementById('inputTermUz').value || '').trim(),
      definition: (document.getElementById('inputDefUz').value || '').trim(),
      example: (document.getElementById('inputExUz').value || '').trim()
    }
  };

  if (editingTermId) {
    const idx = terms.findIndex(x => x.id === editingTermId);
    if (idx > -1) {
      terms[idx] = { ...terms[idx], ...payload, dateModified: new Date().toISOString() };
    }
  } else {
    terms.unshift({
      id: generateId(),
      ...payload,
      dateAdded: new Date().toISOString()
    });
  }

  saveTerms();
  closeTermModal();
  renderAll();
  showToast(tr.savedToast);
}

// 12. ТРЕНАЖЁР ФЛЕШ-КАРТОЧЕК (FLASHCARD 3D FLIP)
function openQuizModal() {
  const visible = getFilteredTerms();
  quizCards = visible.length > 0 ? [...visible] : [...terms];

  if (quizCards.length === 0) {
    showToast(t().emptyTitle);
    return;
  }

  // Перемешиваем карточки для лучшей тренировки памяти
  quizCards.sort(() => Math.random() - 0.5);
  quizCurrentIndex = 0;
  elements.flashcardInner.classList.remove('flipped');
  updateQuizCardView();
  elements.quizDialog.showModal();
}

function updateQuizCardView() {
  const tr = t();
  if (quizCards.length === 0) return;

  const current = quizCards[quizCurrentIndex];
  const { data } = getCardContent(current, currentLang);

  elements.quizProgress.textContent = tr.quizCardProgress(quizCurrentIndex + 1, quizCards.length);
  elements.quizCardTitle.textContent = data.term || '—';
  elements.quizCardCategory.textContent = tr.categories[current.category] || current.category;
  elements.quizCardDef.textContent = data.definition || '—';
  elements.quizCardEx.textContent = data.example || '';
  elements.quizCardEx.style.display = data.example ? 'block' : 'none';

  // Состояние кнопок Назад / Далее
  elements.quizPrevBtn.disabled = quizCurrentIndex === 0;
  elements.quizNextBtn.disabled = quizCurrentIndex === quizCards.length - 1;
}

function flipQuizCard() {
  elements.flashcardInner.classList.toggle('flipped');
}

function nextQuizCard() {
  if (quizCurrentIndex < quizCards.length - 1) {
    quizCurrentIndex++;
    elements.flashcardInner.classList.remove('flipped');
    updateQuizCardView();
  }
}

function prevQuizCard() {
  if (quizCurrentIndex > 0) {
    quizCurrentIndex--;
    elements.flashcardInner.classList.remove('flipped');
    updateQuizCardView();
  }
}

// 13. ЭКСПОРТ И ИМПОРТ JSON
function exportTermsToJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(terms, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `economics_terms_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function handleImportFile(e) {
  const tr = t();
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Проверяем структуру хотя бы первого элемента
        if (parsed[0].ru || parsed[0].en || parsed[0].category) {
          terms = parsed;
          saveTerms();
          renderAll();
          showToast(tr.importedSuccess(parsed.length));
        } else {
          showToast(tr.importedError);
        }
      } else {
        showToast(tr.importedError);
      }
    } catch (err) {
      showToast(tr.importedError);
    }
    elements.importInput.value = '';
  };
  reader.readAsText(file);
}

// 14. СЕКРЕТНЫЙ РЕЖИМ АВТОРА
function openAuthorModal() {
  elements.authorDialog.showModal();
  elements.authorPassInput.value = '';
  elements.authorPassError.style.display = 'none';
  elements.authorPassInput.focus();
}

function closeAuthorModal() {
  elements.authorDialog.close();
}

function handleAuthorLogin() {
  const tr = t();
  if (elements.authorPassInput.value === PASSCODE) {
    isAuthor = true;
    closeAuthorModal();
    updateAuthorState();
    showToast(tr.authorWelcome);
  } else {
    elements.authorPassError.style.display = 'block';
  }
}

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
  renderTerms();
}

// 15. СЛУШАТЕЛИ СОБЫТИЙ (EVENT LISTENERS)
function initEventListeners() {
  // Переключение языка (RU / EN / UZ)
  elements.langSwitch.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || !btn.dataset.lang) return;
    currentLang = btn.dataset.lang;
    localStorage.setItem('econ_lang', currentLang);
    renderAll();
  });

  // Переключение темы (День / Ночь)
  elements.themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('econ_theme', newTheme);
    showToast(newTheme === 'dark' ? t().themeDark : t().themeLight);
  });

  // Поиск
  elements.searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    elements.searchClearBtn.classList.toggle('hidden', !searchQuery);
    renderTerms();
  });

  elements.searchClearBtn.addEventListener('click', () => {
    searchQuery = '';
    elements.searchInput.value = '';
    elements.searchClearBtn.classList.add('hidden');
    elements.searchInput.focus();
    renderTerms();
  });

  // Фильтр категорий
  elements.categoryFilter.addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;
    currentCategory = chip.dataset.category;
    elements.categoryFilter.querySelectorAll('.category-chip').forEach(c => {
      c.classList.toggle('active', c === chip);
    });
    renderTerms();
  });

  // Клик по букве в алфавитном навигаторе
  elements.alphabetRail.addEventListener('click', (e) => {
    const btn = e.target.closest('.rail-letter.active');
    if (!btn) return;
    const letter = btn.dataset.letter;
    const targetEl = document.getElementById('letter-' + letter);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Клик по карточкам (Редактирование / Удаление для автора)
  elements.termsList.addEventListener('click', (e) => {
    const card = e.target.closest('.term-card');
    if (!card) return;
    const termId = card.dataset.id;
    const termObj = terms.find(t => t.id === termId);
    if (!termObj) return;

    if (e.target.closest('.edit-term-btn') && isAuthor) {
      openTermModal(termObj);
      return;
    }

    if (e.target.closest('.delete-term-btn') && isAuthor) {
      const { data } = getCardContent(termObj, currentLang);
      if (confirm(t().confirmDelete(data.term))) {
        terms = terms.filter(t => t.id !== termId);
        saveTerms();
        renderAll();
        showToast(t().deletedToast);
      }
      return;
    }
  });

  // Модалка термина
  elements.openAddBtn.addEventListener('click', () => openTermModal(null));
  elements.closeTermDialogBtn.addEventListener('click', closeTermModal);
  elements.cancelTermBtn.addEventListener('click', closeTermModal);
  elements.termForm.addEventListener('submit', handleTermSubmit);

  elements.formLangTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (btn && btn.dataset.tab) {
      switchFormPane(btn.dataset.tab);
    }
  });

  // Тренажёр флеш-карточек
  elements.quizBtn.addEventListener('click', openQuizModal);
  elements.closeQuizDialogBtn.addEventListener('click', () => elements.quizDialog.close());
  elements.flashcardBox.addEventListener('click', flipQuizCard);
  elements.quizFlipBtn.addEventListener('click', flipQuizCard);
  elements.quizNextBtn.addEventListener('click', nextQuizCard);
  elements.quizPrevBtn.addEventListener('click', prevQuizCard);

  // Экспорт и импорт
  elements.exportBtn.addEventListener('click', exportTermsToJson);
  elements.importInput.addEventListener('change', handleImportFile);

  // Секретный вход автора (клик по замочку, даблклик по логотипу, Ctrl+Shift+A)
  elements.authorBtn.addEventListener('click', openAuthorModal);
  const brandIcon = document.getElementById('brandIcon');
  if (brandIcon) brandIcon.addEventListener('dblclick', openAuthorModal);

  elements.closeAuthorDialogBtn.addEventListener('click', closeAuthorModal);
  elements.cancelAuthorBtn.addEventListener('click', closeAuthorModal);
  elements.loginAuthorBtn.addEventListener('click', handleAuthorLogin);
  elements.authorPassInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAuthorLogin();
  });

  elements.authorLogoutBtn.addEventListener('click', () => {
    isAuthor = false;
    updateAuthorState();
    showToast(t().authorLeft);
  });

  // Глобальные горячие клавиши
  window.addEventListener('keydown', (e) => {
    // Фокус на поиск по "/"
    if (e.key === '/' && document.activeElement !== elements.searchInput && !elements.termDialog.open && !elements.quizDialog.open) {
      e.preventDefault();
      elements.searchInput.focus();
    }
    // Секретный вызов автора по Ctrl + Shift + A
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      openAuthorModal();
    }
    // Пробел для переворота флеш-карточки
    if (e.code === 'Space' && elements.quizDialog.open && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault();
      flipQuizCard();
    }
  });
}

// 16. СТАРТ ПРИЛОЖЕНИЯ
function initApp() {
  loadTerms();
  initEventListeners();
  renderAll();
  console.log('Словарь экономиста успешно запущен! Язык:', currentLang);
}

document.addEventListener('DOMContentLoaded', initApp);
// На случай, если скрипт выполнился после загрузки DOM
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initApp();
}
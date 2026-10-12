export const STARTER_TERMS = [
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

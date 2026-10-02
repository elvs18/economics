(function(){

  /* ============================================================
     КОД-ПАРОЛЬ АВТОРА
     Поменяй на свой до того, как поделишься ссылкой с кем-либо.
     Это просто фильтр от случайных правок чужими людьми, а не
     настоящая защита — код виден в исходнике страницы.
     ============================================================ */
  const OWNER_PASSCODE = "moh-econ-2026";

  const RU_ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
  const LAT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const CATEGORY_KEYS = ['micro','macro','finance','econometrics','international','other'];

  const T = {
    ru: {
      appTitle:'Словарь экономиста', appSub:'учебный словарь экономических терминов',
      addBtn:'+ Добавить термин', searchPh:'Найти термин или слово в определении…',
      statsEmpty:'В словаре пока пусто', statsTotal:n=>`Всего терминов: ${n}`, statsFound:n=>` · найдено: ${n}`,
      emptyOwnerText:'Пока нет ни одного термина. Нажмите «Добавить термин» — и начните свой словарь.',
      emptyGuestText:'Терминов пока нет — загляните позже.',
      noResults:q=>`Ничего не найдено по запросу «${q}».`,
      formTitleNew:'Новая карточка', formTitleEdit:'Изменить карточку',
      labelTerm:'Термин', labelDef:'Определение', labelEx:'Пример или заметка (необязательно)',
      labelCategory:'Раздел', errorTerm:'Введите термин на русском.', errorDef:'Добавьте определение на русском.',
      cancel:'Отмена', save:'Сохранить', edit:'Изменить', del:'Удалить',
      confirmQ:t=>`Удалить «${t}»?`, confirmYes:'Да, удалить', confirmNo:'Отмена',
      saved:'Сохранено', deleted:'Удалено',
      ownerLogin:'Я — автор', ownerPh:'Код доступа', ownerEnter:'Войти', ownerWrong:'Неверный код',
      ownerLogged:'Автор: вы', ownerLogout:'выйти',
      categories:{ micro:'Микроэкономика', macro:'Макроэкономика', finance:'Финансы', econometrics:'Эконометрика', international:'Международная экономика', other:'Другое' }
    },
    en: {
      appTitle:'Economics Dictionary', appSub:'a study glossary of economic terms',
      addBtn:'+ Add term', searchPh:'Search a term or a word in its definition…',
      statsEmpty:'The dictionary is empty for now', statsTotal:n=>`Total terms: ${n}`, statsFound:n=>` · found: ${n}`,
      emptyOwnerText:'No terms yet. Tap “Add term” to start your dictionary.',
      emptyGuestText:'No terms yet — check back later.',
      noResults:q=>`No results for “${q}”.`,
      formTitleNew:'New card', formTitleEdit:'Edit card',
      labelTerm:'Term', labelDef:'Definition', labelEx:'Example or note (optional)',
      labelCategory:'Section', errorTerm:'Enter a term in Russian.', errorDef:'Add a definition in Russian.',
      cancel:'Cancel', save:'Save', edit:'Edit', del:'Delete',
      confirmQ:t=>`Delete “${t}”?`, confirmYes:'Yes, delete', confirmNo:'Cancel',
      saved:'Saved', deleted:'Deleted',
      ownerLogin:'I\u2019m the author', ownerPh:'Passcode', ownerEnter:'Log in', ownerWrong:'Wrong passcode',
      ownerLogged:'Author: you', ownerLogout:'log out',
      categories:{ micro:'Microeconomics', macro:'Macroeconomics', finance:'Finance', econometrics:'Econometrics', international:'International economics', other:'Other' }
    },
    uz: {
      appTitle:'Iqtisodiyot lugʻati', appSub:'iqtisodiy atamalar oʻquv lugʻati',
      addBtn:'+ Atama qoʻshish', searchPh:'Atama yoki taʼrifdagi soʻzni qidiring…',
      statsEmpty:'Lugʻat hozircha boʻsh', statsTotal:n=>`Jami atamalar: ${n}`, statsFound:n=>` · topildi: ${n}`,
      emptyOwnerText:'Hali birorta atama yoʻq. “Atama qoʻshish”ni bosib, lugʻatingizni boshlang.',
      emptyGuestText:'Hali atamalar yoʻq — keyinroq qaytib koʻring.',
      noResults:q=>`“${q}” boʻyicha hech narsa topilmadi.`,
      formTitleNew:'Yangi karta', formTitleEdit:'Kartani tahrirlash',
      labelTerm:'Atama', labelDef:'Taʼrif', labelEx:'Misol yoki izoh (ixtiyoriy)',
      labelCategory:'Boʻlim', errorTerm:'Rus tilida atamani kiriting.', errorDef:'Rus tilida taʼrif qoʻshing.',
      cancel:'Bekor qilish', save:'Saqlash', edit:'Tahrirlash', del:'Oʻchirish',
      confirmQ:t=>`“${t}”ni oʻchirasizmi?`, confirmYes:'Ha, oʻchirish', confirmNo:'Bekor qilish',
      saved:'Saqlandi', deleted:'Oʻchirildi',
      ownerLogin:'Men — muallifman', ownerPh:'Kirish kodi', ownerEnter:'Kirish', ownerWrong:'Notoʻgʻri kod',
      ownerLogged:'Muallif: siz', ownerLogout:'chiqish',
      categories:{ micro:'Mikroiqtisodiyot', macro:'Makroiqtisodiyot', finance:'Moliya', econometrics:'Ekonometrika', international:'Xalqaro iqtisodiyot', other:'Boshqa' }
    }
  };

  /* ============================================================
     СОСТОЯНИЕ ПРИЛОЖЕНИЯ
     Пока без бэкенда: termы и настройки живут только в памяти
     вкладки браузера и пропадают при перезагрузке страницы.
     Когда появится свой API (Flask + база данных), эти переменные
     нужно будет наполнять из ответа сервера — см. TODO ниже.
     ============================================================ */
  let terms = [];
  let currentLang = 'ru';
  let isOwner = false;
  let editingId = null;
  let confirmDeleteId = null;
  let searchQuery = '';
  let formActivePane = 'ru';
  let ownerLoginOpen = false;

  const $ = (sel) => document.querySelector(sel);
  const listEl = $('#list');
  const railEl = $('#rail');
  const statsEl = $('#statsLine');
  const overlay = $('#modalOverlay');
  const form = $('#termForm');
  const saveFlag = $('#saveFlag');
  const ownerArea = $('#ownerArea');

  function tr(){ return T[currentLang]; }

  function escapeHtml(str){
    return String(str || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function uid(){ return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); }
  function flag(message, isError){
    saveFlag.textContent = message;
    saveFlag.classList.toggle('error', !!isError);
    saveFlag.classList.add('show');
    clearTimeout(flag._t);
    flag._t = setTimeout(() => saveFlag.classList.remove('show'), 1800);
  }

  /* ============================================================
     ХРАНЕНИЕ ДАННЫХ — ЗАГЛУШКИ
     Сюда позже встанут реальные запросы к твоему API.
     ============================================================ */
  async function loadAll(){
    // TODO: запрос к своему API, например:
    //   const res = await fetch('https://мой-api.ру/terms');
    //   terms = await res.json();
    // Пока словарь начинается пустым при каждой загрузке страницы.
    renderStatic();
    render();
  }

  async function persistTerms(){
    // TODO: отправка терминов на сервер, например:
    //   await fetch('https://мой-api.ру/terms', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(terms)
    //   });
    // Пока изменения сохраняются только в памяти этой вкладки.
  }

  async function persistLang(){
    // TODO: при желании можно сохранять выбор языка в своей базе
    // или хотя бы в localStorage — но это будет видно только тебе.
  }

  async function persistOwner(flagVal){
    // TODO: вход автора пока тоже не сохраняется между перезагрузками.
    // Настоящая защита появится вместе с бэкендом.
  }

  /* ---------- помощники для многоязычного контента ---------- */
  function pickDisplay(t){
    const order = currentLang === 'ru' ? ['ru','en','uz'] : (currentLang === 'en' ? ['en','ru','uz'] : ['uz','ru','en']);
    for(const l of order){
      if(t[l] && t[l].term && t[l].term.trim()) return { lang:l, data:t[l] };
    }
    return { lang:'ru', data:t.ru || {} };
  }
  function firstLetterOf(str){ return (str || '').trim().charAt(0).toLocaleUpperCase('ru-RU'); }

  /* ---------- статический текст интерфейса ---------- */
  function renderStatic(){
    const t = tr();
    $('#appTitle').textContent = t.appTitle;
    $('#appSub').textContent = t.appSub;
    $('#searchInput').placeholder = t.searchPh;
    $('#cancelBtn').textContent = t.cancel;
    $('#submitBtn').textContent = t.save;
    $('#label-category').textContent = t.labelCategory;
    ['ru','en','uz'].forEach(l => {
      $('#label-term-'+l).textContent = t.labelTerm + (l==='ru' ? ' *' : '');
      $('#label-def-'+l).textContent = t.labelDef + (l==='ru' ? ' *' : '');
      $('#label-ex-'+l).textContent = t.labelEx;
    });
    $('#error-term-ru').textContent = t.errorTerm;
    $('#error-def-ru').textContent = t.errorDef;

    const sel = $('#inputCategory');
    sel.innerHTML = CATEGORY_KEYS.map(k => `<option value="${k}">${escapeHtml(t.categories[k])}</option>`).join('');

    document.querySelectorAll('#langSwitch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === currentLang);
    });

    renderOwnerArea();
    mountAddButton();
  }

  function renderOwnerArea(){
    const t = tr();
    if(isOwner){
      ownerArea.innerHTML = `<div class="owner_line">${t.ownerLogged} · <button type="button" id="logoutBtn">${t.ownerLogout}</button></div>`;
      $('#logoutBtn').onclick = async () => {
        isOwner = false;
        await persistOwner('0');
        renderStatic(); render();
      };
    }else if(ownerLoginOpen){
      ownerArea.innerHTML = `
        <div>
          <div class="owner_login">
            <input id="ownerPassInput" type="password" placeholder="${escapeHtml(t.ownerPh)}">
            <button type="button" id="ownerEnterBtn">${t.ownerEnter}</button>
          </div>
          <div class="owner_error" id="ownerErrorMsg">${escapeHtml(t.ownerWrong)}</div>
        </div>`;
      const input = $('#ownerPassInput');
      input.focus();
      const tryLogin = async () => {
        if(input.value === OWNER_PASSCODE){
          isOwner = true; ownerLoginOpen = false;
          await persistOwner('1');
          renderStatic(); render();
        }else{
          $('#ownerErrorMsg').classList.add('show');
        }
      };
      $('#ownerEnterBtn').onclick = tryLogin;
      input.addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); tryLogin(); } });
    }else{
      ownerArea.innerHTML = `<div class="owner_line"><button type="button" id="openOwnerLogin">${t.ownerLogin}</button></div>`;
      $('#openOwnerLogin').onclick = () => { ownerLoginOpen = true; renderOwnerArea(); };
    }
  }

  function mountAddButton(){
    let btn = document.getElementById('openAddBtn');
    if(isOwner && !btn){
      btn = document.createElement('button');
      btn.type = 'button'; btn.id = 'openAddBtn'; btn.className = 'btn_add';
      btn.addEventListener('click', () => openModal(null));
      $('.header_controls').appendChild(btn);
    }
    if(!isOwner && btn){ btn.remove(); }
    if(btn) btn.textContent = tr().addBtn;
  }

  /* ---------- рендер списка ---------- */
  function sortedTerms(list){
    return [...list].sort((a,b) => {
      const da = pickDisplay(a).data.term || '';
      const db = pickDisplay(b).data.term || '';
      return da.localeCompare(db, 'ru');
    });
  }
  function filteredTerms(){
    const q = searchQuery.trim().toLocaleLowerCase('ru-RU');
    if(!q) return sortedTerms(terms);
    const match = (t) => ['ru','en','uz'].some(l => {
      const d = t[l] || {};
      return (d.term||'').toLocaleLowerCase('ru-RU').includes(q) || (d.definition||'').toLocaleLowerCase('ru-RU').includes(q);
    });
    return sortedTerms(terms.filter(match));
  }

  function buildRail(){
    const alphabet = currentLang === 'ru' ? RU_ALPHABET : LAT_ALPHABET;
    const counts = {};
    terms.forEach(t => {
      const letter = firstLetterOf(pickDisplay(t).data.term);
      counts[letter] = (counts[letter] || 0) + 1;
    });
    railEl.innerHTML = alphabet.map(l => {
      const has = counts[l] > 0;
      return `<button type="button" class="rail_letter ${has?'active':''}" data-letter="${l}" ${has?'':'tabindex="-1" aria-disabled="true"'} title="${l}${has?' — '+counts[l]:''}">${l}</button>`;
    }).join('');
  }

  function render(){
    const t = tr();
    const visible = filteredTerms();
    buildRail();

    statsEl.textContent = terms.length === 0
      ? t.statsEmpty
      : t.statsTotal(terms.length) + (searchQuery ? t.statsFound(visible.length) : '');

    if(terms.length === 0){
      listEl.innerHTML = `<div class="empty"><div class="glyph">Aa</div><p>${escapeHtml(isOwner ? t.emptyOwnerText : t.emptyGuestText)}</p></div>`;
      return;
    }
    if(visible.length === 0){
      listEl.innerHTML = `<div class="empty"><div class="glyph">∅</div><p>${escapeHtml(t.noResults(searchQuery))}</p></div>`;
      return;
    }

    const groups = {};
    visible.forEach(term => {
      const letter = firstLetterOf(pickDisplay(term).data.term);
      (groups[letter] = groups[letter] || []).push(term);
    });
    const letterOrder = Object.keys(groups).sort((a,b) => a.localeCompare(b, 'ru'));

    listEl.innerHTML = letterOrder.map(letter => {
      const rows = groups[letter].map(entryRowHtml).join('');
      return `<section class="letter_group" id="letter-${letter}">
        <div class="letter_head">${letter} <span class="count">${groups[letter].length}</span></div>
        ${rows}</section>`;
    }).join('');
  }

  function entryRowHtml(termObj){
    const t = tr();
    const { lang, data } = pickDisplay(termObj);
    const isConfirming = confirmDeleteId === termObj.id;
    const fallbackTag = lang !== currentLang ? `<span class="entry_fallback">(${lang.toUpperCase()})</span>` : '';
    const categoryLabel = termObj.category ? t.categories[termObj.category] : '';
    return `
      <article class="entry" data-id="${termObj.id}">
        <div>
          <span class="entry_term">${escapeHtml(data.term)}</span>${fallbackTag}
          ${categoryLabel ? `<span class="entry_tag">${escapeHtml(categoryLabel)}</span>` : ''}
        </div>
        <div class="entry_actions">
          ${isOwner ? `
          <button type="button" class="icon_btn edit_btn" title="${t.edit}" aria-label="${t.edit}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button type="button" class="icon_btn danger delete_btn" title="${t.del}" aria-label="${t.del}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
          </button>` : ''}
        </div>
        <div class="entry_def">${escapeHtml(data.definition)}</div>
        ${data.example ? `<div class="entry_example">${escapeHtml(data.example)}</div>` : ''}
        ${isConfirming ? `
          <div class="confirm_row">
            ${escapeHtml(t.confirmQ(data.term))}
            <button type="button" class="yes confirm_yes">${t.confirmYes}</button>
            <button type="button" class="no confirm_no">${t.confirmNo}</button>
          </div>` : ''}
      </article>`;
  }

  /* ---------- модальное окно ---------- */
  function setFormPane(pane){
    formActivePane = pane;
    document.querySelectorAll('.lang_tab').forEach(b => b.classList.toggle('active', b.dataset.pane === pane));
    document.querySelectorAll('.lang_pane').forEach(p => p.classList.toggle('active', p.dataset.pane === pane));
  }

  function openModal(termObj){
    const t = tr();
    editingId = termObj ? termObj.id : null;
    $('#formTitle').textContent = termObj ? t.formTitleEdit : t.formTitleNew;

    ['ru','en','uz'].forEach(l => {
      const d = (termObj && termObj[l]) ? termObj[l] : {};
      $('#inputTerm' + cap(l)).value = d.term || '';
      $('#inputDef' + cap(l)).value = d.definition || '';
      $('#inputEx' + cap(l)).value = d.example || '';
    });
    $('#inputCategory').value = termObj ? termObj.category : 'micro';

    $('#field-term-ru').classList.remove('invalid');
    $('#field-def-ru').classList.remove('invalid');
    setFormPane('ru');
    overlay.classList.remove('hidden');
    setTimeout(() => $('#inputTermRu').focus(), 30);
  }
  function cap(l){ return l.charAt(0).toUpperCase() + l.slice(1); }

  function closeModal(){
    overlay.classList.add('hidden');
    editingId = null;
    form.reset();
  }

  async function handleSubmit(e){
    e.preventDefault();
    const termRu = $('#inputTermRu').value.trim();
    const defRu = $('#inputDefRu').value.trim();

    const ruInvalid = !termRu || !defRu;
    $('#field-term-ru').classList.toggle('invalid', !termRu);
    $('#field-def-ru').classList.toggle('invalid', !defRu);
    if(ruInvalid){ setFormPane('ru'); return; }

    const payload = {
      category: $('#inputCategory').value,
      ru: { term: termRu, definition: defRu, example: $('#inputExRu').value.trim() },
      en: { term: $('#inputTermEn').value.trim(), definition: $('#inputDefEn').value.trim(), example: $('#inputExEn').value.trim() },
      uz: { term: $('#inputTermUz').value.trim(), definition: $('#inputDefUz').value.trim(), example: $('#inputExUz').value.trim() }
    };

    if(editingId){
      const idx = terms.findIndex(x => x.id === editingId);
      if(idx > -1) terms[idx] = { ...terms[idx], ...payload };
    }else{
      terms.push({ id: uid(), ...payload, dateAdded: new Date().toISOString() });
    }

    await persistTerms();
    closeModal();
    render();
    flag(tr().saved);
  }

  /* ---------- обработчики событий ---------- */
  document.querySelectorAll('#langSwitch button').forEach(b => {
    b.addEventListener('click', async () => {
      currentLang = b.dataset.lang;
      confirmDeleteId = null;
      await persistLang();
      renderStatic();
      render();
    });
  });

  document.querySelectorAll('.lang_tab').forEach(b => {
    b.addEventListener('click', () => setFormPane(b.dataset.pane));
  });

  $('#cancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && !overlay.classList.contains('hidden')) closeModal(); });
  form.addEventListener('submit', handleSubmit);

  $('#searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    confirmDeleteId = null;
    render();
  });

  railEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.rail_letter.active');
    if(!btn) return;
    const target = document.getElementById('letter-' + btn.dataset.letter);
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });

  listEl.addEventListener('click', async (e) => {
    const row = e.target.closest('.entry');
    if(!row) return;
    const id = row.dataset.id;

    if(e.target.closest('.edit_btn') && isOwner){
      const term = terms.find(x => x.id === id);
      if(term) openModal(term);
      return;
    }
    if(e.target.closest('.delete_btn') && isOwner){
      confirmDeleteId = id; render(); return;
    }
    if(e.target.closest('.confirm_yes')){
      terms = terms.filter(x => x.id !== id);
      confirmDeleteId = null;
      await persistTerms();
      render();
      flag(tr().deleted);
      return;
    }
    if(e.target.closest('.confirm_no')){ confirmDeleteId = null; render(); }
  });

  loadAll();
})();
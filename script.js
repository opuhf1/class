// ===== 달빛카페 메뉴판 =====
// 1) 메뉴 데이터  2) 카테고리 탭  3) 영업 중 표시  4) 주문 계산기
// 5) 메뉴 검색  6) 랜덤 추천  7) 주문 내역 저장(새로고침해도 유지)

// ----- 1) 메뉴 데이터 -----
// 메뉴를 추가하려면 MENU 배열에 한 줄만 더 쓰면 화면에 자동으로 나타나요.
const CATEGORIES = [
  { id: 'coffee', label: '커피', en: 'COFFEE', image: 'images/coffee.svg', note: '달빛카페의 중심. 매일 밤 직접 내리는 커피' },
  { id: 'signature', label: '시즌·시그니처', en: 'SEASON & SIGNATURE', image: 'images/signature.svg', note: '이번 계절에만 만나는 한 잔' },
  { id: 'noncoffee', label: '논커피·티', en: 'NON-COFFEE & TEA', image: 'images/tea.svg', note: '카페인 없이, 달빛만 담아서' },
  { id: 'dessert', label: '디저트·베이커리', en: 'DESSERT & BAKERY', image: 'images/dessert.svg', note: '커피 곁에 한 조각' },
  { id: 'chicken', label: '치킨', en: 'CHICKEN', image: 'images/chicken.svg', note: '출출한 밤을 위한 단 하나' },
];

const MENU = [
  // 커피
  { id: 'espresso', category: 'coffee', name: '에스프레소', en: 'Espresso', desc: '진한 한 잔', price: 3000, badges: [] },
  { id: 'americano', category: 'coffee', name: '아메리카노', en: 'Americano', desc: '기본 블렌드', price: 3500, badges: ['BEST'] },
  { id: 'moon-blend', category: 'coffee', name: '달빛 블렌드 아메리카노', en: 'Moonlight Blend', desc: '고소한 견과 향의 하우스 블렌드', price: 4000, badges: ['NEW'] },
  { id: 'cold-brew', category: 'coffee', name: '콜드브루', en: 'Cold Brew', desc: '12시간 우린 저온 추출', price: 4500, badges: ['ICE ONLY'] },
  { id: 'cafe-latte', category: 'coffee', name: '카페라떼', en: 'Caffè Latte', desc: '부드러운 우유', price: 4500, badges: [] },
  { id: 'vanilla-latte', category: 'coffee', name: '바닐라 라떼', en: 'Vanilla Latte', desc: '달콤한 바닐라 시럽', price: 5000, badges: ['BEST'] },
  { id: 'caramel-macchiato', category: 'coffee', name: '카라멜 마키아토', en: 'Caramel Macchiato', desc: '카라멜 드리즐', price: 5000, badges: [] },
  { id: 'einspanner', category: 'coffee', name: '아인슈페너', en: 'Einspänner', desc: '진한 크림을 올린 커피', price: 5500, badges: [] },
  { id: 'moon-cream-latte', category: 'coffee', name: '달빛 크림 라떼', en: 'Moonlight Cream Latte', desc: '시그니처. 꿀 크림과 시나몬', price: 5500, badges: ['SIGNATURE', 'BEST'] },
  { id: 'black-sesame-latte', category: 'coffee', name: '흑임자 라떼', en: 'Black Sesame Latte', desc: '고소한 흑임자', price: 5500, badges: ['NEW'] },
  // 시즌·시그니처
  { id: 'vin-chaud', category: 'signature', name: '겨울밤 뱅쇼 (무알콜)', en: 'Winter Night Vin Chaud', desc: '과일과 향신료를 끓인 따뜻한 음료', price: 6000, badges: ['SEASON', 'HOT ONLY'] },
  { id: 'blue-moon-soda', category: 'signature', name: '블루문 소다', en: 'Blue Moon Soda', desc: '푸른빛 레몬 소다', price: 5500, badges: ['NEW', 'ICE ONLY'] },
  // 논커피·티
  { id: 'moon-milk-tea', category: 'noncoffee', name: '달빛 밀크티', en: 'Moonlight Milk Tea', desc: '진하게 우린 홍차와 우유', price: 5000, badges: ['BEST'] },
  { id: 'yuja-ade', category: 'noncoffee', name: '유자 에이드', en: 'Yuja Ade', desc: '상큼한 유자와 탄산', price: 5000, badges: ['ICE ONLY'] },
  { id: 'strawberry-latte', category: 'noncoffee', name: '딸기 라떼', en: 'Strawberry Latte', desc: '생딸기 청과 우유', price: 5500, badges: [] },
  { id: 'chamomile', category: 'noncoffee', name: '캐모마일 티', en: 'Chamomile Tea', desc: '잠들기 전 따뜻한 허브티', price: 4500, badges: ['HOT ONLY'] },
  // 디저트·베이커리
  { id: 'moon-cookie', category: 'dessert', name: '문 쿠키', en: 'Moon Cookie', desc: '달 모양 버터 쿠키', price: 2500, badges: [] },
  { id: 'crescent-croissant', category: 'dessert', name: '초승달 크루아상', en: 'Crescent Croissant', desc: '겹겹이 바삭한 크루아상', price: 4000, badges: [] },
  { id: 'croffle', category: 'dessert', name: '크로플', en: 'Croffle', desc: '크루아상 와플 + 아이스크림', price: 4500, badges: ['BEST'] },
  { id: 'basque-cheesecake', category: 'dessert', name: '바스크 치즈케이크', en: 'Basque Cheesecake', desc: '겉은 탄 듯, 속은 촉촉', price: 6000, badges: [] },
  // 치킨 (1개)
  { id: 'moon-cup-chicken', category: 'chicken', name: '보름달 컵치킨', en: 'Full Moon Cup Chicken', desc: '한 손에 드는 컵 사이즈 순살', price: 7000, badges: ['BEST'], options: ['후라이드', '양념'] },
];

const BADGE_CLASS = {
  'SIGNATURE': 'badge-signature',
  'BEST': 'badge-best',
  'NEW': 'badge-new',
  'ICE ONLY': 'badge-ice',
  'HOT ONLY': 'badge-hot',
  'SEASON': 'badge-season',
};

// ----- 상태 -----
let activeCategory = 'all';     // 지금 선택된 탭
const cart = new Map();         // 장바구니: "메뉴id|옵션" → 수량
const chosenOption = {};        // 옵션이 있는 메뉴에서 고른 옵션 (예: 치킨 후라이드/양념)
let cartInView = false;         // 주문 계산기가 화면에 보이는지
let searchText = '';            // 검색창에 입력한 글자
let lastPickId = null;          // 바로 전에 추천한 메뉴 (같은 메뉴 연속 추천 방지)

// ----- 도우미 함수 -----
const won = n => n.toLocaleString('ko-KR') + '원';
const findItem = id => MENU.find(item => item.id === id);
const currentOption = item => (item.options ? (chosenOption[item.id] ?? item.options[0]) : null);
const cartKey = (id, option) => (option ? `${id}|${option}` : id);

// 사용자가 입력한 글자를 화면에 넣을 때 HTML로 해석되지 않게 바꿈
const escapeHTML = text => text.replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

// ----- 7) 주문 내역 저장 -----
// 브라우저(localStorage)에 저장해서 새로고침해도 담은 메뉴가 남게 함
const STORAGE_KEY = 'moonlight-cafe-order';

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: [...cart], options: chosenOption }));
  } catch (error) {
    // 저장이 막힌 브라우저(시크릿 모드 등)에서는 저장 없이 그냥 동작
  }
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    for (const [key, qty] of saved.cart ?? []) {
      const [id, option] = String(key).split('|');
      const item = findItem(id);
      // 메뉴가 바뀌었거나 이상한 값이면 건너뜀
      if (!item || !Number.isInteger(qty) || qty <= 0) continue;
      if (option && !(item.options ?? []).includes(option)) continue;
      cart.set(cartKey(id, option), qty);
    }
    for (const [id, option] of Object.entries(saved.options ?? {})) {
      if ((findItem(id)?.options ?? []).includes(option)) chosenOption[id] = option;
    }
  } catch (error) {
    // 저장된 값이 깨졌으면 빈 주문으로 시작
  }
}

// ----- 5) 메뉴 검색 -----
function matchesSearch(item) {
  const query = searchText.trim().toLowerCase();
  if (!query) return true;
  return `${item.name} ${item.en} ${item.desc}`.toLowerCase().includes(query);
}

// ----- 6) 랜덤 추천 -----
function showPick() {
  // 지금 보고 있는 분류와 검색 결과 안에서 고름 (없으면 전체 메뉴에서)
  let pool = MENU.filter(item =>
    (activeCategory === 'all' || item.category === activeCategory) && matchesSearch(item));
  if (pool.length === 0) pool = MENU;
  if (pool.length > 1) pool = pool.filter(item => item.id !== lastPickId);

  const item = pool[Math.floor(Math.random() * pool.length)];
  lastPickId = item.id;

  const box = document.getElementById('pick-result');
  box.innerHTML = `
    <span>🌙 오늘 밤 추천은 <b>${item.name}</b> · ${won(item.price)}</span>
    <button type="button" class="pick-add" data-action="plus" data-id="${item.id}">담기 +</button>`;
  box.hidden = false;
}

// ----- 2) 카테고리 탭 -----
function renderTabs() {
  const tabs = [{ id: 'all', label: '전체' }, ...CATEGORIES];
  document.getElementById('tabs').innerHTML = tabs
    .map(tab => `
      <button type="button" class="tab ${tab.id === activeCategory ? 'is-active' : ''}"
        data-action="tab" data-category="${tab.id}" aria-pressed="${tab.id === activeCategory}">
        ${tab.label}
      </button>`)
    .join('');
}

function selectCategory(id) {
  activeCategory = id;
  renderTabs();
  renderMenu();
  // 좁은 화면에서 고른 탭이 가려지지 않게 보이는 위치로 옮김
  document.querySelector('.tab.is-active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  // 메뉴 영역이 화면 위로 지나갔으면 메뉴 처음으로 올려 줌
  const menu = document.getElementById('menu');
  if (menu.getBoundingClientRect().top < 0) menu.scrollIntoView({ block: 'start' });
}

// ----- 메뉴 그리기 -----
function cardHTML(item) {
  const option = currentOption(item);
  const qty = cart.get(cartKey(item.id, option)) ?? 0;

  const badges = item.badges
    .map(b => `<span class="badge ${BADGE_CLASS[b] ?? ''}">${b}</span>`)
    .join('');

  const options = item.options
    ? `<div class="options" role="group" aria-label="${item.name} 맛 선택">
        ${item.options.map(o => `
          <button type="button" class="option ${o === option ? 'is-on' : ''}"
            data-action="option" data-id="${item.id}" data-option="${o}" aria-pressed="${o === option}">${o}</button>`).join('')}
      </div>`
    : '';

  return `
    <li class="menu-card ${qty > 0 ? 'in-cart' : ''}">
      <div class="badges">${badges}</div>
      <h4 class="menu-name">${item.name}</h4>
      <p class="menu-en">${item.en}</p>
      <p class="menu-desc">${item.desc}</p>
      ${options}
      <div class="card-bottom">
        <span class="price">${won(item.price)}</span>
        <div class="qty">
          <button type="button" class="qty-btn" data-action="minus" data-id="${item.id}"
            aria-label="${item.name} 하나 빼기" ${qty === 0 ? 'disabled' : ''}>−</button>
          <span class="qty-num">${qty}</span>
          <button type="button" class="qty-btn" data-action="plus" data-id="${item.id}"
            aria-label="${item.name} 하나 담기">+</button>
        </div>
      </div>
    </li>`;
}

function renderMenu() {
  // 선택한 탭 + 검색어에 맞는 메뉴만 분류별로 묶음 (맞는 메뉴가 없는 분류는 뺌)
  const groups = (activeCategory === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(cat => cat.id === activeCategory))
    .map(cat => ({ cat, items: MENU.filter(item => item.category === cat.id && matchesSearch(item)) }))
    .filter(group => group.items.length > 0);

  const list = document.getElementById('menu-list');
  if (groups.length === 0) {
    list.innerHTML = `<p class="menu-empty">‘${escapeHTML(searchText.trim())}’에 맞는 메뉴가 없어요. 다른 단어로 찾아보세요.</p>`;
    return;
  }

  list.innerHTML = groups
    .map(({ cat, items }) => `
      <section class="menu-group" aria-labelledby="group-${cat.id}">
        <div class="group-head">
          <img src="${cat.image}" width="84" height="84" alt="${cat.label} 일러스트">
          <div>
            <p class="group-en">${cat.en}</p>
            <h3 id="group-${cat.id}">${cat.label}</h3>
            <p class="group-note">${cat.note}</p>
          </div>
        </div>
        <ul class="menu-grid">
          ${items.map(cardHTML).join('')}
        </ul>
      </section>`)
    .join('');
}

// ----- 4) 주문 계산기 -----
function changeQty(id, diff) {
  const item = findItem(id);
  if (!item) return;
  const key = cartKey(id, currentOption(item));
  const next = (cart.get(key) ?? 0) + diff;
  if (next > 0) cart.set(key, next);
  else cart.delete(key);
}

function renderCart() {
  const entries = [...cart.entries()];
  let count = 0;
  let total = 0;

  document.getElementById('cart-list').innerHTML = entries
    .map(([key, qty]) => {
      const [id, option] = key.split('|');
      const item = findItem(id);
      const sub = item.price * qty;
      count += qty;
      total += sub;
      return `
        <li class="cart-item">
          <span>${item.name}${option ? ` <small>(${option})</small>` : ''} <small>× ${qty}</small></span>
          <span class="sub">${won(sub)}</span>
          <button type="button" class="cart-remove" data-action="remove" data-key="${key}"
            aria-label="${item.name} 주문에서 빼기">×</button>
        </li>`;
    })
    .join('');

  document.getElementById('cart-empty').hidden = entries.length > 0;
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = won(total);
  document.getElementById('cart-clear').disabled = entries.length === 0;

  const bar = document.getElementById('cart-bar');
  bar.hidden = count === 0 || cartInView; // 주문 계산기가 보이면 고정 바는 숨김
  document.getElementById('bar-count').textContent = count;
  document.getElementById('bar-total').textContent = won(total);
}

// ----- 3) 영업 중 표시 -----
// 영업시간 18:00 ~ 다음날 02:00, 화요일 휴무 (한국 시간 기준)
const OPEN_HOUR = 18;
const CLOSE_HOUR = 2;
const CLOSED_DAY = 2; // 0=일, 1=월, 2=화 ...

function nowInKorea() {
  const now = new Date();
  // 보는 사람이 어느 나라에 있든 한국 시간(UTC+9)으로 맞춤
  return new Date(now.getTime() + (now.getTimezoneOffset() + 9 * 60) * 60000);
}

function getStatus() {
  const now = nowInKorea();
  const hour = now.getHours();
  const day = now.getDay();

  // 18시 이후: 오늘 영업일
  if (hour >= OPEN_HOUR) {
    if (day === CLOSED_DAY) return { open: false, text: '오늘은 휴무예요 · 매주 화요일' };
    return { open: true, text: '지금 영업 중 · 새벽 2시까지' };
  }
  // 0시~2시: 어제 시작한 영업이 이어지는 시간
  if (hour < CLOSE_HOUR) {
    const yesterday = (day + 6) % 7;
    if (yesterday === CLOSED_DAY) return { open: false, text: '영업 종료 · 오늘 18:00 오픈' };
    return { open: true, text: '지금 영업 중 · 새벽 2시까지' };
  }
  // 2시~18시: 문 닫은 시간
  if (day === CLOSED_DAY) return { open: false, text: '오늘은 휴무예요 · 매주 화요일' };
  const minutesLeft = OPEN_HOUR * 60 - (hour * 60 + now.getMinutes());
  const h = Math.floor(minutesLeft / 60);
  const m = minutesLeft % 60;
  const left = h > 0 ? `${h}시간 ${m}분` : `${m}분`;
  return { open: false, text: `오픈까지 ${left} · 18:00 오픈` };
}

function renderStatus() {
  const { open, text } = getStatus();
  const box = document.getElementById('open-status');
  box.classList.toggle('is-open', open);
  box.querySelector('.status-text').textContent = (open ? '🌙 ' : '') + text;
}

// ----- 클릭 처리 (이벤트 위임: 문서 전체에서 한 번만 듣기) -----
document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;

  if (action === 'tab') {
    selectCategory(button.dataset.category);
    return;
  }

  if (action === 'pick') {
    showPick();
    return;
  }

  if (action === 'plus') changeQty(id, 1);
  else if (action === 'minus') changeQty(id, -1);
  else if (action === 'option') chosenOption[id] = button.dataset.option;
  else if (action === 'remove') cart.delete(button.dataset.key);
  else if (action === 'clear') cart.clear();
  else return;

  saveCart();
  renderMenu();
  renderCart();

  // 다시 그린 뒤에도 누르던 버튼에 포커스를 돌려 줌 (키보드 사용자 배려)
  if (id && button.closest('#menu-list')) {
    const selector = action === 'option'
      ? `[data-action="option"][data-id="${id}"][data-option="${button.dataset.option}"]`
      : `[data-action="${action}"][data-id="${id}"]:not(:disabled)`;
    const again = document.querySelector(`#menu-list ${selector}`)
      ?? document.querySelector(`#menu-list [data-action="plus"][data-id="${id}"]`);
    again?.focus();
  }
});

// 주문 계산기가 화면에 들어오고 나가는 것을 지켜봄
new IntersectionObserver(([entry]) => {
  cartInView = entry.isIntersecting;
  renderCart();
}).observe(document.getElementById('cart'));

// 검색창에 글자를 입력할 때마다 메뉴를 다시 그림
document.getElementById('menu-search').addEventListener('input', event => {
  searchText = event.target.value;
  renderMenu();
});

// ----- 시작 -----
loadCart();
renderTabs();
renderMenu();
renderCart();
renderStatus();
setInterval(renderStatus, 60 * 1000); // 1분마다 영업 상태 갱신

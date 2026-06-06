/* =========================================================
      1. 환영 팝업
    ========================================================= */
const overlay = document.getElementById('welcome-overlay')
const closeBtn = document.getElementById('popup-close')
closeBtn.addEventListener('click', () => overlay.classList.add('hidden'))
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.add('hidden')
})

/* =========================================================
      2. 이미지 슬라이더 (자동 + 무한 반복)
    ========================================================= */
const slides = document.querySelectorAll('.slide')
const dotsWrap = document.getElementById('sliderDots')
let current = 0
let timer

// 도트 생성
slides.forEach((_, i) => {
  const d = document.createElement('div')
  d.className = 'dot' + (i === 0 ? ' active' : '')
  d.addEventListener('click', () => goTo(i))
  dotsWrap.appendChild(d)
})

function goTo(idx) {
  slides[current].classList.remove('active')
  dotsWrap.children[current].classList.remove('active')
  current = (idx + slides.length) % slides.length
  slides[current].classList.add('active')
  dotsWrap.children[current].classList.add('active')
}

function startAuto() {
  clearInterval(timer)
  timer = setInterval(() => goTo(current + 1), 3500)
}
startAuto()

/* =========================================================
      3. 검색창 + 검색어 저장
    ========================================================= */
const SECURITY_DATA = [
  {
    title: 'DDOS 공격',
    keys: ['ddos', '디도스', 'dos', '분산서비스거부', 'ddos공격'],
    tag: '웹',
    tagClass: 'category-tag1',
    hashtag: '#좀비PC_집단공격 #서비스_마비',
    desc: 'DDoS(분산 서비스 거부) 공격은 여러 대의 컴퓨터를 동원해 특정 서버나 웹사이트에 비정상적으로 많은 트래픽을 한꺼번에 보내서, 시스템을 마비시키고 일반 사용자들이 이용하지 못하게 만드는 공격입니다.',
  },
  {
    title: 'API Injection',
    keys: [
      'api',
      'api injection',
      'api인젝션',
      'injection',
      '인젝션',
      'sql',
      'nosql',
    ],
    tag: '웹',
    tagClass: 'category-tag1',
    hashtag: '#입력값_조작 #검증_누락 #데이터_유출',
    desc: '공격자가 API 엔드포인트를 통해 악의적인 데이터를 주입하여 서버 측의 로직을 조작하거나, 데이터베이스를 탈취하고, 시스템 명령을 실행하는 보안 취약점입니다.',
  },
  {
    title: 'XSS',
    keys: [
      'xss',
      '크로스사이트스크립팅',
      '크로스 사이트',
      '스크립트삽입',
      '쿠키탈취',
    ],
    tag: '웹',
    tagClass: 'category-tag1',
    hashtag: '#스크립트_삽입 #브라우저_실행 #쿠키_탈취',
    desc: '악의적인 스크립트를 몰래 올려두어, 그 글을 클릭한 다른 사용자의 브라우저에서 해당 코드가 실행되게 만드는 공격입니다.',
  },
  {
    title: 'Broken Access Control',
    keys: [
      'broken access control',
      'broken',
      'access control',
      '접근제어',
      '권한',
    ],
    tag: '앱',
    tagClass: 'category-tag2',
    hashtag: '#권한 #접근제어 #사용자',
    desc: '액세스 제어가 취약하면 사용자는 주어진 권한을 벗어나 모든 데이터를 무단으로 열람·수정 혹은 삭제할 수 있습니다.',
  },
  {
    title: 'Insecure Design',
    keys: ['insecure design', 'insecure', '설계', '불안전한설계'],
    tag: '앱',
    tagClass: 'category-tag2',
    hashtag: '#철저한 #효율 #설계',
    desc: '안전하지 않게 설계된 애플리케이션은 개발 완료 후 코드를 수정하여도 보안 취약점을 완벽히 방어하는 데 한계가 있습니다.',
  },
  {
    title: 'Vulnerable and Outdated',
    keys: ['vulnerable', 'outdated', '취약', '취약점', '모니터링', '최신화'],
    tag: '앱',
    tagClass: 'category-tag2',
    hashtag: '#모니터링 #취약점 #최신화',
    desc: '불필요한 기능·구성요소·파일 등을 삭제하고, 지속적인 모니터링으로 취약한 소프트웨어가 사용되고 있는지 확인해야 합니다.',
  },
  {
    title: 'IP Header & ACL',
    keys: ['ip', 'acl', 'ip header', 'ip헤더', '접근제어목록', '네트워크입구'],
    tag: '네트워크',
    tagClass: 'category-tag3',
    hashtag: '#출입명부 #네트워크입구 #안전제일',
    desc: '네트워크 통신의 기본인 IP 주소를 확인하여 허락되지 않은 외부인의 접속을 입구에서부터 막는 기술입니다.',
  },
  {
    title: 'Secure Connection',
    keys: [
      'secure connection',
      'secure',
      '연결',
      'tcp',
      'syn',
      '가짜연결',
      '안전한통로',
    ],
    tag: '네트워크',
    tagClass: 'category-tag3',
    hashtag: '#가짜연결차단 #서버보호 #안전한통로',
    desc: '서버에 가짜 연결 요청을 수없이 보내서 서버를 마비시키는 공격을 막아내는 기술입니다.',
  },
  {
    title: 'Firewall',
    keys: ['firewall', '방화벽', '트래픽제어', '경계보안'],
    tag: '네트워크',
    tagClass: 'category-tag3',
    hashtag: '#경계보안 #트래픽제어 #비인가차단',
    desc: '신뢰할 수 없는 외부의 침입으로부터 내부 네트워크를 보호하기 위해, 허가되지 않은 트래픽은 막고 허가된 통신만 통과시키는 보안 시스템입니다.',
  },
]

const STORAGE_KEY = 'secureweb_recent_searches'
const MAX_RECENT = 8

const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const recentDiv = document.getElementById('recentSearches')
const hintEl = document.getElementById('search-hint')
const resultOverlay = document.getElementById('search-result-overlay')
const resultContent = document.getElementById('result-content')
const resultClose = document.getElementById('result-close')

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}
function saveRecent(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

function addRecent(keyword) {
  let arr = loadRecent()
  arr = arr.filter((k) => k.toLowerCase() !== keyword.toLowerCase())
  arr.unshift(keyword)
  if (arr.length > MAX_RECENT) arr = arr.slice(0, MAX_RECENT)
  saveRecent(arr)
  renderRecent()
}

function renderRecent() {
  const arr = loadRecent()
  recentDiv.innerHTML = arr.length
    ? arr
        .map(
          (k, i) =>
            `<span class="recent-tag" data-idx="${i}">
              ${k}
              <span class="del" data-del="${i}" title="삭제">✕</span>
            </span>`,
        )
        .join('')
    : ''

  recentDiv.querySelectorAll('.recent-tag').forEach((tag) => {
    tag.addEventListener('click', (e) => {
      if (e.target.dataset.del !== undefined) {
        let arr2 = loadRecent()
        arr2.splice(+e.target.dataset.del, 1)
        saveRecent(arr2)
        renderRecent()
      } else {
        const kw = tag.firstChild.textContent.trim()
        searchInput.value = kw
        doSearch(kw)
      }
    })
  })
}

function doSearch(keyword) {
  const q = keyword.trim().toLowerCase()
  if (!q) return

  const results = SECURITY_DATA.filter((item) =>
    item.keys.some((k) => k.includes(q) || q.includes(k)),
  )

  hintEl.textContent = ''

  if (results.length === 0) {
    hintEl.textContent = `"${keyword}" 에 대한 결과가 없습니다. 다른 키워드를 시도해 보세요.`
    return
  }

  addRecent(keyword)

  resultContent.innerHTML = results
    .map(
      (r) => `
        <div style="background:#0d1230;border:1px solid #1e2a50;border-radius:12px;padding:20px 24px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <strong style="font-size:1.15rem;color:white;">${r.title}</strong>
            <span class="${r.tagClass}" style="margin:0;">${r.tag}</span>
          </div>
          <p style="color:#4a9060;font-size:.85rem;margin-bottom:10px;">${r.hashtag}</p>
          <p style="color:#c0c8e0;font-size:.95rem;line-height:1.65;margin:0;">${r.desc}</p>
          <a href="security.html" style="display:inline-block;margin-top:14px;color:#03ff40;font-size:.85rem;text-decoration:none;border:1px solid #03ff40;padding:5px 14px;border-radius:6px;transition:background .2s;"
            onmouseover="this.style.background='rgba(3,255,64,.12)'" onmouseout="this.style.background='transparent'">
            Security 페이지에서 더 보기 →
          </a>
        </div>
      `,
    )
    .join('')

  resultOverlay.classList.add('show')
}

searchBtn.addEventListener('click', () => doSearch(searchInput.value))
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doSearch(searchInput.value)
})
resultClose.addEventListener('click', () =>
  resultOverlay.classList.remove('show'),
)
resultOverlay.addEventListener('click', (e) => {
  if (e.target === resultOverlay) resultOverlay.classList.remove('show')
})

renderRecent()

/* =========================================================
      ④ [교재 16단원] 실시간 보안 접속 타임스탬프 (문자열 결합방식)
    ========================================================= */
const currentDate = document.getElementById('currentDate')

function updateTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth() + 1 // getMonth() 0 기반 인덱스 보정
  const day = now.getDate()

  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  //백틱 표현을 제거하고 정석 연산자인 문자열 결합 연산 기호(+)로 조합
  const timeString =
    '실시간 접속 시간 : ' +
    year +
    '년 ' +
    month +
    '월 ' +
    day +
    '일 ' +
    hour +
    '시 ' +
    minute +
    '분 ' +
    second +
    '초'

  if (currentDate) {
    currentDate.innerText = timeString
  }
}

updateTime() // 브라우저 최초 로딩 시 즉시 주입
setInterval(updateTime, 1000) // 1초(1000ms)마다 백그라운드 스케줄러 동적 업데이트

/* ── 모바일 메뉴 ── */
const sBtn = document.getElementById('menuBtn')
const sMenu = document.getElementById('mobileMenu')
sBtn.addEventListener('click', () => sMenu.classList.toggle('open'))
document.addEventListener('click', (e) => {
  if (!sBtn.contains(e.target) && !sMenu.contains(e.target))
    sMenu.classList.remove('open')
})

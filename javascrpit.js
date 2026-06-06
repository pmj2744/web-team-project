// ----------------------------------------------------
// SecureWeb Project: Refactored JavaScript logic
// Clean Separation of Concerns (HTML/CSS/JS)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. 실시간 시스템 시계
  // ----------------------------------------------------
  const clockElement = document.getElementById('systemClock')

  if (clockElement) {
    function updateClock() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      clockElement.innerText = `[SYSTEM ACTIVE] ${hours}:${minutes}:${seconds}`
    }
    setInterval(updateClock, 1000)
    updateClock()
  }

  // ----------------------------------------------------
  // 2. 카테고리 필터링 기능
  // ----------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn')
  const allBoxes = document.querySelectorAll('.box')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // HTML의 data-filter 속성값(웹, 앱 등)을 가져옵니다.
      const category = btn.getAttribute('data-filter')

      allBoxes.forEach((box) => {
        const span = box.querySelector('.box-top span')
        const cardCategory = span ? span.innerText.trim() : ''

        if (category === '전체' || cardCategory === category) {
          box.style.display = '' // 보이기
        } else {
          box.style.display = 'none' // 숨기기
        }
      })
    })
  })

  // ----------------------------------------------------
  // 3. 요약 팝업 (모달) 기능 ★ (마우스 이벤트 추가됨)
  // ----------------------------------------------------
  const summaryBtn = document.getElementById('summaryBtn')
  const modalOverlay = document.getElementById('summaryModal')
  const modalContent = document.getElementById('modalContent')

  if (summaryBtn && modalOverlay && modalContent) {
    // 요약 보기 버튼 클릭 시 모달 열기
    summaryBtn.addEventListener('click', () => {
      modalOverlay.classList.add('show')
      modalContent.classList.remove('secure-mode') // 열 때마다 기본 상태로 초기화
    })

    // 배경 클릭 시 모달 닫기
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show')
      }
    })

    // [JS 추가] 데스크탑 사용자를 위한 마우스 오버/아웃 이벤트 구현
    modalContent.addEventListener('mouseenter', () => {
      modalContent.classList.add('secure-mode') // 마우스가 올라가면 상태 변경
    })

    modalContent.addEventListener('mouseleave', () => {
      modalContent.classList.remove('secure-mode') // 마우스가 나가면 원래 상태로 복귀
    })

    // 모바일 사용자를 위한 터치 토글 (유지)
    modalContent.addEventListener('click', () => {
      modalContent.classList.toggle('secure-mode')
    })
  }

  // ----------------------------------------------------
  // 4. 자세히 보기 아코디언 토글
  // ----------------------------------------------------
  document.querySelectorAll('.desc').forEach((desc) => {
    desc.style.display = 'none'
  })

  document.querySelectorAll('.toggle').forEach((btn) => {
    btn.addEventListener('click', function () {
      const box = this.closest('.box')
      const desc = box.querySelector('.desc')
      const isHidden = desc.style.display === 'none'

      // 다른 박스들 모두 닫기
      document.querySelectorAll('.box').forEach((otherBox) => {
        otherBox.querySelector('.desc').style.display = 'none'
        otherBox.querySelector('.toggle').textContent = '자세히 보기 ▾'
      })

      // 클릭한 박스 열기
      if (isHidden) {
        desc.style.display = 'block'
        this.textContent = '접기 ▴'
      }
    })
  })

  // ----------------------------------------------------
  // 5. 모바일 메뉴
  // ----------------------------------------------------
  const menuBtn = document.getElementById('menuBtn')
  const menu = document.getElementById('mobileMenu')

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('open')
    })

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open')
      }
    })
  }
})

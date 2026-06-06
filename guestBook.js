document.addEventListener('DOMContentLoaded', () => {
  const guestbookForm = document.getElementById('guestbookForm')
  const guestName = document.getElementById('guestName')
  const guestMessage = document.getElementById('guestMessage')
  const logArea = document.getElementById('logArea')

  // 1. 로컬 스토리지에서 기존 방명록 데이터 불러오기 (배열 형태)
  let savedLogs = JSON.parse(localStorage.getItem('secureWebLogs')) || []

  // 2. 기존 데이터 화면에 렌더링하기
  savedLogs.forEach((log) => {
    createLogElement(log)
  })

  // 3. 폼 제출 이벤트 처리 (새 방명록 등록)
  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault() // 새로고침 방지

    const nameValue = guestName.value.trim()
    const messageValue = guestMessage.value.trim()

    if (!nameValue || !messageValue) return

    // 현재 시간 조립
    const now = new Date()
    const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // ★ 삭제를 위해 고유한 ID(현재 시간의 밀리초) 생성
    const logData = {
      id: Date.now(), // 고유 식별자 추가
      name: nameValue,
      message: messageValue,
      date: dateString,
    }

    // 화면에 동적으로 요소 추가
    createLogElement(logData)

    // 로컬 스토리지에 데이터 저장
    savedLogs.unshift(logData)
    localStorage.setItem('secureWebLogs', JSON.stringify(savedLogs))

    // 입력창 초기화
    guestName.value = ''
    guestMessage.value = ''
  })

  // 4. [핵심] DOM 노드 생성 및 삭제 기능이 포함된 함수
  function createLogElement(logData) {
    // 부모 div 생성
    const entryDiv = document.createElement('div')
    entryDiv.className = 'log-entry'

    // 헤더 영역 (이름, 날짜, 삭제 버튼을 한 줄에 배치하기 위한 박스)
    const headerDiv = document.createElement('div')
    headerDiv.className = 'log-header'

    // 이름 영역 div 생성
    const nameDiv = document.createElement('div')
    nameDiv.className = 'log-name'
    nameDiv.textContent = `[USER] ${logData.name}`

    // 날짜 영역 span 생성
    const dateSpan = document.createElement('span')
    dateSpan.className = 'log-date'
    dateSpan.textContent = logData.date
    nameDiv.appendChild(dateSpan) // 이름 옆에 날짜 붙이기

    // ★ 삭제 버튼 노드 생성
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-btn'
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i> 삭제' // 휴지통 아이콘 (FontAwesome 사용 시)
    // 만약 아이콘이 안 나온다면 텍스트로 대체: deleteBtn.textContent = '삭제';

    // ★ 삭제 버튼 클릭 이벤트 (기능 구현)
    deleteBtn.addEventListener('click', () => {
      // 1. 화면(DOM)에서 해당 방명록 박스 삭제
      entryDiv.remove()

      // 2. 배열(데이터)에서 해당 ID를 가진 객체 걸러내기 (filter)
      savedLogs = savedLogs.filter((item) => item.id !== logData.id)

      // 3. 업데이트된 배열을 로컬 스토리지에 다시 덮어쓰기 저장
      localStorage.setItem('secureWebLogs', JSON.stringify(savedLogs))
    })

    // 헤더에 조립 (이름 부분과 삭제 버튼)
    headerDiv.appendChild(nameDiv)
    headerDiv.appendChild(deleteBtn)

    // 메시지 본문 div 생성
    const textDiv = document.createElement('div')
    textDiv.className = 'log-text'
    textDiv.textContent = logData.message

    // 최종 조립 (부모 div에 헤더와 메시지 부착)
    entryDiv.appendChild(headerDiv)
    entryDiv.appendChild(textDiv)

    // 최신 방명록이 항상 위로 올라오도록 추가
    logArea.prepend(entryDiv)
  }
})

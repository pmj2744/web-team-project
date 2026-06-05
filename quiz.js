        // 모바일 메뉴 토글
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        if (menuBtn && mobileMenu) {
            menuBtn.onclick = function() {
                if(mobileMenu.style.display === 'flex') {
                    mobileMenu.style.display = 'none';
                } else {
                    mobileMenu.style.display = 'flex';
                }
            };
        }

        // 퀴즈 데이터
        const quizData = [
            {
                question: "1. 여러 대의 좀비 PC를 동원해 특정 서버나 웹사이트에 대량의 트래픽을 한꺼번에 보내 서비스를 마비시키는 공격은?",
                options: ["API Injection", "XSS", "DDoS 공격", "Broken Access Control"],
                answer: 2,
                explanation: "DDoS 공격은 집단적으로 트래픽을 몰아넣어 통로를 가로막고 시스템을 마비시킵니다."
            },
            {
                question: "2. API 엔드포인트를 통해 악의적인 데이터를 주입하여 서버 로직을 조작하거나 데이터베이스를 탈취하는 취약점은?",
                options: ["API Injection", "DDoS 공격", "Insecure Design", "Firewall"],
                answer: 0,
                explanation: "입력값 검증 누락 시 공격자가 데이터를 주입해 로직을 조작하는 취약점입니다."
            },
            {
                question: "3. 웹사이트에 악의적인 스크립트를 삽입하여, 방문한 사용자의 브라우저에서 쿠키 탈취 등을 유도하는 공격은?",
                options: ["DDoS 공격", "XSS", "Broken Access Control", "Firewall"],
                answer: 1,
                explanation: "XSS는 방문자의 브라우저에서 악성 코드가 실행되도록 하는 공격 방식입니다."
            },
            {
                question: "4. 사용자가 주어진 권한을 벗어나 타인의 데이터를 무단으로 열람, 수정, 삭제할 수 있게 되는 보안 취약점은?",
                options: ["Insecure Design", "Vulnerable Components", "Broken Access Control", "Secure Connection"],
                answer: 2,
                explanation: "액세스 제어가 취약하면 무단으로 데이터를 조작할 수 있는 권한 사고가 발생합니다."
            },
            {
                question: "5. 설계 단계에서 보안을 고려하지 않아, 개발 완료 후 코드를 수정해도 보안 취약점을 완벽히 방어하기 어려운 항목은?",
                options: ["Insecure Design", "XSS", "DDoS", "API Injection"],
                answer: 0,
                explanation: "설계 단계의 결함은 구현 단계에서의 수정만으로는 해결하기 어렵습니다."
            },
            {
                question: "6. 불필요한 기능이나 취약한 구버전 소프트웨어를 방치하여 발생하는 보안 위협은?",
                options: ["API Injection", "Vulnerable and Outdated Components", "Firewall", "Access Control"],
                answer: 1,
                explanation: "오래된 컴포넌트는 알려진 취약점이 많으므로 항상 최신화해야 합니다."
            },
            {
                question: "7. IP 주소를 확인하여 허락되지 않은 외부인의 접속을 네트워크 입구에서부터 막는 기술은?",
                options: ["XSS Filter", "Insecure Design", "IP Header & ACL", "TCP Session"],
                answer: 2,
                explanation: "IP 헤더 정보와 ACL 규칙을 통해 비인가 트래픽을 차단합니다."
            },
            {
                question: "8. TCP 연결 과정을 응용하여 진짜 사용자만 서버에 접속할 수 있도록 걸러내는 통로 보호 기술은?",
                options: ["Secure Connection", "API Injection", "Broken Access Control", "DDoS Attack"],
                answer: 0,
                explanation: "가짜 연결 요청을 판별하여 진짜 연결만 수립하도록 돕는 기술입니다."
            },
            {
                question: "9. 외부의 침입으로부터 내부 네트워크를 보호하기 위해 허가된 통신만 통과시키는 전통적인 경계 시스템은?",
                options: ["DDoS Filter", "Firewall", "ACL Node", "API Gateway"],
                answer: 1,
                explanation: "방화벽은 미리 정의된 보안 규칙에 따라 네트워크 트래픽을 제어합니다."
            }
        ];

        let currentIdx = 0;
        let score = 0;
        let selectedAnswer = null;
        let isSubmitted = false;

        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const restartBtn = document.getElementById('restart-btn');
        const questionCounter = document.getElementById('question-counter');
        const scoreCounter = document.getElementById('score-counter');
        const progressFill = document.getElementById('progress-fill');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const feedbackArea = document.getElementById('quiz-feedback-area');
        const finalPercentage = document.getElementById('final-percentage');
        const finalCount = document.getElementById('final-count');
        const badgeText = document.getElementById('badge-text');

        startBtn.onclick = function() { startQuiz(); };
        nextBtn.onclick = function() { handleAction(); };
        restartBtn.onclick = function() { startQuiz(); };

        function startQuiz() {
            currentIdx = 0;
            score = 0;
            selectedAnswer = null;
            isSubmitted = false;
            startScreen.className = 'hidden';
            resultScreen.className = 'hidden';
            quizScreen.className = '';
            showQuestion();
        }

        function showQuestion() {
            selectedAnswer = null;
            isSubmitted = false;
            nextBtn.innerText = "정답 제출";
            nextBtn.disabled = true;
            feedbackArea.innerHTML = "";

            const currentQuiz = quizData[currentIdx];
            questionCounter.innerText = "문제 " + (currentIdx + 1) + " / " + quizData.length;
            scoreCounter.innerText = "현재 점수: " + score + "점";
            progressFill.style.width = (((currentIdx + 1) / quizData.length) * 100) + "%";
            questionText.innerText = currentQuiz.question;

            optionsContainer.innerHTML = '';
            for (let i = 0; i < currentQuiz.options.length; i++) {
                const button = document.createElement('button');
                button.className = 'option-btn';
                // [수정] 보기 번호 제거하고 문항 텍스트만 출력
                button.innerText = currentQuiz.options[i];
                
                button.onmouseover = function() {
                    if (!isSubmitted && selectedAnswer !== i) {
                        button.style.backgroundColor = "#232F66";
                        button.style.borderColor = "#00FF41";
                    }
                };
                button.onmouseout = function() {
                    if (!isSubmitted && selectedAnswer !== i) {
                        button.style.backgroundColor = "#1A234D";
                        button.style.borderColor = "#2D3748";
                    }
                };
                button.onclick = function() { selectOption(i); };
                optionsContainer.appendChild(button);
            }
        }

        function selectOption(idx) {
            if (isSubmitted) return;
            selectedAnswer = idx;
            nextBtn.disabled = false;
            const buttons = optionsContainer.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                if (i === idx) {
                    buttons[i].className = 'option-btn selected';
                } else {
                    buttons[i].className = 'option-btn';
                }
            }
        }

        function handleAction() {
            const currentQuiz = quizData[currentIdx];
            const buttons = optionsContainer.getElementsByTagName('button');

            if (!isSubmitted) {
                isSubmitted = true;
                
                // 버튼 상태: 정답은 초록, 오답은 빨강, 나머지는 비활성화
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = true;
                    if (i === currentQuiz.answer) {
                        buttons[i].className = 'option-btn correct';
                    } else if (i === selectedAnswer) {
                        buttons[i].className = 'option-btn wrong';
                    }
                }

                // [교재 정석] 박스 생성 및 스타일링
                const fBox = document.createElement('div');
                fBox.className = 'feedback-box';
                
                const fStrong = document.createElement('strong');
                fStrong.style.display = 'block';
                fStrong.style.marginBottom = '4px';
                
                const fSpan = document.createElement('span');
                let resultMsg = "";

                //정답 로직 판별 및 메시지/색상 제어
                if (selectedAnswer === currentQuiz.answer) {
                    score++;
                    scoreCounter.innerText = "현재 점수: " + score + "점";
                    
                    fStrong.innerText = "정답입니다!";
                    fStrong.style.color = "#00FF41";
                    fBox.style.backgroundColor = "#064e3b";
                    fBox.style.borderLeft = "4px solid #00FF41";
                    resultMsg = currentQuiz.explanation;
                } else {
                    fStrong.innerText = "오답입니다!";
                    fStrong.style.color = "#f87171";
                    fBox.style.backgroundColor = "#7f1d1d";
                    fBox.style.borderLeft = "4px solid #f87171";
                    resultMsg = "정답은 [" + currentQuiz.options[currentQuiz.answer] + "] 입니다. " + currentQuiz.explanation;
                }

                const textNode = document.createTextNode(resultMsg);
                fSpan.appendChild(textNode);
                fBox.appendChild(fStrong);
                fBox.appendChild(fSpan);
                feedbackArea.appendChild(fBox);

                if (currentIdx + 1 === quizData.length) {
                    nextBtn.innerText = "결과 보기";
                } else {
                    nextBtn.innerText = "다음 문제";
                }
            } else {
                currentIdx++;
                if (currentIdx < quizData.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }
        }

        function showResult() {
            quizScreen.className = 'hidden';
            resultScreen.className = '';
            const pct = Math.round((score / quizData.length) * 100);
            finalPercentage.innerText = pct + "%";
            finalCount.innerText = "(" + score + " / " + quizData.length + " 문제 맞춤)";
        }

(function () {
    const overlay = document.getElementById('gate-overlay');

    if (sessionStorage.getItem('gate_passed') === '1') {
        overlay.remove();
        return;
    }

    document.body.style.overflow = 'hidden';

    const questions = [
        {
            q: '「CLANNAD」「AIR」「Kanon」などで知られる、"泣きゲー"ブランドの代表格は？',
            choices: ['ニトロプラス', 'Key', '07th Expansion'],
            answer: 1
        },
        {
            q: '「Fate/stay night」を制作したビジュアルノベルブランドは？',
            choices: ['Leaf', 'Key', 'TYPE-MOON'],
            answer: 2
        },
        {
            q: 'ビジュアルノベルにおける「既読スキップ」とは何の機能？',
            choices: [
                'エンディングを自動的に飛ばす機能',
                '一度読んだテキストを高速で読み飛ばす機能',
                'セーブデータを自動削除する機能'
            ],
            answer: 1
        }
    ];

    let currentQ = 0;
    let selected = null;

    const card        = document.getElementById('gate-card');
    const questionEl  = document.getElementById('gate-question');
    const choicesEl   = document.getElementById('gate-choices');
    const errorEl     = document.getElementById('gate-error');
    const nextBtn     = document.getElementById('gate-next-btn');
    const progressTxt = document.getElementById('gate-progress-text');
    const progressBar = document.getElementById('gate-progress-fill');

    function render() {
        const q = questions[currentQ];
        selected = null;
        errorEl.textContent = '';
        questionEl.textContent = q.q;
        choicesEl.innerHTML = '';
        progressTxt.textContent = `問題 ${currentQ + 1} / ${questions.length}`;
        progressBar.style.width = `${((currentQ + 1) / questions.length) * 100}%`;
        nextBtn.textContent = currentQ === questions.length - 1 ? '入場する →' : '次へ →';

        q.choices.forEach((text, i) => {
            const li    = document.createElement('li');
            const radio = document.createElement('input');
            radio.type  = 'radio';
            radio.name  = 'gate-choice';
            radio.id    = `gc-${i}`;

            const label     = document.createElement('label');
            label.htmlFor   = `gc-${i}`;
            label.textContent = text;

            li.appendChild(radio);
            li.appendChild(label);
            li.addEventListener('click', () => pick(i));
            choicesEl.appendChild(li);
        });
    }

    function pick(i) {
        selected = i;
        choicesEl.querySelectorAll('li').forEach((li, idx) => {
            li.classList.toggle('selected', idx === i);
            li.querySelector('input').checked = idx === i;
        });
        errorEl.textContent = '';
    }

    function shake() {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
        card.addEventListener('animationend', () => card.classList.remove('shake'), { once: true });
    }

    nextBtn.addEventListener('click', () => {
        if (selected === null) {
            errorEl.textContent = '選択肢を選んでください。';
            return;
        }

        if (selected !== questions[currentQ].answer) {
            shake();
            errorEl.textContent = '不正解です。もう一度挑戦してください。';
            selected = null;
            choicesEl.querySelectorAll('li').forEach(li => {
                li.classList.remove('selected');
                li.querySelector('input').checked = false;
            });
            return;
        }

        currentQ++;

        if (currentQ >= questions.length) {
            sessionStorage.setItem('gate_passed', '1');
            document.body.style.overflow = '';
            overlay.classList.add('passed');
            overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
        } else {
            render();
        }
    });

    render();
})();

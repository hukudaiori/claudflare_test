(function () {
    const overlay = document.getElementById('gate-overlay');

    if (sessionStorage.getItem('gate_passed') === '1') {
        overlay.remove();
        return;
    }

    document.body.style.overflow = 'hidden';

    const TOTAL = 9;
    const CORRECT = new Set([1, 2, 4, 7]);
    const selected = new Set();

    const grid    = document.getElementById('gate-grid');
    const errorBar = document.getElementById('gate-error');
    const verifyBtn = document.getElementById('gate-verify-btn');
    const card    = document.getElementById('gate-card');

    for (let i = 1; i <= TOTAL; i++) {
        const cell = document.createElement('div');
        cell.className = 'rc-image-cell';

        const img = document.createElement('img');
        img.src = `mondai1/${i}.png`;
        img.alt = '';
        img.draggable = false;

        const check = document.createElement('div');
        check.className = 'rc-checkmark';
        check.textContent = '✓';

        cell.appendChild(img);
        cell.appendChild(check);
        cell.addEventListener('click', () => toggle(i, cell));
        grid.appendChild(cell);
    }

    function toggle(idx, cell) {
        if (selected.has(idx)) {
            selected.delete(idx);
            cell.classList.remove('selected');
        } else {
            selected.add(idx);
            cell.classList.add('selected');
        }
        hideError();
    }

    function hideError() {
        errorBar.style.display = 'none';
        errorBar.textContent = '';
    }

    function showError(msg) {
        errorBar.textContent = msg;
        errorBar.style.display = 'block';
    }

    function shake() {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
        card.addEventListener('animationend', () => card.classList.remove('shake'), { once: true });
    }

    verifyBtn.addEventListener('click', () => {
        if (selected.size === 0) {
            showError('画像を選択してください。');
            return;
        }

        const correct = selected.size === CORRECT.size &&
            [...selected].every(i => CORRECT.has(i));

        if (!correct) {
            shake();
            showError('もう一度お試しください。');
            selected.clear();
            document.querySelectorAll('.rc-image-cell').forEach(c => c.classList.remove('selected'));
            return;
        }

        sessionStorage.setItem('gate_passed', '1');
        document.body.style.overflow = '';
        overlay.classList.add('passed');
        overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
    });
})();

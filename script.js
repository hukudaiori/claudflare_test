// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// メニュー項目クリック時に閉じる
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// スライダー
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 5000);

// お知らせデータ
const newsData = {
    'x-opening': {
        title: "公式X（旧Twitter）アカウントを開設しました",
        date: "2026.04.21",
        body: "愛好会の公式Xアカウントを開設しました。開発進捗や、コミケ等のイベント出展情報を発信していきます。<br><br><a href='https://x.com/home' target='_blank'>公式Xはこちら</a>"
    },
    'note-article': {
        title: "note記事公開：愛好会の紹介及び活動方針について",
        date: "2026.04.21",
        body: "設立の想いや今後の活動計画についての詳細記事を公開しました。ぜひご覧ください。<br><br><a href='https://note.com/tmcit_vngame/n/n0df0a68c084d' target='_blank'>note記事を読む</a>"
    }
};

function openModal(id) {
    const data = newsData[id];
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-date').innerText = data.date;
    document.getElementById('modal-body').innerHTML = data.body;
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('news-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('news-modal').style.display = 'none';
}

// 入部申込フォーム
const joinForm = document.getElementById('join-form');
const formMessage = document.getElementById('form-message');

joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = joinForm.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    formMessage.hidden = true;
    formMessage.className = 'form-message';

    try {
        const res = await fetch(joinForm.action, {
            method: 'POST',
            body: new FormData(joinForm),
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            submitBtn.textContent = '送信しました';
            formMessage.textContent = '送信しました。担当者よりご連絡をお待ちください。';
            formMessage.classList.add('success');
            joinForm.reset();
        } else {
            throw new Error();
        }
    } catch {
        formMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
        formMessage.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
    }
    formMessage.hidden = false;
});

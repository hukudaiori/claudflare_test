// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// バックグラウンドスライダーの実装
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 5000; // 切り替え間隔（ミリ秒）

function nextSlide() {
    // 現在のスライドを非アクティブに
    slides[currentSlide].classList.remove('active');
    // 次のスライドへ（最後なら最初に戻る）
    currentSlide = (currentSlide + 1) % slides.length;
    // 次のスライドをアクティブに
    slides[currentSlide].classList.add('active');
}

// 指定間隔で繰り返す
setInterval(nextSlide, slideInterval);

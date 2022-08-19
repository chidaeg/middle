'use strict';

// --------------------
// スムーススクロール
// --------------------
const anchors = document.querySelectorAll('a[href^="#"]'); 
const header = document.querySelector('header').offsetHeight; //header高さ
const urlHash = location.hash; // URLのアンカー（#以降の部分）を取得

// 各 anchor にクリックイベント
for ( let i = 0; i < anchors.length; i++ ) {
    anchors[i].addEventListener('click', (e) => {
        e.preventDefault();  //デフォルトのクリックイベント無効化

    // 各 anchor の href属性取得
    const href= anchors[i].getAttribute("href");

    // topに戻る以外のアンカー
    if (href !== '#') {

        // スクロール先の要素を取得 （アンカーの リンク先 #.. の # を取り除いた名前と一致する id名の要素）
        const target = document.getElementById(href.replace('#', ''));

        // スクロール先の要素の位置を取得
        // header の高さ引く
        const position = window.pageYOffset + target.getBoundingClientRect().top - header;

        // スクロールアニメーション
        window.scroll({
            top: position,      // スクロール先要素の左上までスクロール
            behavior: 'smooth'  // スクロールアニメーション
        });

        // topに戻る
        } else {
            // スクロールアニメーション
            window.scroll({
                top: 0,  // スクロール先
                behavior: 'smooth'    // スクロールアニメーション
            });

        }
    });
}

// --------------------
// アコーディオン
// --------------------
const triggers = document.querySelectorAll(".js-accordion__trigger");
const contents = document.querySelectorAll(".js-accordion__content");

for (let i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function () {
        contents[i].classList.toggle("js-accordion__active");
    });
}

// --------------------
// scroll ふわっと表示
// --------------------
window.addEventListener("load", function() {
    const target = document.querySelectorAll('.js-scroll__target')
    const targetArray = Array.prototype.slice.call(target);
    const options = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(callback, options)
    targetArray.forEach(function (tgt) {
        observer.observe(tgt)
    });

    function callback(entries) {
        entries.forEach(function(entry) {
            const target = entry.target;
            if (entry.isIntersecting && !target.classList.contains('is-active')) {
            target.classList.add('is-active');
            }
        });
    };
});

// --------------------
// swiper
// --------------------
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    loopAdditionalSlides: 1,
    slidesPerView: 1,
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        waitForTransition: false, 
    },
    spaceBetween: 28,
    breakpoints: { 
        576: {
            slidesPerView: 1,
            spaceBetween: 28,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 56,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 56,
        }
    },
});
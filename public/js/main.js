'use strict';

// --------------------
// スムーススクロール
// --------------------
const anchors = document.querySelectorAll('a[href^="#"]'); 
const header = document.querySelector('header').offsetHeight;
const urlHash = location.hash;

for ( let i = 0; i < anchors.length; i++ ) {
    anchors[i].addEventListener('click', (e) => {
        e.preventDefault();
    const href= anchors[i].getAttribute("href");

    if (href !== '#') {
        const target = document.getElementById(href.replace('#', ''));
        const position = window.pageYOffset + target.getBoundingClientRect().top - header;

        window.scroll({
            top: position, 
            behavior: 'smooth' 
        });

        } else {
            window.scroll({
                top: 0,
                behavior: 'smooth' 
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
            slidesPerView: 1,
            spaceBetween: 56,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 56,
        }
    },
});
// --------------------
// hamburger
// --------------------

const spOpen = document.getElementById('js-spOpen');
const nav = document.getElementById('js-nav');
const blackBg = document.getElementById('js-blackBg');
const links = document.querySelectorAll('#js-nav a');

spOpen.addEventListener('click', () => {
    nav.classList.toggle('is-active');
});
blackBg.addEventListener('click', () => {
    nav.classList.remove('is-active');
});
links.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('is-active');
    });
});

// --------------------------------
// 問い合わせフォームの入力チェック
// --------------------------------
const validationForm = document.querySelector('.js-validation');
if(validationForm) {
    const errorClassName = 'js-error';
    const requiredElems = document.querySelectorAll('.js-required');
    const createError = (elem, errorMessage) => {
        const errorSpan = document.createElement('span');
        errorSpan.classList.add(errorClassName);
        errorSpan.textContent = errorMessage;
        elem.parentNode.appendChild(errorSpan);
    }
    const privacyCheck = document.getElementById('agreement');
    const submit = document.getElementById('js-submit');

    requiredElems.forEach( (elem) => {
        elem.addEventListener('change', () => {
        const elemValue = elem.value.trim(); 
        if(
            elemValue.length !== 0 &&
            //プライバシーチェックがチェックありなら
            privacyCheck.checked === true
            ) {
                //submitボタンをdisableしない
                submit.disabled = false;
                submit.classList.remove('js-disabled');
            } else {
                //submitボタンをdisable
                submit.disabled = true;
                submit.classList.add('js-disabled');
            }
        });
    });
                
    validationForm.addEventListener('submit', (e) => {
        //初期化
        const errorElems = validationForm.querySelectorAll('.' + errorClassName);
        errorElems.forEach( (elem) => {
            elem.remove(); 
        });
        requiredElems.forEach( (elem) => {
            const elemValue = elem.value.trim(); 
            if(elemValue.length === 0) {
                //空欄ならエラーメッセージを表示
                createError(elem, '入力は必須です');
                e.preventDefault();
            }
        });
    });
};
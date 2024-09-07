// index.js
// import '@material/web/button/filled-button.js';
// import '@material/web/button/outlined-button.js';
// import '@material/web/checkbox/checkbox.js';

let bannerArr = [];
let radioArr = [];
let currentBannerIndex = 0;
let currentRadioIndex = 0;
let intervalId = null;
let stopFlag = false;
const duration = 2000;

const bannerHtmlArr = [
    `<div class="banner1"></div>`,
    `<div class="banner2"></div>`,
    `<div class="banner3"></div>`,
]

window.onload = async () => {
    bannerArr = [...document.querySelectorAll('.header_banner > div')];
    radioArr = [...document.querySelectorAll('.header_banner_nav input[type=radio]')]
    fnBannerAddInterverEvent(fnBannerRoop)

}


/**
 * 배너 이벤트
 */
function fnBannerAddInterverEvent(cb) {
    intervalId = setInterval(fnBannerRoop, duration);
}

/**
 * 배너 이벤트 제거
 */
function fnBannerRemoveInterverEvent() {
    clearInterval(intervalId)
    intervalId = null;
}


/**
 * 배너, 라디오 루프
 */
function fnBannerRoop() {
    // console.log('currentBannerIndex', currentBannerIndex);

    // const headerBanner = document.getElementById('header_banner');
    // bannerArr = [...headerBanner.children];

    // 트랜지션 시간 (초 단위)
    const transitionTime = 0.5;

    // 첫 번째 배너를 왼쪽으로 이동
    bannerArr[0].style.transition = `transform ${transitionTime}s ease`;
    bannerArr[0].style.transform = 'translateX(-100%)';

    // 두 번째 배너를 현재 위치로 이동
    bannerArr[1].style.transition = `transform ${transitionTime}s ease`;
    bannerArr[1].style.transform = 'translateX(-100%)';

    // 트랜지션이 끝난 후 정리 및 새 배너 추가
    setTimeout(() => {
        // 첫 번째 배너 제거
        bannerArr[0].remove();

        // 남은 배너의 스타일 완전 초기화 즉시 반영
        bannerArr[1].style.transition = 'none';
        bannerArr[1].style.transform = 'translateX(0)';

        // 강제 리플로우 (레이아웃 재계산)
        // headerBanner.offsetHeight;

        // 트랜지션 다시 활성화, 다른 css 파일에서 선언된게 있다면 그거 사용
        bannerArr[1].style.transition = '';


        // 새로운 배너 추가

        // 다음 배너 숫자
        let nextBannerNum = (currentBannerIndex + 1) % 3 + 1;

        // 배너가 3이면 맨앞으로 초기화 0,1,2 여야 하니까
        nextBannerNum === 3 ? nextBannerNum = 0 : nextBannerNum;
        // console.log('nextBannerNum ', nextBannerNum);


        const newBanner = document.createElement('div');
        newBanner.className = `banner${nextBannerNum}`;
        newBanner.style.transform = 'translateX(100%)';
        document.querySelector('.header_banner').appendChild(newBanner)
        bannerArr = [...document.querySelectorAll('.header_banner > div')];


        // 인덱스 업데이트
        currentBannerIndex = (currentBannerIndex + 1) % 3; // 3은 총 배너 수, => 0 | 1 | 2


        // 라디오
        for (let i = 0; i < radioArr.length; i++) {
            // console.log(radioArr[i])
            // console.log(radioArr[i].checked)
            if (i === currentBannerIndex) {
                radioArr[i].checked = true;
            } else {
                radioArr[i].checked = false;
            }
        }

        fnBannerPageNumberSetting()


        //* [당기기]
        // 새 배너를 오른쪽에서 현재 위치로 이동
        setTimeout(() => {
            newBanner.style.transition = `transform ${transitionTime}s ease`;
            newBanner.style.transform = 'translateX(0)';

            // console.log('currentBannerIndex2', currentBannerIndex);


        }, 50);


        console.log('\n');
    }, 500);  // 트랜지션 시간과 같아야함
}


/**
 * 배너 라디오 버튼 클릭 이벤트 함수
 */
function fnBannerRadioClick(clickIndex = 0) {
    console.log('fnBannerRadioClick');
    fnBannerRemoveInterverEvent()

    /*
 
     // 클릭한 라디오 인덱스
     currentRadioIndex = clickIndex
     currentBannerIndex = clickIndex
     fnBannerPageNumberSetting()
 
     // 클릭한 인덱스를 제외하고 다 false 처리
     for (let i = 0; i < radioArr.length; i++) {
         const input = radioArr[i];
         if (i === currentRadioIndex) {
             input.checked = true;
         } else {
             input.checked = false;
         }
     }
 
 
     for (let i = 0; i < bannerArr.length; i++) {
 
         // 클릭 한 배너를 보여준다
         if (i === currentBannerIndex) {
             // 다음 배너 인덱스
             // currentBannerIndex = (i + 1) % bannerArr.length;
 
             bannerArr[i].classList.remove('none');
 
             // 트랜지션을 걸어놨으니 지연효과를 맞춰서 주자
             setTimeout(() => {
                 bannerArr[i].classList.add('active'); // 공간 차지 O
             }, 50)
 
             // 다른 배너는 숨긴다
         } else {
             bannerArr[i].classList.remove('active');
             bannerArr[i].classList.add('none');   // 공간 차지 X
 
         }
 
     }
 
     if (!stopFlag) {
         setTimeout(() => {
             fnBannerAddInterverEvent(fnBannerRoop)
         }, 500);
     }
     */
}

/**
 * 배너 숫자 셋팅 함수
 */
function fnBannerPageNumberSetting() {
    document.getElementById('current_banner_page').innerText = (currentBannerIndex + 1).toString()
    document.getElementById('last_banner_page').innerText = "3"
}

function fnBannerPlayerStart() {
    stopFlag = false;
    fnBannerAddInterverEvent()
    document.getElementById('banner_player').innerHTML = `<span class="material-symbols-outlined" onclick="fnBannerPlayerStop()">stop_circle</span>`


}

function fnBannerPlayerStop() {
    stopFlag = true;
    fnBannerRemoveInterverEvent();
    document.getElementById('banner_player').innerHTML = '<span class="material-symbols-outlined" onclick="fnBannerPlayerStart()">play_circle</span>'
}

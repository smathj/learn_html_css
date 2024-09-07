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
const duration = 3000;

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
    console.log('currentBannerIndex', currentBannerIndex);

    const headerBanner = document.getElementById('header_banner');
    bannerArr = [...headerBanner.children];

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
        headerBanner.offsetHeight;

        // 트랜지션 다시 활성화, 다른 css 파일에서 선언된게 있다면 그거 사용
        bannerArr[1].style.transition = '';


        // 새로운 배너 추가
        const newBanner = document.createElement('div');
        newBanner.className = `banner${currentBannerIndex + 1}`;
        newBanner.style.transform = 'translateX(100%)';
        headerBanner.appendChild(newBanner);


        // 새 배너를 오른쪽에서 현재 위치로 이동
        setTimeout(() => {
            newBanner.style.transition = `transform ${transitionTime}s ease`;
            newBanner.style.transform = 'translateX(0)';
        }, 20);

        // 인덱스 업데이트
        currentBannerIndex = (currentBannerIndex + 1) % 3; // 3은 총 배너 수, => 0 | 1 | 2

        console.log('\n');
    }, transitionTime * 1000);
}






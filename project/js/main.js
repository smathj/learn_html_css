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


    //* [배너]
    bannerArr[currentBannerIndex].classList.remove('active');
    bannerArr[currentBannerIndex].classList.add('none');   // 공간 차지 X

    // 다음 배너 인덱스
    currentBannerIndex = (currentBannerIndex + 1) % bannerArr.length;

    bannerArr[currentBannerIndex].classList.remove('none');

    // 트랜지션을 걸어놨으니 지연효과를 맞춰서 주자
    setTimeout(() => {
        bannerArr[currentBannerIndex].classList.add('active'); // 공간 차지 O
    }, 50)


    //* [라디오]
    // 다음 라디오 인덱스
    currentRadioIndex = (currentRadioIndex + 1) % radioArr.length;
    for (let i = 0; i < radioArr.length; i++) {
        const input = radioArr[i];
        if (i === currentRadioIndex) {
            input.checked = true;
        } else {
            input.checked = false;
        }

    }

    fnBannerPageNumberSetting()


}

/**
 * 배너 라디오 버튼 클릭 이벤트 함수
 */
function fnBannerRadioClick(clickIndex = 0) {

    fnBannerRemoveInterverEvent()

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
}

/**
 * 배너 숫자 셋팅 함수
 */
function fnBannerPageNumberSetting() {
    document.getElementById('current_banner_page').innerText = (currentBannerIndex + 1).toString()
    document.getElementById('last_banner_page').innerText = bannerArr.length.toString()
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








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
const duration = 1000;


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

    console.log('currentBannerIndex', currentBannerIndex)
    console.log('bannerArr.length', bannerArr.length)


    currentBannerIndex = (currentBannerIndex + 1) % bannerArr.length;

    // 마지막 배너일때
    if (currentBannerIndex + 1 === bannerArr.length) {
        // console.log('왓어')
        // // 제일 앞 요소 복사
        // const firstHtml = bannerArr[0].outerHTML
        //
        // // 제일 마지막에 첫번째 요소 복사
        // document.getElementById('header_banner')
        //     .insertAdjacentHTML('beforeend', firstHtml);
        //
        // bannerArr = [...document.querySelectorAll('.header_banner > div')];


        setTimeout(() => {
            bannerArr[0].style.transform = `translateX(${bannerArr.length * 100}%)`;
        }, 50);

    } else {

        setTimeout(() => {
            bannerArr[currentBannerIndex].style.transform = `translateX(-${currentBannerIndex * 100}%)`;
        }, 50);


    }


    /*

        console.log('현재 배너 인덱스', currentRadioIndex)
        // const offsetWidth = bannerArr[currentBannerIndex].offsetWidth

        let currentIdx = currentBannerIndex;
        let nextIdx = (currentBannerIndex + 1) % bannerArr.length;

        if (nextIdx + 1 === bannerArr.length) {
            console.log('nextIdx 는 마지막 배너임')

            // currentIdx 복사, 삭제
            const firstHtml = bannerArr[0].outerHTML
            console.log('firstHtml', firstHtml)

            // 제일 마지막에 첫번째 요소 복사
            document.getElementById('header_banner')
                .insertAdjacentHTML('beforeend', firstHtml);

            bannerArr = [...document.querySelectorAll('.header_banner > div')];

            setTimeout(() => {
                bannerArr[(currentBannerIndex + 1)].style.transform = `translateX(-${(currentBannerIndex + 1) * 100}%)`;
            }, 50)

            bannerArr[0].remove();
            bannerArr = [...document.querySelectorAll('.header_banner > div')];
            currentBannerIndex = bannerArr.length - 1;


            // bannerArr = [...document.querySelectorAll('.header_banner > div')];
            //
            // console.log(bannerArr.length)
            // currentBannerIndex = currentBannerIndex + 1;
            //
            //
            // setTimeout(() => {
            //     bannerArr[currentBannerIndex].style.transform = `translateX(-${currentBannerIndex * 100}%)`;
            // }, 50)
            //
            // bannerArr[0].remove();
            // currentBannerIndex = 0;


        } else {
            currentBannerIndex = nextIdx;
            setTimeout(() => {
                bannerArr[currentBannerIndex].style.transform = `translateX(-${currentBannerIndex * 100}%)`;
            }, 50)
        }

    */

    console.log('\n');
}







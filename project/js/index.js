window.onload = () => {

    console.log('main.js...')

    let liArr = document.querySelectorAll('.header_section_1 > ul li:not(:first-child)');
    liArr.forEach((li) => {

        li.addEventListener('mouseenter', (event) => {

            // 다른 메뉴바 올려서 숨기기
            document.querySelectorAll('.header_info > ul').forEach((ul) => {
                ul.classList.add('none');
                ul.style.animationName = 'menuBarUp';
                ul.style.animationDuration = '0.5s';
                ul.style.animationFillMode = 'forwards';
                ul.style.animationTimingFunction = 'ease-in-out';
            });


            // 현재 마우스 올린 메뉴바 아래로 내리기
            const targetId = `${li.classList[1]}_item`;
            let ul = document.getElementById(targetId);

            ul.classList.remove('none');
            ul.style.animationName = 'menuBarDown';
            ul.style.animationDuration = '0.5s';
            ul.style.animationFillMode = 'forwards';
            ul.style.animationTimingFunction = 'ease-in-out';


            // 현재 메뉴 마우스 벗어나면 메뉴바 올려서 숨기기
            ul.addEventListener('mouseleave', (event) => {
                ul.style.animationName = 'menuBarUp';
                ul.style.animationDuration = '0.5s';
                ul.style.animationFillMode = 'forwards';
                ul.style.animationTimingFunction = 'ease-in-out';
            })
        })
    })

    //! 배너 회전
    setInterval(() => {
        const divArr = [...document.querySelectorAll('.body_ad div')];
        let targetIndex = 0;
        let lastIndex = divArr.length - 1;
        const nowDiv = divArr.find((div, index) => {
            const isActive = div.classList[div.classList.length - 1];
            targetIndex = index;
            return isActive === 'active'
        })
        nowDiv.style.animation = 'rm_my_ani 0.1s ease';
        nowDiv.classList.remove('active');

        setTimeout(() => {
            nowDiv.style.display = 'none'
        }, 100)

        const nextDiv = divArr[targetIndex + 1 <= lastIndex ? targetIndex + 1 : 0];
        nextDiv.style.display = 'flex';
        nextDiv.style.animation = 'my_ani 0.1s ease'
        nextDiv.classList.add('active')


    }, 1500)
}



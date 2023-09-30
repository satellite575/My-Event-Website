var doms = {
    carousel: document.querySelector('.carousel'),
};

const intervalTime = 3000;

/*移动轮播图到第几个板块 */
function refresh(index) {
    doms.carousel.style.transform = `translateX(-${index}00%)`;
    doms.carousel.style.transition = '.5s';
}

function nextSlide() {
    index = (index + 1);
    refresh(index);
}

function autoPlay() {
    nextSlide();
}


// 设置定时器，每隔 intervalTime 毫秒调用 autoPlay 函数
const intervalId = setInterval(autoPlay, intervalTime);
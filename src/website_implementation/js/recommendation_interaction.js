var doms = {
    imgbox: document.querySelector('.img_box'),
    leftbtn: document.querySelector('.left_btn'),
    rightbtn: document.querySelector('.right_btn'),
};

/* 记录目前这是第几张 */
var curIndex = 0;

/* 移动轮播图到第几个板块 */
function moveTo(index) {
    doms.imgbox.style.transform = `translateX(-${index}00%)`;
    doms.imgbox.style.transition = '.5s';
    curIndex = index;
}

function init() {
    /* 复制第一张图 */
    var first = doms.imgbox.firstElementChild.cloneNode(true);
    /* 复制最后一张图 */
    var last = doms.imgbox.lastElementChild.cloneNode(true);
    /* 将第一张图放到末尾 */
    doms.imgbox.appendChild(first);
    /* 将最后一张图放到开头 */
    doms.imgbox.insertBefore(last, doms.imgbox.firstElementChild);
    /* 将最后一张设置为绝对定位 */
    last.style.position = 'absolute';
    last.style.transform = 'translateX(-100%)';
}

init();

function leftNext() {
    if (curIndex === 0) {
        doms.imgbox.style.transform = 'translateX(-300%)';
        doms.imgbox.style.transition = 'none';
        doms.imgbox.clientHeight; /* 强制渲染 */
        moveTo(2);
    } else {
        moveTo(curIndex - 1);
    }
}

function rightNext() {
    if (curIndex === 2) {
        doms.imgbox.style.transform = 'translateX(100%)';
        doms.imgbox.style.transition = 'none';
        doms.imgbox.clientHeight; /* 强制渲染 */
        moveTo(0);
    } else {
        moveTo(curIndex + 1);
    }
}

/* 自动向右翻页 */

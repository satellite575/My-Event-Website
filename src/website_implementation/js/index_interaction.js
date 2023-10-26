var doms = {
    imgbox: document.querySelector('.img_box'),
    leftbtn: document.querySelector('.left_btn'),
    rightbtn: document.querySelector('.right_btn'),
};

/* Record the current index */
var curIndex = 0;

/* Move the carousel to a specific index */
function moveTo(index) {
    doms.imgbox.style.transform = `translateX(-${index}00%)`;
    doms.imgbox.style.transition = '.5s';
    curIndex = index;
}

function init() {
    /* Copy the first image */
    var first = doms.imgbox.firstElementChild.cloneNode(true);
    /* Copy the last image */
    var last = doms.imgbox.lastElementChild.cloneNode(true);
    /* Place the first image at the end */
    doms.imgbox.appendChild(first);
    /* Place the last image at the beginning */
    doms.imgbox.insertBefore(last, doms.imgbox.firstElementChild);
    /* Set the last image to absolute positioning */
    last.style.position = 'absolute';
    last.style.transform = 'translateX(-100%)'
}

init();

function leftNext() {
    if (curIndex == 0) {
        doms.imgbox.style.transform = 'translateX(-300%)';
        doms.imgbox.style.transition = 'none';
        doms.imgbox.clientHeight; /* Force a reflow */
        moveTo(2);
    } else {
        moveTo(curIndex - 1);
    }
}

function rightNext() {
    if (curIndex == 2) {
        doms.imgbox.style.transform = 'translateX(100%)';
        doms.imgbox.style.transition = 'none';
        doms.imgbox.clientHeight; /* Force a reflow */
        moveTo(0);
    } else {
        moveTo(curIndex + 1);
    }

}

doms.leftbtn.onclick = leftNext;
doms.rightbtn.onclick = rightNext;

/* Auto play */
function autoPlay() {
    timer = setInterval(function () {
        rightNext();
    }, 2500);
}

autoPlay();

/* Pause autoplay on mouse hover */
doms.imgbox.addEventListener("mouseover", function () {
    clearInterval(timer);
});

/* Resume autoplay on mouse leave */
doms.imgbox.addEventListener("mouseout", function () {
    autoPlay();
});

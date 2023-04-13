const progress = document.querySelector(".progress");
const slide = document.querySelectorAll(".animate-slider__slide");

function progressRun(param) {
    let width = 0;

    if (param)
        setInterval(() => {
            width++;
            progress.style.width = width + "%";

            if (width >= 100) width = 0;
        }, 100);
}

progressRun(true);

function animateX() {
    slide.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = `translateX(${980 - 164 * index}px)`;
        }, index * 400);

        setTimeout(() => {
            item.style = "";
        }, 5000);
    });
}

function animateY() {
    const arr = Array.from(slide);

    // перебор массива в обратном порядке
    arr.slice()
        .reverse()
        .forEach((item, index) => {
            // item.classList.add("y");
            setTimeout(() => {
                if (index % 2 !== 0) {
                    item.style.top = 0;
                }
                item.style.bottom = 0;
            }, index * 500);

            // сброс к исходному состоянию
            setTimeout(() => {
                if (index % 2 !== 0) {
                    item.style.top = "100px";
                }
                item.style.bottom = "100px";
                item.style = "";
            }, 5000);
        });
}

// Async animate
function promisrFunc() {
    new Promise(function (resolve, reject) {
        slide.forEach((item, index) => {
            item.style = "";

            setTimeout(() => {
                item.style.transform = `translateX(${980 - 164 * index}px)`;

                if (index === slide.length - 1) {
                    resolve("ok");
                }
            }, index * 400);
        });
    })
        .then((data) => {
            return new Promise(function (resolve, reject) {
                if (data) {
                    slide.forEach((item) => {
                        setTimeout(() => {
                            item.style.transform = `translateX(0)`;
                            resolve(data);
                        }, 3000);
                    });
                }
            });
        })
        .then((param) => {
            return new Promise(function (resolve, reject) {
                if (param) {
                    const arr = Array.from(slide);

                    setTimeout(() => {
                        slide.forEach((item) => {
                            item.classList.add("y");
                        });
                    }, 1000);

                    setTimeout(() => {
                        // перебор массива в обратном порядке
                        arr.slice()
                            .reverse()
                            .forEach((item, index) => {
                                setTimeout(() => {
                                    if (index % 2 !== 0) {
                                        item.style.top = 0;
                                    }
                                    item.style.bottom = 0;
                                }, index * 400);

                                // сброс к исходному состоянию
                                setTimeout(() => {
                                    if (index % 2 !== 0) {
                                        item.style.top = "100px";
                                    }

                                    item.style.bottom = "100px";

                                    item.style = "";
                                }, 4000);

                                setTimeout(() => {
                                    item.classList.remove("y");
                                    item.style.bottom = 0;
                                    resolve(param);
                                }, 5000);
                            });
                    }, 1250);
                }
            });
        })
        .then((elem) => {
            if (elem) {
                setTimeout(() => {
                    promisrFunc();
                }, 400);
            }
        });
}

promisrFunc();

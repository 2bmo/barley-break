"use strict";

var field = document.getElementById("field"),
    start = document.getElementsByTagName("button")[0],
    empty = document.getElementsByClassName("empty"),
    innerVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""],
    clicked = void 0,
    clickedVal = void 0,
    emptyNum = void 0,
    clickable = void 0;

function startCheck() {
    var startCount = 0;
    function increase() {
        startCount++;
        return startCount;
    }
    start.addEventListener("click", increase());
    if (startCount !== 0) {
        clearActive();
    }
}
function shuffled() {
    innerVal.sort(function () {
        return .5 - Math.random();
    });
    for (var i = 0, len = field.children.length; i < len; i++) {
        field.children[i].innerHTML = "" + innerVal[i];
    }
}
function getEmptyNum() {
    for (var i = 0, len = field.children.length; i < len; i++) {
        if (field.children[i].classList.contains("empty")) {
            emptyNum = i;
        }
    }
}
function makeClickable() {
    if (emptyNum == 0) {
        clickable = [1, 5, 4];
    } else if (emptyNum == 1) {
        clickable = [0, 4, 5, 6, 2];
    } else if (emptyNum == 2) {
        clickable = [1, 5, 6, 7, 3];
    } else if (emptyNum == 3) {
        clickable = [2, 6, 7];
    } else if (emptyNum == 4) {
        clickable = [0, 1, 5, 9, 8];
    } else if (emptyNum == 5) {
        clickable = [0, 1, 2, 6, 10, 9, 8, 4];
    } else if (emptyNum == 6) {
        clickable = [1, 2, 3, 7, 11, 10, 9, 5];
    } else if (emptyNum == 7) {
        clickable = [2, 3, 6, 10, 11];
    } else if (emptyNum == 8) {
        clickable = [4, 5, 9, 13, 12];
    } else if (emptyNum == 9) {
        clickable = [4, 5, 6, 10, 14, 13, 12, 8];
    } else if (emptyNum == 10) {
        clickable = [5, 6, 7, 11, 15, 14, 13, 9];
    } else if (emptyNum == 11) {
        clickable = [6, 7, 10, 14, 15];
    } else if (emptyNum == 12) {
        clickable = [8, 9, 13];
    } else if (emptyNum == 13) {
        clickable = [12, 8, 9, 10, 14];
    } else if (emptyNum == 14) {
        clickable = [13, 9, 10, 11, 15];
    } else if (emptyNum == 15) {
        clickable = [14, 10, 11];
    } else {
        clickable = [14, 10, 11];
    }
    for (var i = 0, len = clickable.length; i < len; i++) {
        field.children[clickable[i]].classList.add("active");
    }
}
function clearEmpty() {
    for (var i = 0, len = empty.length; i < len; i++) {
        if (empty[i].classList.contains("empty")) {
            empty[i].classList.remove("empty");
        }
    }
}
function addEmpty() {
    for (var i = 0, len = field.children.length; i < len; i++) {
        if (field.children[i].innerHTML == "") {
            field.children[i].classList.add("empty");
        }
    }
}
function clearActive() {
    for (var i = 0, len = field.children.length; i < len; i++) {
        field.children[i].classList.remove("active");
    }
}
function getClicked(p) {
    clicked = p.id;
    clickedVal = p.innerHTML;
}
function changeVal() {
    for (var i = 0, len = empty.length; i < len; i++) {
        if (empty[i].classList.contains("empty")) {
            empty[i].innerHTML = clickedVal;
        }
    }
}
function changeEmpty() {
    field.children[clicked].classList.add("empty");
    field.children[clicked].innerHTML = "";
}
function winCheck() {
    var rightVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
    for (var i = 0, len = field.children.length; i < len; i++) {
        if (field.children[i] == rightVal[i]) {
            var again = confirm("gz! wanna play again?");
            clearActive();
            if (again == true) {
                clearEmpty();
                shuffled();
                addEmpty();
                getEmptyNum();
                makeClickable();
            }
        }
    }
}

window.onload = function () {
    clearActive();
};
start.onclick = function () {
    startCheck();
    clearEmpty();
    shuffled();
    addEmpty();
    getEmptyNum();
    makeClickable();
};
for (var i = 0, len = field.children.length; i < len; i++) {
    field.children[i].onclick = function () {
        getClicked(this);
        changeVal();
        clearEmpty();
        changeEmpty();
        getEmptyNum();
        clearActive();
        winCheck();
        makeClickable();
    };
}
for (var i = 0; i < document.getElementsByClassName("row").length; i++) {
    if (document.getElementsByClassName("row")[i].lastElementChild.textContent === "1") {
        document.getElementsByClassName("row")[i].lastElementChild.style.backgroundColor = "green";
    }
    if (document.getElementsByClassName("row")[i].lastElementChild.textContent === "2") {
        document.getElementsByClassName("row")[i].lastElementChild.style.backgroundColor = "yellow";
    }
    if (document.getElementsByClassName("row")[i].lastElementChild.textContent === "3") {
        document.getElementsByClassName("row")[i].lastElementChild.style.backgroundColor = "orange";
    }
    if (document.getElementsByClassName("row")[i].lastElementChild.textContent === "4") {
        document.getElementsByClassName("row")[i].lastElementChild.style.backgroundColor = "red";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    for (var i = 0; i < document.getElementsByClassName("row").length; i++) {
        if (((document.getElementsByClassName("row")[i].lastElementChild.textContent === "1") || document.getElementsByClassName("row")[i].lastElementChild.textContent === "2")) {
            document.getElementsByClassName("row")[i].style.display = "none";
        }
    }
})

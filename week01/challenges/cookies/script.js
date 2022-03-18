for (var i = 0; i < document.getElementsByClassName("cookie").length;i++) {
    document.getElementsByClassName("cookie")[i].addEventListener("click", function() {
        if (this.getAttribute('src') === "cookie-2.jpg") {
            this.style.display = "none";
        }
        else {
            this.src ="cookie-2.jpg";
        }
    })
}
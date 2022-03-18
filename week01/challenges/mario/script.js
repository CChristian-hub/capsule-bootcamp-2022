$("body").keydown(function (e) {
    if (e.keyCode == 37) {
        $("img").attr("src", "./images/mario-left-1.png")
        $("#player").animate({ left: "-=50" }, 200);
    }
    if (e.keyCode == 38) {
        $("img").attr("src", "./images/mario-back-1.png")
        $("#player").animate({ top: "-=50" }, 200);
    }
    if (e.keyCode == 39) {
        $("img").attr("src", "./images/mario-right-1.png")
        $("#player").animate({ left: "+=50" }, 200);
    }
    if (e.keyCode == 40) {
        $("img").attr("src", "./images/mario-front-1.png")
        $("#player").animate({ top: "+=50" }, 200);
    }
});
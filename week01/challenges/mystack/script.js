var toggle = false;

$("#button_header").click(function () {
    $("#button_header").delay(500).fadeOut();
    $("#button_header").delay(500).fadeIn();
    $("#button_header").delay(500).fadeOut();
    $("#button_header").delay(500).fadeIn();
    $("#button_header").delay(500).fadeOut();
    $("#button_header").delay(500).fadeIn();
})

$("#color").click(function () {
    if (!toggle) {
        $(".stack_container").addClass("stack_container2");
        $(".stack_container").removeClass("stack_container");
        $(this).text("Color Stack / ON")
        toggle = !toggle;
    } else {
        $(".stack_container2").addClass("stack_container");
        $(".stack_container2").removeClass("stack_container2");
        $(this).text("Color Stack / OFF")
        toggle = !toggle;
    }
})

$(".bigger").click(function () {
    $(this).parent().animate({ transform: "scale(1.5, 1.5)" });
})
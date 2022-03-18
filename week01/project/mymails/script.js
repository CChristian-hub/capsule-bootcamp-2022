$("#count").text($("p").length);

$("body").on("click", '.trash', function () {
    $(this).parent().remove();
    $("#count").text($("p").length);
})

$("#btn-add").click(function () {
    $("body").append(`
        <div class="row">
            <img class="avatar" src="./assets/avatar-1.jpg" alt="avatar1_picture">
            <div>
                <h6>Eric Dupont</h6>
                <p>`+ $("#add-message").val() + `</p>
            </div>
            <img class="trash" src="./assets/trash.png" alt="trash_picto">
        </div>`
    );
    $("#add-message").val("");
    $("#count").text($("p").length);
});

$("#btn-search").click(function () {
    $("h6").each(function () {
        if ($("#search-message").val() == "") {
            $(this).parent().parent().show();
        } else {
            if ($(this).text() === $("#search-message").val()) {
                $(this).parent().parent().show();
            } else {
                $(this).parent().parent().hide()
            }
        }
    });
    $("#search-message").val("");
});

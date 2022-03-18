$(".item").click(function () {
    $(this).remove();
})

$("#button").click(function () {
    $("#main_container").append(`
    <div class="item" id="perso">
    <h3 id="titrePerso"><img src="images/meeting.svg" alt="">${$("#titre").val()}</h3>
    <p id="categoriePerso">${$("#categorie").val()}</p>
    <p id="datePerso">${$("#date").val()}</p>
    </div>`);
    $("#titre").val("");
    $("#categorie").val("");
    $("#date").val("");
    $("#perso").click(function () {
        $("#main_container").append(`
        <form>
        <label for="fname">Editer le titre:</label>
        <input type="text" id="editTitre" name="fname">
        <label for="lname">Editer la Catégorie:</label>
        <input type="text" id="editCategorie" name="lname">
        <label for="lname">Editer la Date:</label>
        <input type="text" id="editDate" name="lname">
        <input id="button2" type="button" value="Confirm">
        </form>`);
        $("#button2").click(function () {
            $("#titrePerso").text($("#editTitre").val());
            $("#categoriePerso").text($("#editCategorie").val());
            $("#datePerso").text($("#editDate").val());
            $("#editTitre").val("");
            $("#editCategorie").val("");
            $("#editDate").val("");
        });
    })
})
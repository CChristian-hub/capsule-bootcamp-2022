$("#user2").hide();

var stockArray = [];
var dashArray = [];
var posArray = [];
var points = 10;

var wordToArray = (word) => {
    for (var i = 0; i < word.length; i++) {
        stockArray.push(word[i]);
    }
}

const arrayToDash = (array) => {
    for (var i = 0; i < array.length; i++) {
        dashArray.push("_");
    }
}

$("#btnOne").click(function () {
    $("#user2").show();
    $("#user1").hide();
    wordToArray($("#textOne").val());
    arrayToDash(stockArray);
    $("#dashWord").text(dashArray);
})

const checkLetterExistence = (letter) => {
    var exists = 0;
    for (var i = 0; i < stockArray.length; i++) {
        if (letter === stockArray[i]) {
            posArray.push(i);
            exists = 1;
        }
    }
    if (exists) {
        return true;
    }
    return false;
}

const fillDashArray = () => {
    for (var i = 0; i < posArray.length; i++) {
        dashArray[posArray[i]] = stockArray[posArray[i]];
    }
}

const checkDashExistence = () => {
    for (var i = 0; i < dashArray.length; i++) {
        if (dashArray[i] === "_") {
            return true;
        }
    }
    return false;
}

$("#btnTwo").click(function () {
    if ($("#textTwo").val().length == 1) {
        if (checkLetterExistence($("#textTwo").val())) {
            fillDashArray();
            $("#dashWord").text(dashArray);
            if (!checkDashExistence()) {
                $("#user2").hide();
                $("#points").text(`You won ${points} points`);
            }
        } else {
            points--;
            $("#points").text(`You have ${points} points left`);
            if (points == 0) {
                $("#user2").hide();
                $("#points").text(`You lost`);
                $("#dashWord").text(stockArray);
            }
        }
        $("#textTwo").val("");
    }
})
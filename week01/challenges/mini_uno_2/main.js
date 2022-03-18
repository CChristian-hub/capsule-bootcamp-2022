var lastPlay = {
    couleur: 'bleu',
    chiffre: '6',
}

var cards = [
    {
        couleur: 'vert',
        chiffre: '6',
    },
    {
        couleur: 'rouge',
        chiffre: '6',
    },
    {
        couleur: 'bleu',
        chiffre: '9',
    },
    {
        couleur: 'vert',
        chiffre: '9',
    }
]

var playable = [];
var j = null;

for (var i = 0; i < cards.length; i++) {
    if ((cards[i].couleur === lastPlay.couleur) || (cards[i].chiffre === lastPlay.chiffre)) {
        playable.push(cards[i]);
        if (j === null) {
            j = i;
        }
    }
}

if (playable.length === 0) {
    console.log("Je passe mon tour");
} else {
    if (j !== null) {
        lastPlay = cards[j];
        cards.splice(j, 1);
    }
    if (cards.length === 1) {
        console.log("Uno");
    }
    if (cards.length === 0) {
        console.log("Gagné");
    }
}
$("#lastPlayed").append(`<div id="lastCard"class="card bleu">6</div>`);

$("#cardList").append(`<div id="cardOne" class="card vert">6</div>`);
$("#cardList").append(`<div id="cardTwo" class="card bleu">6</div>`);
$("#cardList").append(`<div id="cardThree" class="card rouge">9</div>`);
$("#cardList").append(`<div id="cardFour" class="card vert">9</div>`);


$("#cardOne").click(function () {
    if (($(this).text() === lastPlay.chiffre) || ("vert" === lastPlay.couleur)) {
        lastPlay.chiffre = $(this).text();
        lastPlay.couleur = "vert";
        $("#lastCard").text("6");
        $("#lastCard").attr("class", "card vert");
        $(this).remove();
    }
});

$("#cardTwo").click(function () {
    if (($(this).text() === lastPlay.chiffre) || ("bleu" === lastPlay.couleur)) {
        lastPlay.chiffre = $(this).text();
        lastPlay.couleur = "bleu";
        $("#lastCard").text("6");
        $("#lastCard").attr("class", "card bleu");
        $(this).remove();
    }
});

$("#cardThree").click(function () {
    if (($(this).text() === lastPlay.chiffre) || ("rouge" === lastPlay.couleur)) {
        lastPlay.chiffre = $(this).text();
        lastPlay.couleur = "rouge";
        console.log("card clicked");
        $("#lastCard").text("9");
        $("#lastCard").attr("class", "card rouge");
        $(this).remove();
        $("#alert").text("Gagné");
        $("#lastPlayed").text("");
    }
});

$("#cardFour").click(function () {
    if (($(this).text() === lastPlay.chiffre) || ("vert" === lastPlay.couleur)) {
        lastPlay.chiffre = $(this).text();
        lastPlay.couleur = "vert";
        $("#lastCard").text("9");
        $("#lastCard").attr("class", "card vert");
        $(this).remove();
        $("#alert").text("Uno");
    }
});
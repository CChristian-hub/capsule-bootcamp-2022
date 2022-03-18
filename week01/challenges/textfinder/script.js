var wordArray = document.getElementById("textarea").textContent.split(" ");
var wordCount = wordArray.length;
var wordResearched = "";
var wordResearchedCount = 0;

document.getElementById("button").addEventListener("click", function() {
    wordResearched = document.getElementById("input").value;
    wordResearchedCount = 0;
    if (wordResearched.length > 0) {
        for (var i = 0; i < wordArray.length; i++) {
            if (wordResearched.toLowerCase() === wordArray[i].toLowerCase()) {
                wordResearchedCount++;
            }
        }
        if (wordResearchedCount > 0) {
            document.getElementById("result").textContent = "Le mot " + wordResearched + " est présent " + wordResearchedCount + " fois dans le texte ci-dessus.";
        } else {
            document.getElementById("result").textContent = "Le mot " + wordResearched + " n'a pas été trouvé dans le texte ci-dessus."
        }
    } else {
        document.getElementById("result").textContent = "Il y a " + wordCount+ " mots dans le texte ci-dessus.";
    }
})
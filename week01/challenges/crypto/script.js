// This block of code permits one to create a new crypto currency
$("#main_container").append(`<div class="crypto_container"></div>`);
$("#main_container")
  .children()
  .last()
  .append(`<img src="images/ripple.png" alt="ripple" class="picto-crypto">`);
$("#main_container").children().last().append("<h6>Ripple</h6>");
$("#main_container").children().last().append(`<div class="divider"></div>`);
$("#main_container").children().last().append("<p>123123€</p>");

$("#main_container").append(`<div class="crypto_container"></div>`);
$("#main_container")
  .children()
  .last()
  .append(
    `<img src="images/litecoin.png" alt="litecoin" class="picto-crypto">`
  );
$("#main_container").children().last().append("<h6>Litecoin</h6>");
$("#main_container").children().last().append(`<div class="divider"></div>`);
$("#main_container").children().last().append("<p>123€</p>");
//Cryptocurrencies counter
$("span").text($(".crypto_container").length);
$("h4").text(
  "Vous avez " + $("span").text() + " crypto monnaies dans vote portefeuille"
);

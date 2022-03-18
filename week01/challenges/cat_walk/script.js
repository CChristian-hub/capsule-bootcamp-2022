// // var catArray = ["cat-run1", "cat-run2", "cat-run3", "cat-run4", "cat-run5", "cat-run6", "cat-run7", "cat-run8", "cat-run9", "cat-run10", "cat-run11", "cat-run12", "cat-run13"];

// for (var i = 0; i < catArray.length; i++) {
//     $("#" + catArray[i]).hide();
// }

// $("#cat-run1").show();

// var pos = 0;

// $("#action").click(function () {
//     $("#" + catArray[pos]).hide();
//     if (pos == 12) {
//         pos = -1;
//     }
//     pos++;
//     $("#" + catArray[pos]).show();
// })

var pos = 0;

var catSrcArray = ["./images/cat-1.jpg", "./images/cat-2.jpg",
    "./images/cat-3.jpg", "./images/cat-4.jpg", "./images/cat-5.jpg",
    "./images/cat-6.jpg", "./images/cat-7.jpg", "./images/cat-8.jpg",
    "./images/cat-9.jpg", "./images/cat-10.jpg", "./images/cat-11.jpg",
    "./images/cat-12.jpg", "./images/cat-13.jpg"]

$("#action").click(function () {
    if (pos == 12) {
        pos = -1;
    }
    pos++;
    $("img").attr("src", catSrcArray[pos]);
})
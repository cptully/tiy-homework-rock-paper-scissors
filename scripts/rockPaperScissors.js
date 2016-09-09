const rock = 0;
const paper = 1;
const scissors = 2;

$(function () {
    var personChoice;
    var computerChoice;

//    cleanUp();
    $("button").click(function () {
        cleanUp();
        // $("#outcome").removeClass();
        // $("#outcome").text("Let's see who wins...");

        personChoice = $(this).val();
        computerChoice = computerChoose();
        suspense(function () {
            whoWins(personChoice, computerChoice);
        });
    });
});

var gameState = (function () {
    var personScore = 0;
    var computerScore = 0;

    var pub = {};

    pub.getPersonScore = (function () {
        return personScore;
    });

    pub.getComputerScore = (function () {
        return computerScore;
    });

    pub.incPersobScore = (function () {
        personScore++;
    })

    pub.incComputerScore = (function () {
        computerScore++;
    })

    return pub;
}());

function cleanUp(){
    $("#player").removeClass();
    $("#computer").removeClass();
    $("#outcome").removeClass();
    $("#outcome").text("Let's see who wins...");
}

function whoWins(personChoice, computerChoice){
    cleanUp();
    if(personChoice == computerChoice) {
        $("#outcome").text("Tie game!");
        $("#outcome").addClass("tie");

        if (personChoice == rock) {
            $("#player").addClass("rockwins");
            $("#computer").addClass("rockwins");
            // $("#player img.transparent").attr("src", "../images/rock.png");
            // $("#computer img.transparent").attr("src", "../images/rock.png");
        } else if (personChoice == paper) {
            $("#player").addClass("paperwins");
            $("#computer").addClass("paperwins");
            // $("#player img.transparent").attr("src", "../images/paper.png");
            // $("#computer img.transparent").attr("src", "../images/paper.png");
        } else {
            $("#player").addClass("scissorswins");
            $("#computer").addClass("scissorswins");
            // $("#player img.transparent").attr("src", "../images/scissors.png");
            // $("#computer img.transparent").attr("src", "../images/scissors.png");
        }


        //alert("tie game");
    } else if (personChoice == rock){
        if (computerChoice == paper) {
            $("#outcome").addClass("lose");
            $("#outcome").text("Computer wins!");
            gameState.incComputerScore();
            $("#player").addClass("paperwins");
            $("#computer").addClass("papercoversrock");
            // $("#player img.transparent").attr("src", "../images/rock.png");
            // $("#computer img.transparent").attr("src", "../images/paper.png");
        } else { //scissors) {
            $("#outcome").addClass("win");
            $("#outcome").text("You won!!!");
            gameState.incPersobScore();
            $("#player").addClass("rockwins");
            $("#computer").addClass("brokenscissors");
            // $("#player img.transparent").attr("src", "../images/rock.png");
            // $("#computer img.transparent").attr("src", "../images/scissors.png");
        }
    } else if (personChoice == paper) {
        if (computerChoice == rock) {
            $("#outcome").addClass("win");
            $("#outcome").text("You won!!!");
            gameState.incPersobScore();
            // $("#player img.transparent").attr("src", "../images/paper.png");
            // $("#computer img.transparent").attr("src", "../images/rock.png");
            $("#player").addClass("paperwins");
            $("#computer").addClass("papercoversrock");
        } else { // scissors
            $("#outcome").addClass("lose");
            $("#outcome").text("Computer wins!");
            gameState.incComputerScore();
            // $("#player img.transparent").attr("src", "../images/paper.png");
            // $("#computer img.transparent").attr("src", "../images/scissors.png");
            $("#player").addClass("cutpaper");
            $("#computer").addClass("scissorswins");
        }
    } else { // scissors
        if (computerChoice == rock) {
            $("#outcome").addClass("lose");
            $("#outcome").text("Computer wins!");
            gameState.incComputerScore();
            $("#player").addClass("brokenscissors");
            $("#computer").addClass("rockwins");
            // $("#player img.transparent").attr("src", "../images/scissors.png");
            // $("#computer img.transparent").attr("src", "../images/rock.png");
        } else { //paper
            $("#outcome").addClass("win");
            $("#outcome").text("You won!!!");
            gameState.incPersobScore();
            $("#player").addClass("scissorswins");
            $("#computer").addClass("cutpaper");
            // $("#player img.transparent").attr("src", "../images/scissors.png");
            // $("#computer img.transparent").attr("src", "../images/paper.png");
        }

    }
    $("#player .score span").text(gameState.getPersonScore);
    $("#computer .score span").text(gameState.getComputerScore);
}

function computerChoose() {
    return Math.floor(Math.random() * 3) + 1;
}

function suspense (callback) {
    var countDown = 3;

    $("#counter").css("visibility", "visible");
    $("#counter").css("opacity", "100%");
    var timer = setInterval(function () {
        showCountDown(countDown);

        if (--countDown == -1) {
            clearInterval(timer);
            callback();
        }
    }, 1000);
}

const colors = ["red", "green", "blue", "black"];

function showCountDown(countDown){
    var counter = $("#counter");
    if (countDown == 0) {
        counter.fadeTo(1000, 0);
        counter.css("visibility", "hidden");
    } else {
        counter.css("color", colors[countDown]);
        counter.text(countDown);
        counter.fadeTo(1000, countDown/4); //function(){css("visibility", "hidden")});
    }
}

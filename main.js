"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const reportJokes = [];
let joke;
// Score Functions
// If user sets a score, the number of the score is saved (in the object(inside array) as a string)
// If user sets the score again for the same joke, replace the old score with the new (as a string)
const getScore1 = (joke) => {
    console.log(`joke in getScore: ${joke}`);
    reportJokes.forEach((item) => {
        if (item.joke === joke) {
            item.score = "1";
        }
    });
    console.log(reportJokes);
    document.getElementById("score_greet").innerHTML =
        "Thanks for rating 1 star!";
};
const getScore2 = () => {
    reportJokes.forEach((item) => {
        if (item.joke === joke) {
            item.score = "2";
        }
    });
    console.log(reportJokes);
    document.getElementById("score_greet").innerHTML =
        "Thanks for rating 2 stars!";
};
const getScore3 = () => {
    reportJokes.forEach((item) => {
        if (item.joke === joke) {
            item.score = "3";
        }
    });
    console.log(reportJokes);
    document.getElementById("score_greet").innerHTML =
        "Thanks for rating 3 stars!";
};
// Event listeners
const jokeButton = document
    .getElementById("joke_button")
    .addEventListener("click", fetchJoke);
const scoreButton1 = document
    .getElementById("1")
    .addEventListener("click", () => getScore1(joke));
const scoreButton2 = document
    .getElementById("2")
    .addEventListener("click", getScore2);
const scoreButton3 = document
    .getElementById("3")
    .addEventListener("click", getScore3);
const scoreDiv = document.getElementById("score");
// Asynch function - async/await FETCH
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "text/plain",
                },
            });
            if (!response.ok) {
                throw new Error("Fetch error");
            }
            joke = yield response.text(); // Get the response as plain text
            console.log(joke);
            document.getElementById("fetched_joke").innerHTML = `"${joke}"`;
            // Show div when joke button clicked id="score"
            scoreDiv.style.display = "block";
            //push joke data object to array:
            const d = new Date();
            let date = d.toISOString();
            reportJokes.push({
                joke: joke,
                score: " ",
                date: date,
            });
            console.log(reportJokes);
        }
        catch (error) {
            console.error("Fetch error:", error);
            document.getElementById("fetched_joke").innerHTML =
                "Oops! Something's wrong, please try again 😂";
        }
    });
}

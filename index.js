const lecontainer = document.querySelector("#lettercont");
const textarea = document.querySelector("#textarea");
const loadingdiv = document.querySelector("#loading");
var currenttimeout;
var alphabetjson;
async function getAlphabet() {
    alphabetobj = {}
    for (letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        let letterfetch = letter
        await fetch("https://text-to-speech-santiagorich.vercel.app/serverless.js?text=" + letterfetch).then(function(response) {
            response.text().then(function(data) {
                alphabetobj[letterfetch.toUpperCase()] = data
                loadingdiv.classList.add("hidden");
            })
        })
    }
    return alphabetobj;
}

getAlphabet().then(function(alphabetobj) {
    alphabetjson = alphabetobj;
    for (letter of Object.keys(alphabetjson)) {
        lecontainer.appendChild(createLetter(letter));
    }
    loadingdiv.style.display = "none";
})

alphabetstr = JSON.stringify(alphabetjson)


function createLetter(letter) {
    let audio = new Audio(alphabetjson[letter]);
    let letterdiv = document.createElement("div");
    letterdiv.classList.add("letter");
    letterdiv.id = "letter" + letter;
    letterdiv.innerText = letter;
    letterdiv.onclick = function() {
        audio.play();
    }
    return letterdiv;
}

document.addEventListener("keyup", function(e) {
    if (!e.target.id.includes("textarea")) {
        if (alphabetjson[e.key.toUpperCase()]) {
            let audio = new Audio(alphabetjson[e.key.toUpperCase()]);
            audio.play();
        } else {
            speech(e.key);
        }
    }
});

async function speech(text) {

    fetch("https://text-to-speech-santiagorich.vercel.app/serverless.js?text=" + text).then(function(response) {
        response.text().then(function(url) {
            console.log(url)
            let audio = new Audio(url);
            audio.play();
        })
    })
}

textarea.addEventListener("keyup", function(e) {
    clearTimeout(currenttimeout);
    currenttimeout = setTimeout(() => {
        clearTimeout(currenttimeout);

        if (this.value.length > 0) {
            speech(this.value);
        }
    }, 600);
});
alphabetstr = '{"A":"https://ttsmp3.com/created_mp3/ec304422c248b7e006f03bf57c97bb96.mp3","B":"https://ttsmp3.com/created_mp3/c8570743f387d077eba7678e21cd29e7.mp3","C":"https://ttsmp3.com/created_mp3/b320d42069003df5e2b08c5c7082ac5a.mp3","D":"https://ttsmp3.com/created_mp3/598784935094025266f0b4008c973d2c.mp3","E":"https://ttsmp3.com/created_mp3/23d2b789556c27bfa08b7a65b5efe7fa.mp3","F":"https://ttsmp3.com/created_mp3/14ecee9806c4c9561f65bdb5dd4fdf5e.mp3","G":"https://ttsmp3.com/created_mp3/29083cc8d4c0bd45c980f4c7cdf87960.mp3","H":"https://ttsmp3.com/created_mp3/93bb0040909e31dbad63e799702edb95.mp3","I":"https://ttsmp3.com/created_mp3/b93790af94d4aa1f57a7af92695dde4b.mp3","J":"https://ttsmp3.com/created_mp3/78db1085e2e5b412194532c2579bcaea.mp3","K":"https://ttsmp3.com/created_mp3/c7f140eb61fd8e90ff9bcab41c54476a.mp3","L":"https://ttsmp3.com/created_mp3/c880d6e06d8601e252aed9500aa71af3.mp3","M":"https://ttsmp3.com/created_mp3/b3f30dcb8259488f3b899088a1eac54b.mp3","N":"https://ttsmp3.com/created_mp3/6704d1a1e6ece51acd44d6ef8ea0ec76.mp3","O":"https://ttsmp3.com/created_mp3/c541b02ca07af5ad681ba83fa99093ae.mp3","P":"https://ttsmp3.com/created_mp3/7fc2d010c8acb144f8b4d542b4ebb89c.mp3","Q":"https://ttsmp3.com/created_mp3/6efb6064ab94855c0cb2b48fbd78cc69.mp3","R":"https://ttsmp3.com/created_mp3/eb0feed8219c27c57d31911f4660f568.mp3","S":"https://ttsmp3.com/created_mp3/8f4c7a49160baaedb4ccea5d70ad930a.mp3","T":"https://ttsmp3.com/created_mp3/8544e733a3906d8b59b312def2a9ed47.mp3","U":"https://ttsmp3.com/created_mp3/3e5888714ecc0a04e6aa6cfbc2d3076c.mp3","V":"https://ttsmp3.com/created_mp3/f33ab287b24f58f466aec2011d6c8983.mp3","W":"https://ttsmp3.com/created_mp3/942ea70404318b0a80901e2751716091.mp3","X":"https://ttsmp3.com/created_mp3/523e764be6c2b870a0b047c93f039d6f.mp3","Y":"https://ttsmp3.com/created_mp3/aa51dacc655d63c5dc2d6c8b0d6e3394.mp3","Z":"https://ttsmp3.com/created_mp3/5d7c1192da851908fe6af2f189379c30.mp3"}'
alphabetjson = JSON.parse(alphabetstr);
const lecontainer = document.querySelector("#lettercont");
const textarea = document.querySelector("#textarea");
var currenttimeout;

for (letter of Object.keys(alphabetjson)) {
    lecontainer.appendChild(createLetter(letter));
}

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

document.addEventListener("keydown", function(e) {
    if (!e.target.id.includes("textarea")) {
        if (alphabetjson[e.key.toUpperCase()]) {
            let audio = new Audio(alphabetjson[e.key.toUpperCase()]);
            audio.play();
        }
    }
});

async function speech(text) {
    fetch("http://localhost:3000/api/texttospeech?text=" + text).then(function(response) {
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
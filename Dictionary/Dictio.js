const searchInput = document.getElementById("searchinput");
const searchButton = document.getElementById("searchbutton");
const wordTitle = document.getElementById("wordtitle");
const wordDescription = document.getElementById("worddesc");
const audioButton = document.getElementById("audiobutton");
const resultContainer = document.getElementById("result-container");


searchButton.addEventListener("click", () => {
    search();
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

function search() {
    const item = searchInput.value.trim();
    if (item === '') {
        alert("Please Enter the word");
        return;
    }
    fetchDictData(item);
}

async function fetchDictData(item) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${item}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the data');
        }
        const data = await response.json();
        displayResult(data);

    } catch (error) {
        console.log(error);
    }
}

function displayResult(data) {
    resultContainer.style.display = 'block';
    const wordData = data[0];
    wordTitle.textContent = wordData.word;
    wordDescription.innerHTML = `
        <ul>
        ${wordData.meanings.map(meaning => `
            <li>
                <p><strong>Parts of Speech</strong>: ${meaning.partOfSpeech}</p>
            </li>
            <li>
                <p><strong>Definition</strong>: ${meaning.definitions[0].definition}</p>
            </li>
        `).join('\n')}
        </ul>
    `;
}
audioButton.addEventListener("click",()=>{
    const item = searchInput.value.trim();
    if (item === '') {
        alert("Please Enter the word");
        return;
    }
    speeak(item);
});

function speeak(word){
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang='en-US';
    speech.pitch=1;
    speech.volume=2;
    speech.rate=1;
    window.speechSynthesis.speak(speech);
}
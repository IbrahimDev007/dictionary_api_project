// fetch dectionary 
const fetchValue = async (value) => {
    const fetche = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    const res = await fetche.json();
    const data = await res;
    showData(data);

}
// search button 
document.getElementById('searchBtn').addEventListener('click', function () {
    const value = document.getElementById('inputValue').value;
    fetchValue(value);
})
//search press enter
document.getElementById('inputValue').addEventListener('keypress', function (e) {
    const value = document.getElementById('inputValue').value;
    if (e.key === 'Enter') {
        fetchValue(value);
    }
})
//show dectionary
const showData = (data) => {
    // console.log(data);
    let dectionary = document.getElementById('dictionary');
    dectionary.innerHTML = ``
    data.forEach(element => {
        console.log(element);
        const { word, phonetics, sourceUrls, meanings
        } = element;
        const me = meanings.map(el => {
            const { partOfSpeech, synonyms, antonyms, definitions } = el;
            return ` <h1 class="text-2xl font-bold">${partOfSpeech ? partOfSpeech : null}</h1><hr>
    <ul class="list-disc">
  
    ${definitions.map(el => {
                const { example, antonyms, synonyms, definition } = el
                return `
        ${definition ? `<li class="text-lg">${definition}</li>` : null}
        ${antonyms ? `<li class="text-lg">${antonyms}</li>` : null}
        ${synonyms ? `<li class="text-lg">${synonyms}</li>` : null}
      
        `
            })}
    </ul>
    ${synonyms ? `<h3 class="text-lg">Synonems:${synonyms}</h3>` : null}
    ${antonyms ? `<h3 class="text-lg">Antonyms:${antonyms}</h3>` : null}

    </div>`

        })

        console.log(me);
        dectionary.innerHTML = `

				<div class="flex justify-between">
					<h3 id="name" class="text-3xl font-extrabold">${word}</h3>
					<audio src="${phonetics ? phonetics[0].audio : null}" id="audio"></audio>
					<button class="btn" onclick="document.getElementById('audio').play()">
						<i class="fa-solid fa-play"></i>
					</button>
				</div>
                <div>
                ${me
            }
                  source: <a href="http://${sourceUrls ? sourceUrls[0] : null}" class="text-red-600 text-2xl">${sourceUrls[0]}</a>
			
  `
    });
}


const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpuword = document.getElementById("inp-word").value;
  
  if (!inpuword.trim()) {
    result.innerHTML = `<h3 class="error">Please enter a word</h3>`;
    return;
  }

  fetch(`${url}${inpuword}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data[0]);
      result.innerHTML = `       
        <div class="word">
          <h3>${data[0].word}</h3>
          <button id="play-sound"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0]?.partOfSpeech || ""}</p>
          <p>${data[0].phonetic || ""}</p>
        </div>
        <div class="word-meaning">
        ${data[0].meanings[0]?.definitions[0]?.definition || ""}
        </div>
        <div class="word-example">
        ${data[0].meanings[0]?.definitions[0]?.example || ""}
        </div>`;

      sound.setAttribute("src", data[0].phonetics[1]?.audio || data[0].phonetics[0]?.audio || "");

      const playButton = document.getElementById("play-sound");
      playButton.addEventListener("click", playsound);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playsound() {
  sound.play();
}

document.getElementById("year").textContent = new Date().getFullYear();

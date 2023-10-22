const wordsDisplay = document.querySelector('#words-display');
const sliderControl = document.querySelector('.slider-input');
const stopButton = document.querySelector('.stop-icon');
const playButton = document.querySelector('.play-button');
const playIcon = document.querySelector('#play');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('upload-button');
const speedLabel = document.getElementById('speed-label');
const sliderValue = document.getElementById('slider-value');

let isPlaying = false;
let isPaused = false;
let currentIndex = 0;
let timeoutCurrentValue;
const words = [];

sliderControl.addEventListener('input', () => {
  const value = sliderControl.value;
  sliderValue.textContent = `x${value}`;
});

playButton.addEventListener('click', () => {
  if (words.length === 0) {
    alert('Cargue un archivo antes de iniciar la reproducción.');
    return;
  }
  isPlaying = !isPlaying;
  if (isPlaying) {
    isPaused = false;
    playIcon.classList.remove('play-icon');
    playIcon.classList.add('pause-icon');
    displayWord();
  } else {
    playIcon.classList.remove('pause-icon');
    playIcon.classList.add('play-icon');
    isPaused = true;
    clearTimeout(timeoutCurrentValue);
  }
});

stopButton.addEventListener('click', () => {
  if (words.length === 0) {
    alert('Cargue un archivo antes de iniciar la reproducción.');
    return;
  }
  isPaused = true;
  isPlaying = false;
  currentIndex = 0;
  clearTimeout(timeoutCurrentValue);
  wordsDisplay.textContent = words[currentIndex];
  playIcon.classList.remove('pause-icon');
  playIcon.classList.add('play-icon');
});

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const xmlText = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const wordNodes = xmlDoc.getElementsByTagName('word');
      words.length = 0;
      for (let i = 0; i < wordNodes.length; i++) {
        words.push(wordNodes[i].textContent);
      }
    };
    reader.readAsText(file);
  }
});

function displayWord() {
  if (!isPaused) {
    playIcon.classList.remove('play-icon');
    playIcon.classList.add('pause-icon');
    wordsDisplay.textContent = words[currentIndex];
    currentIndex = (currentIndex + 1) % words.length;
  }
  const speed = 1000 / sliderControl.value;
  timeoutCurrentValue = setTimeout(displayWord, speed);
}

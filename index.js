const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const oscillator = audioCtx.createOscillator();

oscillator.type = 'sawtooth';
oscillator.connect(audioCtx.destination);

let isPlaying = false;
let isNoteSelected = false;
let isConnected = false;

const handlePlay = () => {
  if (isPlaying && isNoteSelected) {
    oscillator.connect(audioCtx.destination);
    isConnected = true;
    return;
  }
  if (isConnected) {
    oscillator.disconnect(audioCtx.destination);
    isConnected = false;
  }
}

const frequency = document.querySelector('#input-notes');

frequency.addEventListener('input', function() {
  let freq = this.value;
  setFrequency(freq)
}, false);

frequency.addEventListener('mousedown', function () {
  isNoteSelected = true;
  handlePlay();
  console.log(isNoteSelected)
})

document.addEventListener('mouseup', function () {
  isNoteSelected = false;
  handlePlay();
  console.log(isNoteSelected)
})

setFrequency = (freq) => {
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
}

const mouthUp = document.querySelector('.open-mouth-up');
const mouthDown = document.querySelector('.open-mouth-down');

document.addEventListener('keydown', (e) => {
  const name = e.key;
  if (name === " ") {
    if (!e.repeat) {
      mouthUp.classList.add('visible');
      mouthUp.classList.remove('hidden');
      mouthDown.classList.add('visible');
      mouthDown.classList.remove('hidden');
      isPlaying = true;
      console.log(isPlaying)
      handlePlay();
    }
  }
})

document.addEventListener('keyup', (e) => {
  const name = e.key;
  if (name === " ") {
    if (!e.repeat) {
      mouthUp.classList.add('hidden');
      mouthUp.classList.remove('visible');
      mouthDown.classList.add('hidden');
      mouthDown.classList.remove('visible');
      isPlaying = false;
      console.log(isPlaying)
      handlePlay();
    }
  }
})

const button = document.querySelector('#start');
button.addEventListener('click', function () {
  oscillator.start();
  oscillator.disconnect(audioCtx.destination);
  button.classList.add("disappear");
  document.querySelector('#main').removeAttribute('id');
});

const input = document.querySelector('#input-notes');
input.addEventListener('touchstart', function() {
  isNoteSelected = true;
  handlePlay();
})

document.addEventListener('touchend', function () {
  isNoteSelected = false;
  handlePlay();
})

const head = document.querySelector('.head');
head.addEventListener('touchstart', function(e) {
  e.preventDefault();
  mouthUp.classList.add('visible');
  mouthUp.classList.remove('hidden');
  mouthDown.classList.add('visible');
  mouthDown.classList.remove('hidden');
  isPlaying = true;
  handlePlay();
})

head.addEventListener('touchend', function(e) {
  e.preventDefault();
  mouthUp.classList.add('hidden');
  mouthUp.classList.remove('visible');
  mouthDown.classList.add('hidden');
  mouthDown.classList.remove('visible');
  isPlaying = false;
  handlePlay();
})

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

setFrequency = (freq) => {
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
}

frequency.addEventListener('input', function() {
  let freq = this.value;
  setFrequency(freq)
}, false);

frequency.addEventListener('mousedown', function () {
  isNoteSelected = true;
  handlePlay();
})

document.addEventListener('mouseup', function () {
  isNoteSelected = false;
  handlePlay();
})

const mouthUp = document.querySelector('.open-mouth-up');
const mouthDown = document.querySelector('.open-mouth-down');

const openMouth = () => {
  mouthUp.classList.remove('hidden');
  mouthDown.classList.remove('hidden');
}

const closeMouth = () => {
  mouthUp.classList.add('hidden');
  mouthDown.classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
  const name = e.key;
  if (name === " ") {
    if (!e.repeat) {
      openMouth();
      isPlaying = true;
      handlePlay();
    }
  }
})

document.addEventListener('keyup', (e) => {
  const name = e.key;
  if (name === " ") {
    if (!e.repeat) {
      closeMouth();
      isPlaying = false;
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
  openMouth()
  isPlaying = true;
  handlePlay();
})

head.addEventListener('touchend', function(e) {
  e.preventDefault();
  closeMouth();
  isPlaying = false;
  handlePlay();
})

const colorBlack = document.querySelector('.color-black');
const colorWhite = document.querySelector('.color-white');
const body = document.querySelector('.body');
const tail = document.querySelector('.tail');
const rightEye = document.querySelector('.right-eye');
const leftEye = document.querySelector('.left-eye');
const mouth = document.querySelector('.mouth');
const notes = document.querySelector('.notes');

colorBlack.addEventListener('click', function() {
  head.style.background = 'black';
  body.style.background = 'black';
  tail.style.background = 'black';
  rightEye.style.background = 'white';
  leftEye.style.background = 'white';
  mouth.style.background = 'white';
  mouthUp.style.borderBottomColor = 'white';
  mouthDown.style.borderTopColor = 'white';
  notes.style.background = 'white';
})

colorWhite.addEventListener('click', function() {
  head.style.background = 'white';
  body.style.background = 'white';
  tail.style.background = 'white';
  rightEye.style.background = 'black';
  leftEye.style.background = 'black';
  mouth.style.background = 'black';
  mouthUp.style.borderBottomColor = 'black';
  mouthDown.style.borderTopColor = 'black';
  notes.style.background = 'black';
})

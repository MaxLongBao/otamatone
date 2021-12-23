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

const stop = () => {
  oscillator.disconnect(audioCtx.destination);
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

const input = document.querySelector('#input-notes');
input.addEventListener('click', handlePlay);

document.addEventListener('keydown', (e) => {
  const name = e.key;
  if (name === " ") {
    if (!e.repeat) {
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
});

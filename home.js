// speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US'; // change or set dynamically

const transcriptDiv = document.getElementById('transcript');
const startBtn = document.getElementById('startBtn');
const saveBtn = document.getElementById('saveBtn');
const notesList = document.getElementById('notesList');

let listening = false;

recognition.onresult = (event) => {
  let interimTranscript = '';
  let finalTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    } else {
      interimTranscript += event.results[i][0].transcript;
    }
  }
  transcriptDiv.textContent = finalTranscript + interimTranscript;
};

startBtn.addEventListener('click', () => {
  if (!listening) {
    recognition.start();
    listening = true;
    startBtn.textContent = 'Stop Listening';
    startBtn.style.background = '#e53935';
  } else {
    recognition.stop();
    listening = false;
    startBtn.textContent = 'Start Listening';
    startBtn.style.background = '#4CAF50';
  }
});

saveBtn.addEventListener('click', () => {
  const text = transcriptDiv.textContent.trim();
  if (text) {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = text;
    notesList.prepend(note);
    transcriptDiv.textContent = '';
  }
});

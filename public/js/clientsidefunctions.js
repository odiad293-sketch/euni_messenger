// clientsidefunctions.js
// handles basic chat ui and message sending

document.addEventListener('DOMContentLoaded', () => {
  const sendbutton = document.getElementById('sendbutton');
  const messageinput = document.getElementById('messageinput');
  const chatbox = document.getElementById('chatbox');

  if (sendbutton && messageinput && chatbox) {
    sendbutton.addEventListener('click', sendmessage);
    messageinput.addEventListener('keypress', (event) => {
      if (event.key === 'enter') {
        sendmessage();
      }
    });
  }

  function sendmessage() {
    const message = messageinput.value.trim();
    if (message === '') return;

    const newmessage = document.createElement('div');
    newmessage.classList.add('message', 'sent');
    newmessage.textContent = message;
    chatbox.appendChild(newmessage);

    messageinput.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  }
});

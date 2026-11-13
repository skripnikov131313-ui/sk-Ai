const app = document.querySelector('#app');
const address = document.querySelector('#address');
const panel = document.querySelector('#ai-panel');
const chat = document.querySelector('#chat-scroll');
const input = document.querySelector('#message-input');
const toast = document.querySelector('#toast');
let toastTimer;
let dark = false;
let panelWidth = 390;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
}

document.querySelector('#panel-toggle').addEventListener('click', () => {
  const open = !app.classList.contains('ai-open');
  app.classList.toggle('ai-open', open);
  panel.hidden = !open;
  document.querySelector('#panel-toggle').setAttribute('aria-label', open ? 'Скрыть ИИ-панель' : 'Открыть ИИ-панель');
  if (!open) showToast('ИИ-панель свёрнута');
});

document.querySelector('#theme-button').addEventListener('click', () => {
  dark = !dark;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
});

document.querySelector('#address-form').addEventListener('submit', event => {
  event.preventDefault();
  address.blur();
  showToast('В Stage 0 адресная строка — только UI-прототип');
});

function addMessage(text, className) {
  const node = document.createElement('div');
  node.className = className;
  node.textContent = text;
  chat.append(node);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage(text = input.value) {
  const value = text.trim();
  if (!value) return;
  addMessage(value, 'user-message');
  input.value = '';
  setTimeout(() => addMessage('Это только проверка интерфейса: запрос никуда не отправлялся, модель не подключена.', 'notice-message'), 180);
}

document.querySelector('#send-button').addEventListener('click', () => sendMessage());
input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});
document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => sendMessage(button.dataset.prompt)));
document.querySelector('#model-picker').addEventListener('click', () => showToast('Каталог моделей появится после выбора AI-архитектуры'));
document.querySelector('#mic-button').addEventListener('click', () => showToast('Микрофон не запрашивается и не используется в прототипе'));
document.querySelector('#settings-button').addEventListener('click', () => showToast('Настройки пока не реализованы'));
document.querySelector('#resize-handle').addEventListener('pointerdown', event => {
  event.preventDefault();
  const move = moveEvent => {
    panelWidth = Math.max(300, Math.min(520, window.innerWidth - moveEvent.clientX));
    app.style.setProperty('--panel-width', `${panelWidth}px`);
  };
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up, { once: true });
});
document.querySelector('#resize-handle').addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  panelWidth = Math.max(300, Math.min(520, panelWidth + (event.key === 'ArrowLeft' ? 16 : -16)));
  app.style.setProperty('--panel-width', `${panelWidth}px`);
});

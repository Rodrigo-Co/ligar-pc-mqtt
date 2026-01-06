// ===== CONFIGURAÇÕES MQTT =====
const BROKER = 'wss://test.mosquitto.org:8081';
const TOPICO = 'pc/rodri_93a7x2/power';

// ===== CONTROLE =====
let client;
let bloqueado = false;
const TEMPO_BLOQUEIO = 15000; // 15s

const statusEl = document.getElementById('status');
const btn = document.getElementById('btnPower');

// ===== CONEXÃO MQTT =====
client = mqtt.connect(BROKER, {
  clientId: 'site_pc_' + Math.random().toString(16).substr(2, 8)
});

client.on('connect', () => {
  statusEl.innerText = '✅ Conectado';
});

client.on('error', () => {
  statusEl.innerText = '❌ Erro na conexão';
});

// ===== FUNÇÃO DO BOTÃO =====
function ligarPC() {
  if (bloqueado) return;

  client.publish(TOPICO, 'ON');
  statusEl.innerText = '📨 Comando enviado';
  bloquearBotao();
}

// ===== BLOQUEIO VISUAL =====
function bloquearBotao() {
  bloqueado = true;
  btn.disabled = true;
  btn.innerText = '⏳ AGUARDE';

  setTimeout(() => {
    bloqueado = false;
    btn.disabled = false;
    btn.innerText = '🔌 LIGAR PC';
    statusEl.innerText = '✅ Pronto';
  }, TEMPO_BLOQUEIO);
}

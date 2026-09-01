// Web Audio 기반 초경량 사운드 엔진 — 오디오 파일 없이 즉석에서 톤을 생성한다.
let ctx = null;

function getCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  // 브라우저 자동재생 정책: 사용자 클릭 시점에 resume 된다.
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// 짧은 톤 하나를 특정 시각(start)에 재생한다.
function blip(audio, { freq, start, duration = 0.08, type = 'sine', volume = 0.06 }) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration);
}

const PRESETS = {
  click(audio, t) {
    blip(audio, { freq: 620, start: t, duration: 0.06, type: 'triangle', volume: 0.05 });
  },
  toggleOn(audio, t) {
    blip(audio, { freq: 440, start: t, duration: 0.07, type: 'sine', volume: 0.06 });
    blip(audio, { freq: 660, start: t + 0.06, duration: 0.09, type: 'sine', volume: 0.06 });
  },
  toggleOff(audio, t) {
    blip(audio, { freq: 660, start: t, duration: 0.07, type: 'sine', volume: 0.06 });
    blip(audio, { freq: 440, start: t + 0.06, duration: 0.09, type: 'sine', volume: 0.06 });
  },
  // 이스터에그용 축하 아르페지오 (C5 - E5 - G5 - C6)
  success(audio, t) {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      blip(audio, {
        freq,
        start: t + i * 0.1,
        duration: 0.28,
        type: 'triangle',
        volume: 0.07,
      });
    });
  },
};

// 프리셋 사운드를 재생한다. (엔진 자체는 음소거 상태를 모른다 — 호출부에서 제어)
export function playSound(type) {
  try {
    const audio = getCtx();
    if (!audio) return;
    (PRESETS[type] || PRESETS.click)(audio, audio.currentTime);
  } catch {
    // 오디오 미지원 환경은 조용히 무시
  }
}

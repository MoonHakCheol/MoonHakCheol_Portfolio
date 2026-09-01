// Web Audio 기반 초경량 사운드 엔진 — 오디오 파일 없이 즉석에서 톤을 생성한다.
// 스타일: "부드러운 팝" — 사인파 + 피치 글라이드로 둥근 '톡' 소리.
let ctx = null;

function getCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  // 브라우저 자동재생 정책: 사용자 클릭 시점에 resume 된다.
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// 피치가 부드럽게 미끄러지는 팝 하나를 재생한다.
function pop(audio, { from, to, start, duration = 0.12, volume = 0.09 }) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const end = start + duration;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, end);

  // 부드러운 어택 → 매끄러운 감쇠 (둥근 '톡')
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.014);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(gain).connect(audio.destination);
  osc.start(start);
  osc.stop(end + 0.02);
}

const PRESETS = {
  // 기본 클릭: 살짝 아래로 떨어지는 둥근 팝
  click(audio, t) {
    pop(audio, { from: 660, to: 330, start: t, duration: 0.11, volume: 0.09 });
  },
  // 켜기: 두 번의 상승 팝
  toggleOn(audio, t) {
    pop(audio, { from: 480, to: 420, start: t, duration: 0.1, volume: 0.08 });
    pop(audio, { from: 720, to: 640, start: t + 0.08, duration: 0.12, volume: 0.08 });
  },
  // 끄기: 두 번의 하강 팝
  toggleOff(audio, t) {
    pop(audio, { from: 640, to: 560, start: t, duration: 0.1, volume: 0.08 });
    pop(audio, { from: 440, to: 300, start: t + 0.08, duration: 0.14, volume: 0.08 });
  },
  // 이스터에그: 부드러운 팝들이 올라가는 축하음 (C5 - E5 - G5 - C6)
  success(audio, t) {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      pop(audio, {
        from: freq,
        to: freq * 0.9,
        start: t + i * 0.11,
        duration: 0.32,
        volume: 0.08,
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

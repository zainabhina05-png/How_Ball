/**
 * AudioManager — lightweight, zero-dependency audio system for HOW BALL?
 *
 * Uses the Web Audio API to synthesize all sounds procedurally at runtime.
 * No audio files required — zero bundle impact, zero licensing concerns.
 *
 * Fails silently on any platform that blocks autoplay or lacks AudioContext.
 */

type SfxKey = 'jump' | 'slide' | 'coin' | 'gameover';

class AudioManager {
  private ctx: AudioContext | null = null;
  private bgGainNode: GainNode | null = null;
  private bgOscillators: OscillatorNode[] = [];
  private bgRunning = false;
  private _muted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this._muted = localStorage.getItem('howBallMuted') === 'true';
    }
  }

  private getCtx(): AudioContext | null {
    if (this.ctx) return this.ctx;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      return this.ctx;
    } catch {
      return null;
    }
  }

  private resumeCtx() {
    try {
      if (this.ctx?.state === 'suspended') {
        this.ctx.resume();
      }
    } catch { /* ignore */ }
  }

  // ─── SFX ─────────────────────────────────────────────────────────────────

  playSfx(key: SfxKey) {
    if (this._muted) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    this.resumeCtx();

    try {
      switch (key) {
        case 'jump':    this.playJump(ctx); break;
        case 'slide':   this.playSlide(ctx); break;
        case 'coin':    this.playCoin(ctx); break;
        case 'gameover': this.playGameOver(ctx); break;
      }
    } catch { /* fail silently */ }
  }

  private playJump(ctx: AudioContext) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(600, t + 0.15);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.2);
    osc.start(t); osc.stop(t + 0.2);
  }

  private playSlide(ctx: AudioContext) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.linearRampToValueAtTime(150, t + 0.2);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0, t + 0.2);
    osc.start(t); osc.stop(t + 0.2);
  }

  private playCoin(ctx: AudioContext) {
    // Two-tone "ding"
    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      const t = ctx.currentTime + i * 0.06;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.start(t); osc.stop(t + 0.15);
    });
  }

  private playGameOver(ctx: AudioContext) {
    // Descending minor chord
    [440, 370, 330, 220].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.1;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.35);
      osc.start(t); osc.stop(t + 0.35);
    });
  }

  // ─── Background Music ─────────────────────────────────────────────────────

  startBgMusic() {
    if (this.bgRunning) return;
    const ctx = this.getCtx();
    if (!ctx) return;
    this.resumeCtx();

    try {
      // Ambient drone: two detuned oscillators + soft LFO modulation
      const masterGain = ctx.createGain();
      masterGain.gain.value = this._muted ? 0 : 0.08;
      masterGain.connect(ctx.destination);
      this.bgGainNode = masterGain;

      const freqs = [110, 165, 220, 275];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq + i * 0.3; // slight detune for warmth
        // LFO tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.3 + i * 0.07;
        lfoGain.gain.value = 0.015;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(masterGain);
        lfo.start();
        osc.start();
        this.bgOscillators.push(osc, lfo);
      });

      this.bgRunning = true;
    } catch { /* fail silently */ }
  }

  pauseBgMusic() {
    if (this.bgGainNode) {
      try { this.bgGainNode.gain.value = 0; } catch { /* */ }
    }
  }

  resumeBgMusic() {
    if (this.bgGainNode && !this._muted) {
      try { this.bgGainNode.gain.value = 0.08; } catch { /* */ }
    }
  }

  stopBgMusic() {
    this.bgOscillators.forEach(o => { try { o.stop(); } catch { /* */ } });
    this.bgOscillators = [];
    this.bgRunning = false;
    this.bgGainNode = null;
  }

  // ─── Dynamic Speed ────────────────────────────────────────────────────────

  setSpeed(speed: number, maxSpeed: number, initialSpeed: number) {
    if (!this.bgRunning || !this.ctx) return;
    
    // Calculate pitch multiplier (1.0 to 1.35) based on speed progress
    const progress = Math.max(0, Math.min(1, (speed - initialSpeed) / (maxSpeed - initialSpeed)));
    const pitchMultiplier = 1 + (progress * 0.35);
    
    const freqs = [110, 165, 220, 275];
    let oscIndex = 0;
    
    for (let i = 0; i < this.bgOscillators.length; i++) {
      // Even indices in the array are the main oscillators (odd are LFOs)
      if (i % 2 === 0 && oscIndex < freqs.length) {
        const osc = this.bgOscillators[i];
        const baseFreq = freqs[oscIndex] + oscIndex * 0.3;
        try {
          // Smoothly glide to the new pitch over 0.1s to avoid pops
          osc.frequency.linearRampToValueAtTime(baseFreq * pitchMultiplier, this.ctx.currentTime + 0.1);
        } catch { /* ignore */ }
        oscIndex++;
      }
    }
  }

  // ─── Mute ─────────────────────────────────────────────────────────────────

  get muted() { return this._muted; }

  setMuted(value: boolean) {
    this._muted = value;
    if (typeof window !== 'undefined') {
      localStorage.setItem('howBallMuted', String(value));
    }
    if (this.bgGainNode) {
      try { this.bgGainNode.gain.value = value ? 0 : 0.08; } catch { /* */ }
    }
  }

  toggleMute() {
    this.setMuted(!this._muted);
    return this._muted;
  }
}

// Singleton — safe in SSR because it checks typeof window
const audioManager = typeof window !== 'undefined' ? new AudioManager() : null as unknown as AudioManager;
export default audioManager;

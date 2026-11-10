import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Music } from 'lucide-react';
import { SOCIETY_ANTHEM } from '../data/pbcumData';

/**
 * Animated Flying Bird Banner (flybird.gif equivalent)
 * 520px x 30px retro banner showing flying crane birds across the sky
 */
export const FlybirdBanner: React.FC<{ width?: number | string; height?: number }> = ({ 
  width = "100%", 
  height = 30 
}) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/image/flybird.gif"
        alt="马大华文学会飞鹤横幅"
        width={520}
        height={30}
        onError={() => setImgError(true)}
        className="w-full max-w-[520px] h-[30px] object-cover mx-auto select-none"
      />
    );
  }

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-sky-100 via-sky-50 to-blue-100 border-y border-blue-200 select-none mx-auto"
      style={{ width, height: `${height}px`, maxWidth: '520px' }}
    >
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-40">
        <span className="text-[10px] tracking-widest text-blue-900 font-serif">P B C U M</span>
        <span className="text-[10px] tracking-widest text-blue-900 font-serif">1986 — 2004</span>
      </div>
      
      {/* Animated flying birds */}
      <div className="absolute inset-0 flex items-center">
        <div className="flex items-center gap-16 animate-[mq-scroll-left_12s_linear_infinite] whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="inline-flex items-center gap-1.5 text-blue-800">
              <svg className="w-5 h-4 inline-block animate-pulse" viewBox="0 0 24 16" fill="currentColor">
                <path d="M12 8 C8 2, 4 3, 0 6 C4 5, 8 7, 11 9 C9 12, 6 13, 2 15 C7 14, 11 12, 12 10 C13 12, 17 14, 22 15 C18 13, 15 12, 13 9 C16 7, 20 5, 24 6 C20 3, 16 2, 12 8 Z" />
              </svg>
              <span className="text-[10px] text-blue-700/60 font-mono tracking-tighter">~*~</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Official PBCUM Society Seal / Logo (Pbcum_logo.gif equivalent)
 */
export const PbcumLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 60, 
  className = "" 
}) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/image/Pbcum_logo.gif"
        alt="马大华文学会校徽"
        width={60}
        height={75}
        onError={() => setImgError(true)}
        className={`object-contain select-none shrink-0 ${className}`}
      />
    );
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center p-1 bg-white rounded shadow-sm border border-blue-300 ${className}`}
      style={{ width: `${size}px`, height: `${Math.round(size * 1.25)}px` }}
      title="马来亚大学华文学会会徽 (PBCUM Logo)"
    >
      <svg viewBox="0 0 100 125" className="w-full h-full">
        {/* Outer Shield */}
        <path 
          d="M10 10 H90 V70 C90 100, 50 120, 50 120 C50 120, 10 100, 10 70 Z" 
          fill="#00007f" 
          stroke="#e8f2fd" 
          strokeWidth="3" 
        />
        {/* Inner Gold / White Field */}
        <path 
          d="M18 16 H82 V68 C82 92, 50 108, 50 108 C50 108, 18 92, 18 68 Z" 
          fill="#ffffcc" 
          stroke="#00007f" 
          strokeWidth="2" 
        />
        {/* Palm Tree / UM motif */}
        <circle cx="50" cy="38" r="14" fill="#00007f" />
        <path d="M48 38 L52 38 L50 62 Z" fill="#9933ff" />
        <path d="M42 32 Q50 20 58 32 Q50 36 42 32 Z" fill="#ffff00" />
        <path d="M36 38 Q50 30 64 38 Q50 44 36 38 Z" fill="#ffff00" />
        
        {/* Calligraphy Banner PBCUM */}
        <rect x="22" y="74" width="56" height="18" fill="#00007f" rx="2" />
        <text 
          x="50" 
          y="87" 
          fill="#ffffff" 
          fontSize="11" 
          fontFamily="serif" 
          fontWeight="bold" 
          textAnchor="middle"
        >
          马大华文
        </text>
        <text 
          x="50" 
          y="102" 
          fill="#00007f" 
          fontSize="7" 
          fontFamily="sans-serif" 
          fontWeight="bold" 
          textAnchor="middle"
        >
          PBCUM 1986
        </text>
      </svg>
    </div>
  );
};

/**
 * Animated Welcome Graphic (animate.gif equivalent)
 */
export const WelcomeGraphic: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/image/animate.gif"
        alt="欢迎浏览"
        width={300}
        height={100}
        onError={() => setImgError(true)}
        className="w-[300px] h-auto object-contain mx-auto select-none rounded border border-blue-800"
      />
    );
  }

  return (
    <div className="w-[300px] h-[78px] bg-gradient-to-b from-blue-900 via-blue-950 to-black rounded border border-blue-400 p-2 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-inner select-none">
      {/* Background neon shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-yellow-300 text-xs animate-ping">★</span>
          <span className="text-cyan-300 text-sm font-serif tracking-widest font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
            欢 迎 浏 览
          </span>
          <span className="text-yellow-300 text-xs animate-ping">★</span>
        </div>
        <div className="text-[11px] text-yellow-200 tracking-wider font-mono">
          马 来 亚 大 学 华 文 学 会
        </div>
        <div className="text-[9px] text-blue-300 tracking-tight mt-0.5">
          WELCOME TO PBCUM OFFICIAL WEBSITE
        </div>
      </div>
    </div>
  );
};

/**
 * Color Bar Divider (colorbar.gif)
 */
export const ColorBarDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src="/image/colorbar.gif"
        alt=""
        width={520}
        height={1}
        onError={() => setImgError(true)}
        className={`w-full max-w-[520px] h-[1px] my-3 mx-auto block select-none ${className}`}
      />
    );
  }

  return (
    <div 
      className={`w-full max-w-[520px] mx-auto h-[2px] my-3 rounded-full ${className}`}
      style={{
        background: 'linear-gradient(90deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #00ffff 57%, #0000ff 71%, #8b00ff 85%, #ff007f 100%)'
      }}
    />
  );
};

/**
 * Web Audio Synthesizer for the PBCUM Society Anthem (会歌)
 * Procedural in-browser audio generator playing the original melody
 */
export const SocietyAnthemSynthesizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIdx, setCurrentNoteIdx] = useState(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  // Musical note frequencies (Hz)
  const noteFreqs: Record<string, number> = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25
  };

  const stopAudio = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentNoteIdx(-1);
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const playAnthemMelody = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      isPlayingRef.current = true;
      setIsPlaying(true);

      const notes = SOCIETY_ANTHEM.notes;

      for (let i = 0; i < notes.length; i++) {
        if (!isPlayingRef.current) break;
        setCurrentNoteIdx(i);
        const { note, duration } = notes[i];
        const freq = noteFreqs[note] || 440;

        // Create warm bell / electric piano tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle envelope attack and decay
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.95);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);

        await new Promise((resolve) => setTimeout(resolve, duration * 1000));
      }

      if (isPlayingRef.current) {
        setIsPlaying(false);
        setCurrentNoteIdx(-1);
      }
    } catch {
      setIsPlaying(false);
      setCurrentNoteIdx(-1);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="bg-sky-50 border border-blue-300 rounded p-3 my-3 text-center">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
          <Music className="w-4 h-4 text-blue-700" />
          <span>会歌旋律在线演奏器 (Web Audio Synthesizer)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={playAnthemMelody}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isPlaying 
                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                : 'bg-blue-800 text-white hover:bg-blue-900'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暂停播放</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>播放旋律</span>
              </>
            )}
          </button>
          {isPlaying && (
            <button
              onClick={stopAudio}
              className="p-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
              title="重设"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Note visualizer track */}
      <div className="flex items-center justify-center gap-1.5 py-1.5 bg-white rounded border border-blue-200 overflow-x-auto">
        {SOCIETY_ANTHEM.notes.map((item, idx) => (
          <div
            key={idx}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
              currentNoteIdx === idx
                ? 'bg-blue-800 text-yellow-300 font-bold scale-110 shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {item.note}
          </div>
        ))}
      </div>
      <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-center gap-2">
        <Volume2 className="w-3 h-3 text-blue-600" />
        <span>纯正纯音合成：余锦畅作曲《火浴后的火鸟》主歌音阶 (4/4拍)</span>
      </div>
    </div>
  );
};

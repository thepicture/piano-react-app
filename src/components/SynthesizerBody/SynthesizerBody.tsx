import { useEffect, useRef, useState } from "react";

import "./SynthesizerBody.css";

import { Piano } from "./Piano";
import { ControlPanel } from "./ControlPanel";

const oscillators = new Map<number, OscillatorNode>();

interface Settings {
  volume: number;
  pan: number;
}

interface SynthesizerBodyProps {
  octavesCount?: number;
  startCents?: number;
}

export const SynthesizerBody: React.FC<SynthesizerBodyProps> = ({
  octavesCount = 2,
  startCents = 300,
}) => {
  const [settings, setSettings] = useState<Settings>({
    volume: 1,
    pan: 0,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContext = useRef<AudioContext>();

  const handleChange = (key: string, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleHold = (cents: number) => {
    if (oscillators.has(cents)) {
      return;
    }
    if (!audioContext.current) {
      return;
    }
    const oscillator = audioContext.current.createOscillator();
    oscillator.detune.value = cents;
    const gainNode = audioContext.current.createGain();
    gainNode.gain.value = settings.volume;
    const panner = new StereoPannerNode(audioContext.current, {
      pan: settings.pan,
    });
    oscillator
      .connect(gainNode)
      .connect(panner)
      .connect(audioContext.current.destination);
    oscillator.start();
    oscillators.set(cents, oscillator);
  };

  const handleRelease = (cents: number) => {
    oscillators.get(cents)?.disconnect();
    oscillators.delete(cents);
  };

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (oscillators.size === 0) {
      return;
    }
    oscillators.forEach((oscillator) => {
      oscillator.stop();
      oscillator.disconnect();
    });
    oscillators.clear();
  }, [settings]);

  return isInitialized ? (
    <div className="SynthesizerBody">
      <ControlPanel onChange={handleChange} />
      <Piano
        onHold={handleHold}
        onRelease={handleRelease}
        octavesCount={octavesCount}
        startCents={startCents}
      />
    </div>
  ) : (
    <button
      className="SynthesizerBody__button"
      type="submit"
      onClick={() => setIsInitialized(true)}
    >
      Click to initialize piano
    </button>
  );
};

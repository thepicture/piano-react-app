import { useEffect, useRef, useState } from "react";

import "./SynthesizerBody.css";

import { Piano } from "./Piano";
import { ControlPanel } from "./ControlPanel";

export const SynthesizerBody: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    volume: 1,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContext = useRef<AudioContext>();
  const oscillator = useRef<OscillatorNode>();

  const handleChange = (key: string, value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleHold = (cents: number) => {
    if (!oscillator.current || !audioContext.current) {
      return;
    }
    handleRelease();
    oscillator.current.detune.value = cents;
    const gainNode = audioContext.current.createGain();
    gainNode.gain.value = settings.volume;
    console.log(settings.volume);
    oscillator.current
      .connect(gainNode)
      .connect(audioContext.current.destination);
  };

  const handleRelease = () => {
    if (!oscillator.current) {
      return;
    }
    oscillator.current.disconnect();
  };

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
      oscillator.current = audioContext.current.createOscillator();
      oscillator.current.start();
    }
  }, [isInitialized]);

  return isInitialized ? (
    <div className="SynthesizerBody">
      <ControlPanel onChange={handleChange} />
      <Piano onHold={handleHold} onRelease={handleRelease} />
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

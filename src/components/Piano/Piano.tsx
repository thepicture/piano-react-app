import React, { useEffect, useRef, useState } from "react";

import "./Piano.css";

import { PianoKey } from ".";

const OCTAVES_COUNT = 2;
const START_CENTS = 300;
const INDEXES_WITH_SEMITONE = [0, 1, 3, 4, 5];

const context = new AudioContext();

export const Piano: React.FC = () => {
  const [keys, setKeys] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized || keys.length === OCTAVES_COUNT * 7) {
      return;
    }

    let cents = START_CENTS;

    for (let i = 0; i < 7 * OCTAVES_COUNT; ++i) {
      const isWithSemitone = INDEXES_WITH_SEMITONE.includes(i % 7);

      const oscillator = context.createOscillator();
      oscillator.start();

      const handleHold = (cents: number) => {
        oscillator.detune.value = cents;
        oscillator.connect(context.destination);
      };

      const handleRelease = () => {
        oscillator.disconnect();
      };

      (function (cents) {
        setKeys((prev) => [
          ...prev,
          <PianoKey
            key={i}
            withSemitone={isWithSemitone}
            cents={cents}
            onHold={handleHold}
            onRelease={handleRelease}
          />,
        ]);
      })(cents);
      if (isWithSemitone) {
        cents += 200;
      } else {
        cents += 100;
      }
    }
  }, [isInitialized, keys]);

  return isInitialized ? (
    <div className="Piano">{keys}</div>
  ) : (
    <button type="submit" onClick={() => setIsInitialized(true)}>
      Click to initialize piano
    </button>
  );
};

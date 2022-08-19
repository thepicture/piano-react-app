import React, { useEffect } from "react";

import "./Piano.css";

import { PianoKey } from ".";

const INDEXES_WITH_SEMITONE = [0, 1, 3, 4, 5];
const KEYS_MAPPING = [
  "z",
  "s",
  "x",
  "d",
  "c",
  "v",
  "g",
  "b",
  "h",
  "n",
  "j",
  "m",
];

interface PianoProps {
  onHold: (cents: number) => void;
  onRelease: (cents: number) => void;
  octavesCount?: number;
  startCents?: number;
}

export const Piano: React.FC<PianoProps> = ({
  onHold,
  onRelease,
  octavesCount = 2,
  startCents = 300,
}) => {
  let keys: any[] = [];

  let cents = startCents;

  useEffect(() => {
    let keyCents = startCents;
    const keyDownListeners: any[] = [];
    const keyUpListeners: any[] = [];

    for (let i = 0; i < 7 * octavesCount; ++i) {
      (function (index, cents) {
        const keyDownListener = (event: KeyboardEvent) => {
          if (event.repeat) {
            return;
          }
          return event.key === KEYS_MAPPING[index] && onHold(cents);
        };
        const keyUpListener = (event: KeyboardEvent) => {
          return event.key === KEYS_MAPPING[index] && onRelease(cents);
        };
        keyDownListeners.push(keyDownListener);
        keyUpListeners.push(keyUpListener);
        document.body.addEventListener("keydown", keyDownListener);
        document.body.addEventListener("keyup", keyUpListener);
      })(i, keyCents);
      keyCents += 100;
    }

    return () => {
      keyDownListeners.forEach((listener) => {
        document.body.removeEventListener("keydown", listener);
      });
      keyUpListeners.forEach((listener) => {
        document.body.removeEventListener("keyup", listener);
      });
    };
  }, [onHold, onRelease]);

  for (let i = 0; i < 7 * octavesCount; ++i) {
    const isWithSemitone = INDEXES_WITH_SEMITONE.includes(i % 7);

    (function (cents) {
      keys.push(
        <PianoKey
          key={i}
          withSemitone={isWithSemitone}
          cents={cents}
          onHold={onHold}
          onRelease={onRelease}
        />
      );
    })(cents);

    if (isWithSemitone) {
      cents += 200;
    } else {
      cents += 100;
    }
  }

  return <div className="Piano">{keys}</div>;
};

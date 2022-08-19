import React, { useEffect } from "react";

import "./Piano.css";

import { PianoKey } from ".";

const OCTAVES_COUNT = 2;
const START_CENTS = 300;
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
}

export const Piano: React.FC<PianoProps> = ({ onHold, onRelease }) => {
  let keys: any[] = [];

  let cents = START_CENTS;

  useEffect(() => {
    let keyCents = START_CENTS;
    const keyDownListeners: any[] = [];
    const keyUpListeners: any[] = [];

    for (let i = 0; i < 7 * OCTAVES_COUNT; ++i) {
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

  for (let i = 0; i < 7 * OCTAVES_COUNT; ++i) {
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

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
  onRelease: () => void;
}

export const Piano: React.FC<PianoProps> = ({ onHold, onRelease }) => {
  let keys: any[] = [];

  let cents = START_CENTS;

  useEffect(() => {
    let keyCents = START_CENTS;

    for (let i = 0; i < 7 * OCTAVES_COUNT; ++i) {
      (function (index, cents) {
        document.addEventListener(
          "keydown",
          (event) => event.key === KEYS_MAPPING[index] && onHold(cents)
        );
        document.addEventListener("keyup", () => onRelease());
      })(i, keyCents);
      keyCents += 100;
    }
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

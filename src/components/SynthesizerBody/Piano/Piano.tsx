import React, { useEffect, useState } from "react";

import "./Piano.css";

import { PianoKey } from ".";

const OCTAVES_COUNT = 2;
const START_CENTS = 300;
const INDEXES_WITH_SEMITONE = [0, 1, 3, 4, 5];

interface PianoProps {
  onHold: (cents: number) => void;
  onRelease: () => void;
}

export const Piano: React.FC<PianoProps> = ({ onHold, onRelease }) => {
  let keys = [] as any[];

  let cents = START_CENTS;

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

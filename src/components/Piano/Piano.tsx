import React from "react";

import { PianoKey } from ".";

const OCTAVES_COUNT = 2;
const INDEXES_WITH_SEMITONE = [0, 1, 3, 4, 5];

export const Piano: React.FC = () => {
  const keys = [];

  for (let i = 0; i < 7 * OCTAVES_COUNT; ++i) {
    const isWithSemitone = INDEXES_WITH_SEMITONE.includes(i % 7);
    keys.push(<PianoKey key={i} withSemitone={isWithSemitone} />);
  }
  return (
    <section
      style={{
        height: "inherit",
        display: "grid",
        gridTemplateColumns: `repeat(${7 * OCTAVES_COUNT}, auto)`,
        cursor: "pointer",
      }}
    >
      {keys}
    </section>
  );
};

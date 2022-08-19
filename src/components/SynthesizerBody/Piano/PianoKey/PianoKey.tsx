import React from "react";

import "./PianoKey.css";

interface PianoKeyProps {
  withSemitone?: boolean;
  cents: number;
  onHold: (cents: number) => void;
  onRelease: (cents: number) => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({
  withSemitone,
  cents,
  onHold,
  onRelease,
}) => {
  return (
    <div className="PianoKey__container">
      <button
        onMouseDown={() => onHold(cents)}
        onMouseUp={() => onRelease(cents)}
        onTouchStart={() => onHold(cents)}
        onMouseMove={(event) => {
          if (event.buttons === 1) {
            onHold(cents);
          }
        }}
        onTouchEnd={() => onRelease(cents)}
        onMouseLeave={(event) => {
          if (event.buttons === 1) {
            onRelease(cents);
          }
        }}
        type="button"
        title="piano key"
        className="PianoKey PianoKey--white"
      />
      {withSemitone && (
        <button
          onMouseDown={() => onHold(cents + 100)}
          onMouseUp={() => onRelease(cents + 100)}
          onMouseMove={(event) => {
            if (event.buttons === 1) {
              onHold(cents + 100);
            }
          }}
          onTouchStart={() => onHold(cents + 100)}
          onTouchEnd={() => onRelease(cents + 100)}
          onMouseLeave={(event) => {
            if (event.buttons === 1) {
              onRelease(cents + 100);
            }
          }}
          type="button"
          title="piano key"
          className="PianoKey PianoKey--black"
        />
      )}
    </div>
  );
};

PianoKey.defaultProps = {
  withSemitone: false,
};

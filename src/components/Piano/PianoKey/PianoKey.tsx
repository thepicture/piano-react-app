import React from "react";

import "./PianoKey.css";

interface PianoKeyProps {
  withSemitone?: boolean;
  cents: number;
  onHold: (cents: number) => void;
  onRelease: () => void;
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
        onMouseUp={onRelease}
        onTouchStart={() => onHold(cents)}
        onTouchEnd={onRelease}
        onMouseLeave={onRelease}
        type="button"
        title="piano key"
        className="PianoKey PianoKey--white"
      />
      {withSemitone && (
        <button
          onMouseDown={() => onHold(cents + 100)}
          onMouseUp={onRelease}
          onTouchStart={() => onHold(cents + 100)}
          onTouchEnd={onRelease}
          onMouseLeave={onRelease}
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

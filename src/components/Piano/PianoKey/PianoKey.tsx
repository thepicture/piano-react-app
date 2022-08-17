import React from "react";

import "./PianoKey.css";

interface PianoKeyProps {
  withSemitone?: boolean;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ withSemitone }) => {
  return withSemitone ? (
    <div className="PianoKey__container">
      <button
        type="button"
        title="piano key"
        className="PianoKey PianoKey--white"
      />
      <button
        type="button"
        title="piano key"
        className="PianoKey PianoKey--black"
      />
    </div>
  ) : (
    <div className="PianoKey__container">
      <button
        type="button"
        title="piano key"
        className="PianoKey PianoKey--white"
      />
    </div>
  );
};

PianoKey.defaultProps = {
  withSemitone: false,
};

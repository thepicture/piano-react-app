import React from "react";

interface PianoKeyProps {
  withSemitone?: boolean;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ withSemitone }) => {
  return withSemitone ? (
    <div style={{ position: "relative" }}>
      <button
        title="piano key"
        style={{
          border: "1px solid black",
          background: "white",
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          borderRadius: ".3em",
        }}
      />
      <button
        title="piano key"
        style={{
          border: "1px solid black",
          background: "black",
          position: "absolute",
          height: "55%",
          width: "50%",
          left: "75%",
          zIndex: 1,
          cursor: "pointer",
          borderRadius: ".3em",
        }}
      />
    </div>
  ) : (
    <div style={{ position: "relative" }}>
      <button
        title="piano key"
        style={{
          border: "1px solid black",
          background: "white",
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          borderRadius: ".3em",
        }}
      />
    </div>
  );
};

PianoKey.defaultProps = {
  withSemitone: false,
};

import "./ControlPanel.css";

import React from "react";

interface ControlPanelProps {
  onChange: (key: string, value: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="volume">
        Volume
        <input
          type="range"
          id="volume"
          onChange={(event) =>
            onChange(
              event.target.id,
              Number.parseFloat(event.target.value) || 0
            )
          }
          aria-label="volume"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
        />
      </label>
      <label htmlFor="pan">
        Pan
        <input
          type="range"
          id="pan"
          onChange={(event) =>
            onChange(
              event.target.id,
              Number.parseFloat(event.target.value) || 0
            )
          }
          aria-label="stereo panner"
          min={-1}
          max={1}
          step={0.01}
          defaultValue={0}
        />
      </label>
    </div>
  );
};

import React, { useEffect, useRef, useState } from "react";

export interface PinCodeProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
  length?: number;
}

export interface PinCodeProps {
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export const PinCodeInput = ({
  length = 6,
  onChange,
  disabled = false,
}: PinCodeProps) => {
  const refs = useRef<HTMLInputElement[]>([]);
  const [values, setValues] = useState(Array(length).fill(""));

  useEffect(() => {
    onChange(values.join(""));
  }, [values, onChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    const newValues = [...values];
    newValues[index] = val;

    setValues(newValues);

    if (val && index < length - 1) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      refs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    setValues(pasteData.split(""));

    if (pasteData.length === length) {
      refs.current.forEach((ref, index) => {
        ref.value = pasteData[index] || "";
      });
      refs.current[length - 1].focus();
    }
  };

  return (
    <div className="flex gap-4">
      {Array.from(Array(length).keys()).map((index) => {
        return (
          <input
            key={index}
            ref={(ref) => {
              refs.current[index] = ref as HTMLInputElement;
            }}
            id={`pin-code-${index + 1}`}
            type="text"
            maxLength={1}
            onKeyUp={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
            onPaste={(e) => handlePaste(e)}
            onChange={(e) => handleChange(e, index)}
            disabled={disabled}
            className="h-10 px-4 py-2 text-center inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          />
        );
      })}
    </div>
  );
};

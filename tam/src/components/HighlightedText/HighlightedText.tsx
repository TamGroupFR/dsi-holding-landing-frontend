import React from 'react';

interface HighlightedTextProps {
    text: string
    wordToHighlight: string
}

const HighlightedText = ({ text, wordToHighlight } : HighlightedTextProps) => {
  const parts = text.split(new RegExp(`(${wordToHighlight})`, 'gi'));
  const highlightedText = parts.map((part, index) => (part.toLowerCase() === wordToHighlight.toLowerCase() ? (
    <span key={part} className="text-primary">
      {part}
    </span>
  ) : (
    part
  )));

  return <span>{highlightedText}</span>;
};

export default HighlightedText;

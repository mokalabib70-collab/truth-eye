import { useState, useEffect } from "react";
import "./QuestionModal.css";

export default function QuestionModal({ onClose, onSave, initial }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("Multiple Choice");
  const [score, setScore] = useState(5);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [essayAnswer, setEssayAnswer] = useState("");

  useEffect(() => {
    if (initial) {
      setText(initial.text || "");
      setType(initial.type || "Multiple Choice");
      setScore(initial.score || 5);
      setOptions(initial.options || ["", "", "", ""]);
      setEssayAnswer(initial.essayAnswer || "");
    }
  }, [initial]);

  const handleTypeChange = (e) => {
    const t = e.target.value;
    setType(t);
    if (t === "True or False") setOptions(["True", "False"]);
    else if (t === "Multiple Choice") setOptions(["", "", "", ""]);
  };

  const handleOptionChange = (i, val) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ text, type, score, options, essayAnswer });
  };

  return (
    <div className="qm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="qm-modal">
        <div className="qm-field qm-field--full">
          <label>Question Text</label>
          <textarea
            placeholder="Write Question Here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="qm-row">
          <div className="qm-field">
            <label>Question Type</label>
            <div className="qm-select-wrap">
              <select value={type} onChange={handleTypeChange}>
                <option>Multiple Choice</option>
                <option>True or False</option>
                <option>Essay</option>
              </select>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="qm-field">
            <label>Score</label>
            <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} min={1} />
          </div>
        </div>

        {/* Multiple Choice Options */}
        {type === "Multiple Choice" && (
          <div className="qm-field qm-field--full">
            <label>Options</label>
            <div className="qm-options">
              {options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />
              ))}
            </div>
          </div>
        )}

        {/* True or False */}
        {type === "True or False" && (
          <div className="qm-field qm-field--full">
            <label>Options</label>
            <div className="qm-options">
              <input type="text" value="True" readOnly />
              <input type="text" value="False" readOnly />
            </div>
          </div>
        )}

        {/* Essay */}
        {type === "Essay" && (
          <div className="qm-field qm-field--full">
            <textarea
              className="qm-essay"
              placeholder="Write answer Here..."
              value={essayAnswer}
              onChange={(e) => setEssayAnswer(e.target.value)}
            />
          </div>
        )}

        <div className="qm-actions">
          <button className="qm-btn-save" onClick={handleSave}>
            {initial !== null ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
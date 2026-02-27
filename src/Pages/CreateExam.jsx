import { useState } from "react";
import QuestionModal from "./QuestionModal";
import "./CreateExam.css";

export default function CreateExam({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [examTitle, setExamTitle] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [numQuestions, setNumQuestions] = useState("");

  const handleAddQuestion = (q) => {
    if (editIndex !== null) {
      setQuestions(questions.map((item, i) => (i === editIndex ? q : item)));
      setEditIndex(null);
    } else {
      setQuestions([...questions, q]);
    }
    setShowQuestionModal(false);
  };

  return (
    <div className="cec-wrap">
      <div className="cec-header">
        <h1 className="cec-title">Create Exam</h1>
        <button className="cec-btn-add" onClick={() => { setEditIndex(null); setShowQuestionModal(true); }}>
          + Add Question
        </button>
      </div>

      {/* Exam Info */}
      <div className="cec-card">
        <div className="cec-field cec-field--full">
          <label>Exam Title</label>
          <input type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} />
        </div>
        <div className="cec-field cec-field--full">
          <label>Course</label>
          <div className="cec-select-wrap">
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select Course</option>
              <option>Computer Science</option>
              <option>Artificial Intelligence</option>
              <option>Mathematics</option>
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="cec-row">
          <div className="cec-field">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="cec-field">
            <label>Duration (min)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="cec-field">
            <label>Start</label>
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="cec-field">
            <label>End</label>
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
          <div className="cec-field">
            <label>Number of questions</label>
            <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Questions */}
      {questions.map((q, i) => (
        <div key={i} className="cec-question-card">
          <div className="cec-question-card__header">
            <h3>Question {i + 1}</h3>
            <div className="cec-question-card__meta">
              <span>{q.score} Points</span>
              <button className="cec-btn-icon" onClick={() => { setEditIndex(i); setShowQuestionModal(true); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d9cdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button className="cec-btn-icon" onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                </svg>
              </button>
            </div>
          </div>
          <p className="cec-question-card__text">{q.text}</p>

          {(q.type === "Multiple Choice" || q.type === "True or False") && (
            <div className="cec-options">
              {q.options.filter(Boolean).map((opt, j) => (
                <div key={j} className="cec-option">
                  <span className="cec-option-radio" />
                  {opt}
                </div>
              ))}
            </div>
          )}

          {q.type === "Essay" && (
            <textarea className="cec-essay" placeholder="Type your answer here..." readOnly />
          )}
        </div>
      ))}

      {showQuestionModal && (
        <QuestionModal
          onClose={() => { setShowQuestionModal(false); setEditIndex(null); }}
          onSave={handleAddQuestion}
          initial={editIndex !== null ? questions[editIndex] : null}
        />
      )}
    </div>
  );
}
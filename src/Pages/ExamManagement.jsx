import { useState } from "react";
import EditExam from "./EditExam";
import CreateExam from "./CreateExam";
import "./ExamManagement.css";

const initialExams = [
  { id: 1, title: "Computer Science Midterm Exam", date: "10/24/2025", duration: 90, questions: 25, students: 80 },
  { id: 2, title: "Computer Science Midterm Exam", date: "10/24/2025", duration: 90, questions: 25, students: 80 },
  { id: 3, title: "Computer Science Midterm Exam", date: "10/24/2025", duration: 90, questions: 25, students: 80 },
];

export default function ExamManagement({ onNavigate }) {
  const [view, setView] = useState("list"); // "list" | "create"
  const [exams, setExams] = useState(initialExams);
  const [editExam, setEditExam] = useState(null);

  const handleDelete = (id) => setExams(exams.filter((e) => e.id !== id));

  const handleSaveEdit = (updated) => {
    setExams(exams.map((e) => (e.id === updated.id ? updated : e)));
    setEditExam(null);
  };

  if (view === "create") {
    return <CreateExam onBack={() => setView("list")} />;
  }

  return (
    <div className="emc-wrap">
      <div className="emc-header">
        <h1 className="emc-title">Exam Management</h1>
        <button className="emc-btn-create" onClick={() => setView("create")}>
          Create Exam
        </button>
      </div>

      <div className="emc-list">
        {exams.length === 0 && (
          <div className="emc-empty">No exams yet. Click "Create Exam" to add one.</div>
        )}
        {exams.map((exam) => (
          <div key={exam.id} className="emc-card">
            <div className="emc-card__left">
              <h2 className="emc-card__title">{exam.title}</h2>
              <div className="emc-card__meta">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {exam.date}
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {exam.duration} minutes
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {exam.questions} questions
                </span>
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {exam.students} Student
                </span>
              </div>
            </div>
            <div className="emc-card__actions">
              <button className="emc-card__btn" onClick={() => setEditExam(exam)} title="Edit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d9cdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button className="emc-card__btn" onClick={() => setView("create")} title="Add Question">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <button className="emc-card__btn" onClick={() => handleDelete(exam.id)} title="Delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e05555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editExam && (
        <EditExam exam={editExam} onClose={() => setEditExam(null)} onSave={handleSaveEdit} />
      )}
    </div>
  );
}
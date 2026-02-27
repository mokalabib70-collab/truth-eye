import { useState } from "react";
import "./Coursescontent.css";

const courses = [
  { id: 1, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 2, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 3, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 4, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
  { id: 5, code: "CS401", name: "Introduction to AI", students: 350, semester: "Second" },
];

const allStudents = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  student: "Sara Ahmed Ali",
  email: "sara.a@university.edu",
  course: "Data Structures Final",
  examsTaken: 0,
  level: 3,
  actions: 0,
}));

const CARDS_PER_PAGE = 3;
const STUDENTS_PER_PAGE = 16;

export default function CoursesContent() {
  const [cardPage, setCardPage] = useState(0);
  const [studentPage, setStudentPage] = useState(0);
  const [search, setSearch] = useState("");

  const totalCardPages = Math.ceil(courses.length / CARDS_PER_PAGE);
  const visibleCourses = courses.slice(cardPage * CARDS_PER_PAGE, cardPage * CARDS_PER_PAGE + CARDS_PER_PAGE);

  const filtered = allStudents.filter(
    (s) =>
      s.student.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );
  const totalStudentPages = Math.ceil(filtered.length / STUDENTS_PER_PAGE);
  const visibleStudents = filtered.slice(studentPage * STUDENTS_PER_PAGE, studentPage * STUDENTS_PER_PAGE + STUDENTS_PER_PAGE);

  const exportData = () => {
    const rows = filtered.map((s) => `${s.student} | ${s.email} | ${s.course} | ${s.examsTaken} | ${s.level}`).join("\n");
    const content = `TRUTHEYE - COURSES REPORT\nGenerated: ${new Date().toLocaleDateString()}\n${"=".repeat(70)}\nStudent | Email | Course | Exams Taken | Level\n${"-".repeat(70)}\n${rows}\n${"=".repeat(70)}\nTotal: ${filtered.length}\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TruthEye_Courses_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cc-wrap">

      {/* Courses Cards Section */}
      <div className="cc-courses-section">
        <div className="cc-cards-row">
          {visibleCourses.map((course) => (
            <div key={course.id} className="cc-course-card">
              <h2 className="cc-course-code">{course.code}</h2>
              <p className="cc-course-name">{course.name}</p>
              <p className="cc-course-meta"><span>Students:</span> <strong>{course.students}</strong></p>
              <p className="cc-course-meta"><span>Semester:</span> <strong>{course.semester}</strong></p>
            </div>
          ))}
        </div>
        <div className="cc-cards-nav">
          <button className="cc-nav-btn" onClick={() => setCardPage((p) => Math.max(0, p - 1))} disabled={cardPage === 0}>‹</button>
          <button className="cc-nav-btn cc-nav-btn--right" onClick={() => setCardPage((p) => Math.min(totalCardPages - 1, p + 1))} disabled={cardPage >= totalCardPages - 1}>›</button>
        </div>
      </div>

      {/* Students Table Section */}
      <div className="cc-table-section">
        <div className="cc-table-filters">
          <div className="cc-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search by student name, email, or exam title..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setStudentPage(0); }}
            />
          </div>
          <button className="cc-filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
          </button>
          <button className="cc-btn-export" onClick={exportData}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export As
          </button>
        </div>

        <div className="cc-table-wrap">
          <table className="cc-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>Exams Taken</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.student}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{s.examsTaken}</td>
                  <td>{s.level}</td>
                  <td>{s.actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Nav */}
        <div className="cc-table-nav">
          <button className="cc-nav-btn" onClick={() => setStudentPage((p) => Math.max(0, p - 1))} disabled={studentPage === 0}>‹</button>
          <button className="cc-nav-btn cc-nav-btn--right" onClick={() => setStudentPage((p) => Math.min(totalStudentPages - 1, p + 1))} disabled={studentPage >= totalStudentPages - 1}>›</button>
        </div>
      </div>
    </div>
  );
}
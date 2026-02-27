import { useState } from "react";
import "./EditExam.css";

export default function EditExamModal({ exam, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...exam });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="edit-exam-card">
        <h2 className="edit-exam-title">Edit Exam</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Exam Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Date</label>
              <div className="input-with-icon">
                <input 
                  type="text" 
                  value={formData.date} 
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group flex-1">
              <label>Duration (min)</label>
              <input 
                type="number" 
                value={formData.duration} 
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>

            <div className="form-group flex-1">
              <label>Number of questions</label>
              <input 
                type="number" 
                value={formData.questions} 
                onChange={(e) => setFormData({...formData, questions: e.target.value})}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-save">Save Edits</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
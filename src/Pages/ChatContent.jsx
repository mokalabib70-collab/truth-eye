/* import { useState, useRef, useEffect } from "react";
import "./ChatContent.css";

const initStudentChats = [
  { id: 1, name: "Sara Ahmed Ali", avatar: "https://randomuser.me/api/portraits/women/44.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:00", unread: 1 },
  { id: 2, name: "Alaa Ali Sami", avatar: "https://randomuser.me/api/portraits/men/45.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:30", unread: 1 },
  { id: 3, name: "Mai Ahmed Ali", avatar: "https://randomuser.me/api/portraits/women/46.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "1 days ago", unread: 0 },
  { id: 4, name: "Ahmed Mohammad Ali", avatar: "https://randomuser.me/api/portraits/men/47.jpg", lastMsg: "I understand now, thank you!", time: "2 days ago", unread: 0 },
];

const initGroupChats = [
  { id: 10, name: "Quiz OS Group1", avatar: null, lastMsg: "Results will be posted tomorrow", time: "1 days ago", unread: 0 },
  { id: 11, name: "MM 501 Group5", avatar: null, lastMsg: "Assignment is due Friday", time: "2 days ago", unread: 0 },
];

const initMessages = {
  1: [
    { id: 1, from: "student", text: "Hello Dr. Ahmed", time: "12:55" },
    { id: 2, from: "me", text: "Hello Sara, how can I help you?", time: "12:56" },
    { id: 3, from: "student", text: "I didn't understand question 5. Could you explain the concept again?", time: "13:00" },
    { id: 4, from: "me", text: "Of course! The concept is about Object Oriented Programming.", time: "13:02" },
    { id: 5, from: "me", text: "Let me know if that helps.", time: "13:03" },
    { id: 6, from: "student", text: "Thank you so much!", time: "13:05" },
  ],
  2: [
    { id: 1, from: "student", text: "Good morning doctor", time: "13:20" },
    { id: 2, from: "student", text: "I didn't understand question 5. Could you explain?", time: "13:30" },
    { id: 3, from: "me", text: "Sure Alaa, give me a moment.", time: "13:31" },
    { id: 4, from: "me", text: "Here is the explanation...", time: "13:32" },
    { id: 5, from: "student", text: "Makes sense now!", time: "13:35" },
  ],
  10: [
    { id: 1, from: "student", text: "When will results be posted?", time: "Yesterday" },
    { id: 2, from: "me", text: "Results will be posted tomorrow", time: "1 days ago" },
    { id: 3, from: "student", text: "Thank you doctor!", time: "1 days ago" },
  ],
  11: [
    { id: 1, from: "student", text: "Is assignment due this Friday?", time: "2 days ago" },
    { id: 2, from: "me", text: "Assignment is due Friday", time: "2 days ago" },
  ],
};

const allStudents = ["Sara Ahmed Ali", "Alaa Ali Sami", "Mai Ahmed Ali", "Ahmed Mohammad Ali"];
const allGroups = ["Quiz OS Group1", "MM 501 Group5"];

export default function ChatContent() {
  const [tab, setTab] = useState("Students");
  const [studentChats, setStudentChats] = useState(initStudentChats);
  const [groupChats, setGroupChats] = useState(initGroupChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(initMessages);
  const [inputText, setInputText] = useState("");
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [newMsgType, setNewMsgType] = useState("Specific Student");
  const [newMsgTarget, setNewMsgTarget] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  const chatList = tab === "Students" ? studentChats : groupChats;
  const filteredChats = chatList.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentMessages = selectedChat ? (messages[selectedChat.id] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const sendMessage = () => {
    if (!inputText.trim() || !selectedChat) return;
    const newMsg = { id: Date.now(), from: "me", text: inputText, time: "now" };
    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));
    const updateList = (list) =>
      list.map((c) => c.id === selectedChat.id ? { ...c, lastMsg: inputText, time: "now" } : c);
    setStudentChats(updateList);
    setGroupChats(updateList);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStartNewChat = () => {
    if (newMsgType === "All Students") {
      alert("General Announcement sent to all students!");
      setShowNewMsg(false);
      return;
    }
    if (!newMsgTarget) return;

    const isGroup = newMsgType === "Student Group";
    const existingList = isGroup ? groupChats : studentChats;
    const existing = existingList.find((c) => c.name === newMsgTarget);

    if (existing) {
      setTab(isGroup ? "Group" : "Students");
      setSelectedChat(existing);
      setShowNewMsg(false);
    } else {
      const newChat = {
        id: Date.now(),
        name: newMsgTarget,
        avatar: isGroup ? null : "https://randomuser.me/api/portraits/lego/1.jpg",
        lastMsg: "",
        time: "now",
        unread: 0,
      };
      if (isGroup) {
        setGroupChats((prev) => [newChat, ...prev]);
        setTab("Group");
      } else {
        setStudentChats((prev) => [newChat, ...prev]);
        setTab("Students");
      }
      setMessages((prev) => ({ ...prev, [newChat.id]: [] }));
      setSelectedChat(newChat);
      setShowNewMsg(false);
    }
    setNewMsgTarget("");
  };

  return (
    <div className="chat-wrap">

     
      <div className="chat-left">
        <div className="chat-left__header">
          <div>
            <h2 className="chat-left__title">Massages</h2>
            <p className="chat-left__unread">2 unread Massages</p>
          </div>
          <button
            className="chat-left__btn-new"
            onClick={() => { setShowNewMsg(true); setNewMsgType("Specific Student"); setNewMsgTarget(""); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div className="chat-left__search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff88" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="chat-left__tabs">
          {["Students", "Group"].map((t) => (
            <button
              key={t}
              className={`chat-left__tab ${tab === t ? "chat-left__tab--active" : ""}`}
              onClick={() => { setTab(t); setSelectedChat(null); setShowNewMsg(false); }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="chat-left__list">
          {filteredChats.length === 0 && (
            <p className="chat-left__empty">You have no chats yet.</p>
          )}
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? "chat-item--active" : ""}`}
              onClick={() => { setSelectedChat(chat); setShowNewMsg(false); }}
            >
              <div className="chat-item__avatar">
                {chat.avatar
                  ? <img src={chat.avatar} alt={chat.name} />
                  : <div className="chat-item__avatar-placeholder" />}
              </div>
              <div className="chat-item__info">
                <div className="chat-item__top">
                  <span className="chat-item__name">{chat.name}</span>
                  <span className="chat-item__time">{chat.time}</span>
                </div>
                <div className="chat-item__bottom">
                  <span className="chat-item__last">{chat.lastMsg}</span>
                  {chat.unread > 0 && <span className="chat-item__badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {showNewMsg && (
        <div className="chat-new">
          <div className="chat-new__header">
            <h3>New Massage</h3>
            <button onClick={() => setShowNewMsg(false)}>✕</button>
          </div>

          <div className="chat-new__options">
            {["Specific Student", "Student Group", "All Students"].map((type) => (
              <button
                key={type}
                className={`chat-new__option ${newMsgType === type ? "chat-new__option--active" : ""}`}
                onClick={() => { setNewMsgType(type); setNewMsgTarget(""); }}
              >
                <span className={`chat-new__radio ${newMsgType === type ? "chat-new__radio--active" : ""}`} />
                <span>{type}</span>
              </button>
            ))}
          </div>

          {newMsgType === "All Students" && (
            <div className="chat-new__announcement">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f3b300" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div>
                <p className="chat-new__ann-title">General Announcement</p>
                <p className="chat-new__ann-sub">This message will be sent to all students in your database</p>
              </div>
            </div>
          )}

          {newMsgType === "Specific Student" && (
            <div className="chat-new__select-wrap">
              <label>Select Student</label>
              <div className="chat-new__select">
                <select value={newMsgTarget} onChange={(e) => setNewMsgTarget(e.target.value)}>
                  <option value="">Choose..</option>
                  {allStudents.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          )}

          {newMsgType === "Student Group" && (
            <div className="chat-new__select-wrap">
              <label>Select Group</label>
              <div className="chat-new__select">
                <select value={newMsgTarget} onChange={(e) => setNewMsgTarget(e.target.value)}>
                  <option value="">Choose..</option>
                  {allGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
          )}

          <button
            className="chat-new__btn-start"
            onClick={handleStartNewChat}
            disabled={newMsgType !== "All Students" && !newMsgTarget}
          >
            {newMsgType === "All Students" ? "Send Announcement" : "Open Chat"}
          </button>
        </div>
      )}

      
      <div className="chat-right">
        {selectedChat ? (
          <>
            <div className="chat-right__header">
              <div className="chat-right__avatar">
                {selectedChat.avatar
                  ? <img src={selectedChat.avatar} alt={selectedChat.name} />
                  : <div className="chat-right__avatar-placeholder" />}
              </div>
              <span className="chat-right__name">{selectedChat.name}</span>
            </div>

            <div className="chat-right__messages">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.from === "me" ? "chat-msg--me" : "chat-msg--them"}`}>
                  <div className="chat-msg__bubble">{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-right__input">
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </button>
              <input
                type="text"
                placeholder="Type your massage here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button className="chat-input__send" onClick={sendMessage} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="chat-right__empty">
            {!showNewMsg && (
              <>
                <div className="chat-right__empty-icon">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <p>Start typing your message</p>
              </>
            )}
            <div className="chat-right__input">
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </button>
              <input
              type="text"
                placeholder="Type your massage here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && inputText.trim()) {
                    e.preventDefault();
                    setShowNewMsg(true);
                  }
                }}
                autoFocus
              />
              <button className="chat-input__send" type="button"  onClick={() => { if (inputText.trim()) setShowNewMsg(true); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} */
import { useState, useRef, useEffect } from "react";
import "./ChatContent.css";

const initStudentChats = [
  { id: 1, name: "Sara Ahmed Ali", avatar: "https://randomuser.me/api/portraits/women/44.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:00", unread: 1 },
  { id: 2, name: "Alaa Ali Sami", avatar: "https://randomuser.me/api/portraits/men/45.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "13:30", unread: 1 },
  { id: 3, name: "Mai Ahmed Ali", avatar: "https://randomuser.me/api/portraits/women/46.jpg", lastMsg: "I didn't understand question 5. Could you explain the q...", time: "1 days ago", unread: 0 },
  { id: 4, name: "Ahmed Mohammad Ali", avatar: "https://randomuser.me/api/portraits/men/47.jpg", lastMsg: "I understand now, thank you!", time: "2 days ago", unread: 0 },
];

const initGroupChats = [
  { id: 10, name: "Quiz OS Group1", avatar: null, lastMsg: "Results will be posted tomorrow", time: "1 days ago", unread: 0 },
  { id: 11, name: "MM 501 Group5", avatar: null, lastMsg: "Assignment is due Friday", time: "2 days ago", unread: 0 },
];

const initMessages = {
  1: [
    { id: 1, from: "student", text: "Hello Dr. Ahmed", time: "12:55" },
    { id: 2, from: "me", text: "Hello Sara, how can I help you?", time: "12:56" },
    { id: 3, from: "student", text: "I didn't understand question 5. Could you explain the concept again?", time: "13:00" },
    { id: 4, from: "me", text: "Of course! The concept is about Object Oriented Programming.", time: "13:02" },
    { id: 5, from: "me", text: "Let me know if that helps.", time: "13:03" },
    { id: 6, from: "student", text: "Thank you so much!", time: "13:05" },
  ],
  2: [
    { id: 1, from: "student", text: "Good morning doctor", time: "13:20" },
    { id: 2, from: "student", text: "I didn't understand question 5. Could you explain?", time: "13:30" },
    { id: 3, from: "me", text: "Sure Alaa, give me a moment.", time: "13:31" },
    { id: 4, from: "me", text: "Here is the explanation...", time: "13:32" },
    { id: 5, from: "student", text: "Makes sense now!", time: "13:35" },
  ],
  10: [
    { id: 1, from: "student", text: "When will results be posted?", time: "Yesterday" },
    { id: 2, from: "me", text: "Results will be posted tomorrow", time: "1 days ago" },
    { id: 3, from: "student", text: "Thank you doctor!", time: "1 days ago" },
  ],
  11: [
    { id: 1, from: "student", text: "Is assignment due this Friday?", time: "2 days ago" },
    { id: 2, from: "me", text: "Assignment is due Friday", time: "2 days ago" },
  ],
};

const allStudents = ["Sara Ahmed Ali", "Alaa Ali Sami", "Mai Ahmed Ali", "Ahmed Mohammad Ali"];
const allGroups = ["Quiz OS Group1", "MM 501 Group5"];

export default function ChatContent() {
  const [tab, setTab] = useState("Students");
  const [studentChats, setStudentChats] = useState(initStudentChats);
  const [groupChats, setGroupChats] = useState(initGroupChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(initMessages);
  const [inputText, setInputText] = useState("");
  const [showNewMsg, setShowNewMsg] = useState(false);
  const [newMsgType, setNewMsgType] = useState("Specific Student");
  const [newMsgTarget, setNewMsgTarget] = useState("");
  const [search, setSearch] = useState("");

  // Track if we're on mobile (≤640px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const messagesEndRef = useRef(null);

  // Listen for resize to update isMobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chatList = tab === "Students" ? studentChats : groupChats;
  const filteredChats = chatList.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentMessages = selectedChat ? (messages[selectedChat.id] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const sendMessage = () => {
    if (!inputText.trim() || !selectedChat) return;
    const newMsg = { id: Date.now(), from: "me", text: inputText, time: "now" };
    setMessages((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }));
    const updateList = (list) =>
      list.map((c) => c.id === selectedChat.id ? { ...c, lastMsg: inputText, time: "now" } : c);
    setStudentChats(updateList);
    setGroupChats(updateList);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleStartNewChat = () => {
    if (newMsgType === "All Students") {
      alert("General Announcement sent to all students!");
      setShowNewMsg(false);
      return;
    }
    if (!newMsgTarget) return;

    const isGroup = newMsgType === "Student Group";
    const existingList = isGroup ? groupChats : studentChats;
    const existing = existingList.find((c) => c.name === newMsgTarget);

    if (existing) {
      setTab(isGroup ? "Group" : "Students");
      setSelectedChat(existing);
      setShowNewMsg(false);
    } else {
      const newChat = {
        id: Date.now(),
        name: newMsgTarget,
        avatar: isGroup ? null : "https://randomuser.me/api/portraits/lego/1.jpg",
        lastMsg: "",
        time: "now",
        unread: 0,
      };
      if (isGroup) {
        setGroupChats((prev) => [newChat, ...prev]);
        setTab("Group");
      } else {
        setStudentChats((prev) => [newChat, ...prev]);
        setTab("Students");
      }
      setMessages((prev) => ({ ...prev, [newChat.id]: [] }));
      setSelectedChat(newChat);
      setShowNewMsg(false);
    }
    setNewMsgTarget("");
  };

  // On mobile: selecting a chat slides to the chat view
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowNewMsg(false);
  };

  // On mobile: back button returns to list
  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chat-wrap">

      {/* ── LEFT: Chat List ── */}
      <div className={`chat-left${isMobile && selectedChat ? " chat-left--hidden" : ""}`}>
        <div className="chat-left__header">
          <div>
            <h2 className="chat-left__title">Messages</h2>
            <p className="chat-left__unread">2 unread Messages</p>
          </div>
          <button
            className="chat-left__btn-new"
            onClick={() => { setShowNewMsg(true); setNewMsgType("Specific Student"); setNewMsgTarget(""); }}
            aria-label="New message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>

        <div className="chat-left__search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff88" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="chat-left__tabs">
          {["Students", "Group"].map((t) => (
            <button
              key={t}
              className={`chat-left__tab ${tab === t ? "chat-left__tab--active" : ""}`}
              onClick={() => { setTab(t); setSelectedChat(null); setShowNewMsg(false); }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="chat-left__list">
          {filteredChats.length === 0 && (
            <p className="chat-left__empty">You have no chats yet.</p>
          )}
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? "chat-item--active" : ""}`}
              onClick={() => handleSelectChat(chat)}
            >
              <div className="chat-item__avatar">
                {chat.avatar
                  ? <img src={chat.avatar} alt={chat.name} />
                  : <div className="chat-item__avatar-placeholder" />}
              </div>
              <div className="chat-item__info">
                <div className="chat-item__top">
                  <span className="chat-item__name">{chat.name}</span>
                  <span className="chat-item__time">{chat.time}</span>
                </div>
                <div className="chat-item__bottom">
                  <span className="chat-item__last">{chat.lastMsg}</span>
                  {chat.unread > 0 && <span className="chat-item__badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEW MESSAGE PANEL ── */}
      {showNewMsg && (
        <>
          {/* Backdrop for tablet/mobile */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 199 }}
            onClick={() => setShowNewMsg(false)}
          />
          <div className="chat-new" style={{ zIndex: 200 }}>
            <div className="chat-new__header">
              <h3>New Message</h3>
              <button onClick={() => setShowNewMsg(false)} aria-label="Close">✕</button>
            </div>

            <div className="chat-new__options">
              {["Specific Student", "Student Group", "All Students"].map((type) => (
                <button
                  key={type}
                  className={`chat-new__option ${newMsgType === type ? "chat-new__option--active" : ""}`}
                  onClick={() => { setNewMsgType(type); setNewMsgTarget(""); }}
                >
                  <span className={`chat-new__radio ${newMsgType === type ? "chat-new__radio--active" : ""}`} />
                  <span>{type}</span>
                </button>
              ))}
            </div>

            {newMsgType === "All Students" && (
              <div className="chat-new__announcement">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f3b300" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <div>
                  <p className="chat-new__ann-title">General Announcement</p>
                  <p className="chat-new__ann-sub">This message will be sent to all students in your database</p>
                </div>
              </div>
            )}

            {newMsgType === "Specific Student" && (
              <div className="chat-new__select-wrap">
                <label>Select Student</label>
                <div className="chat-new__select">
                  <select value={newMsgTarget} onChange={(e) => setNewMsgTarget(e.target.value)}>
                    <option value="">Choose..</option>
                    {allStudents.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            )}

            {newMsgType === "Student Group" && (
              <div className="chat-new__select-wrap">
                <label>Select Group</label>
                <div className="chat-new__select">
                  <select value={newMsgTarget} onChange={(e) => setNewMsgTarget(e.target.value)}>
                    <option value="">Choose..</option>
                    {allGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            )}

            <button
              className="chat-new__btn-start"
              onClick={handleStartNewChat}
              disabled={newMsgType !== "All Students" && !newMsgTarget}
            >
              {newMsgType === "All Students" ? "Send Announcement" : "Open Chat"}
            </button>
          </div>
        </>
      )}

      {/* ── RIGHT: Chat Area ── */}
      <div className={`chat-right${isMobile && selectedChat ? " chat-right--visible" : ""}`}>
        {selectedChat ? (
          <>
            <div className="chat-right__header">
              {/* Back button — visible only on mobile via CSS */}
              <button className="chat-right__back" onClick={handleBack} aria-label="Back">
                ‹
              </button>
              <div className="chat-right__avatar">
                {selectedChat.avatar
                  ? <img src={selectedChat.avatar} alt={selectedChat.name} />
                  : <div className="chat-right__avatar-placeholder" />}
              </div>
              <span className="chat-right__name">{selectedChat.name}</span>
            </div>

            <div className="chat-right__messages">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.from === "me" ? "chat-msg--me" : "chat-msg--them"}`}>
                  <div className="chat-msg__bubble">{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-right__input">
              <button className="chat-input__icon-btn" type="button" aria-label="Attach">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button" aria-label="Image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button" aria-label="Emoji">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </button>
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button className="chat-input__send" onClick={sendMessage} type="button" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="chat-right__empty">
            <div className="chat-right__empty-icon">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1c5332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p>Start typing your message</p>
            <div className="chat-right__input" style={{ width: "100%", maxWidth: 480 }}>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </button>
              <button className="chat-input__icon-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </button>
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && inputText.trim()) {
                    e.preventDefault();
                    setShowNewMsg(true);
                  }
                }}
              />
              <button
                className="chat-input__send"
                type="button"
                onClick={() => { if (inputText.trim()) setShowNewMsg(true); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
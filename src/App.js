import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/Pages/ShowList';
import CreatePage from './components/Pages/CreatePage';
import UpdatePage from './components/Pages/UpdatePage';
import DetailPage from './components/Pages/DetailPage';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('학생 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`DELETE error! status: ${response.status}`);
        fetchStudents();
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route
          path="/list"
          element={
            <div className="container mt-5">
              <h1 className="text-center text-primary">학생 관리 시스템</h1>
              <button
                className="btn btn-success mb-3"
                onClick={() => (window.location.href = '/create')}
              >
                학생 추가
              </button>
              <ShowList
                students={students}
                onDeleteClick={handleDelete}
              />
            </div>
          }
        />
        <Route path="/create" element={<CreatePage fetchStudents={fetchStudents} />} />
        <Route path="/update/:id" element={<UpdatePage fetchStudents={fetchStudents} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function DetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => setStudent(data))
        .catch((err) => console.error('데이터 로드 실패:', err));
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">학생 상세 정보</h1>
      <ul className="list-group">
        <li className="list-group-item">ID: {student.id}</li>
        <li className="list-group-item">Name: {student.name}</li>
        <li className="list-group-item">Email: {student.email}</li>
        <li className="list-group-item">Major: {student.major}</li>
        <li className="list-group-item">Hometown: {student.hometown}</li>
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => window.history.back()}>
        뒤로 가기
      </button>
    </div>
  );
}

export default DetailPage;
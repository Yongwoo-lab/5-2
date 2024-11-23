import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function UpdatePage({ fetchStudents }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    hometown: '',
  });
  const [modificationCount, setModificationCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setModificationCount((prevCount) => prevCount + 1);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, [name]: value }),
      });
    } catch (error) {
      console.error('API 업데이트 실패:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">학생 수정</h1>
      <div className="mb-3">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Major:</label>
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Hometown:</label>
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <p>수정 횟수: {modificationCount}</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/list')}>
        뒤로 가기
      </button>
    </div>
  );
}

export default UpdatePage;
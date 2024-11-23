import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function UpdatePage({ handleUpdate }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    hometown: '',
  });
  const [modificationCount, setModificationCount] = useState(0);

  const nameRef = useRef();
  const emailRef = useRef();
  const majorRef = useRef();
  const hometownRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('데이터 로드 실패:', error));
  }, [id]);

  const validate = () => {
    if (!formData.name) {
      alert('이름을 입력하세요.');
      nameRef.current.focus();
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      alert('유효한 이메일을 입력하세요.');
      emailRef.current.focus();
      return false;
    }
    if (!formData.major) {
      alert('전공을 입력하세요.');
      majorRef.current.focus();
      return false;
    }
    if (!formData.hometown) {
      alert('고향을 입력하세요.');
      hometownRef.current.focus();
      return false;
    }
    return true;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    const updatedData = { ...formData, [name]: value };

    setFormData(updatedData);

    setModificationCount((prevCount) => prevCount + 1);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        handleUpdate(updatedStudent);
      }
    } catch (error) {
      console.error('API 업데이트 실패:', error);
    }
  };

  const handleBack = () => {
    if (!validate()) {
      return; 
    }
    navigate('/list'); 
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">학생 수정</h1>
      <form>
        <div className="mb-3">
          <label>Name:</label>
          <input
            ref={nameRef}
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
            ref={emailRef}
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
            ref={majorRef}
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
            ref={hometownRef}
            type="text"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <p>수정 횟수: {modificationCount}</p>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={handleBack}
        >
          뒤로 가기
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
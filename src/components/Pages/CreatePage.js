import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://672b59cd976a834dd026b7d6.mockapi.io/member';

function CreatePage({ fetchStudents }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    hometown: '',
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const majorRef = useRef();
  const hometownRef = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`POST error! status: ${response.status}`);
      fetchStudents();
      navigate('/list');
    } catch (error) {
      console.error('추가 실패:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">학생 추가</h1>
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
      <button className="btn btn-primary" onClick={handleSubmit}>
        추가
      </button>
      <button className="btn btn-secondary ms-2" onClick={() => navigate('/list')}>
        취소
      </button>
    </div>
  );
}

export default CreatePage;
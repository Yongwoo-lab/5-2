import React from 'react';
import { useNavigate } from 'react-router-dom';

function ShowList({ students, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
            <th>Hometown</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.major}</td>
              <td>{student.hometown}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => navigate(`/detail/${student.id}`)}
                >
                  상세보기
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/update/${student.id}`)}
                >
                  수정
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteClick(student.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowList;
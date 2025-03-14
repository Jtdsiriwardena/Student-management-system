// app/components/StudentList.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentList({ students: initialStudents }) {
  const router = useRouter();
  const [students, setStudents] = useState(initialStudents);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      
      setStudents((prevStudents) => 
        prevStudents.filter((student) => student.id !== id)
      );
      
      router.refresh();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, ID or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-gray text-lg mb-4">No students found</p>
          <Link 
            href="/students/add" 
            className="btn btn-primary"
          >
            Add New Student
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Year</th>
                <th>Subject</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.year}</td>
                  <td>{student.subject}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/students/${student.id}`}
                        className="text-primary"
                      >
                        View
                      </Link>
                      <Link
                        href={`/students/${student.id}/edit`}
                        className="text-warning"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student.id)}
                        disabled={loading}
                        className="text-danger"
                        style={{ 
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
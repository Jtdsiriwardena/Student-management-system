// app/components/StudentForm.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentForm({ student }) {
  const router = useRouter();
  const isEditing = !!student;
  
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    year: '',
    subject: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        year: student.year.toString(),
        subject: student.subject,
      });
    }
  }, [student]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const url = isEditing 
        ? `/api/students/${student.id}` 
        : '/api/students';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      router.push('/students');
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card-body">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h2>
        
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="studentId">
              Student ID*
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="year">
              Year*
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1"
              max="12"
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="subject">
              Subject*
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? 'opacity-50' : ''}`}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Student' : 'Add Student'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/students')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
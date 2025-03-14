// app/page.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center'
    }}>
      <h1 className="text-3xl font-bold mb-6">Welcome to Student Management System</h1>
      <p style={{ 
        fontSize: '1.125rem',
        marginBottom: '2rem',
        maxWidth: '600px'
      }}>
        A comprehensive solution for managing student records including their ID, name, year, and subjects.
      </p>
      <div className="flex gap-4">
        <Link href="/students" className="btn btn-primary">
          View Students
        </Link>
        <Link href="/students/add" className="btn btn-success">
          Add New Student
        </Link>
      </div>
    </div>
  );
}
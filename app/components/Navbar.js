// app/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ backgroundColor: 'var(--primary-color)' }}>
      <div className="container flex justify-between items-center" style={{ padding: '0.75rem 1rem' }}>
        <Link href="/" style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Student Management System
        </Link>
        <div className="flex gap-4">
          <Link href="/students" style={{ color: 'white', textDecoration: 'none' }}>
            Students
          </Link>
          <Link href="/students/add" className="btn" style={{ 
            backgroundColor: 'white', 
            color: 'var(--primary-color)',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.25rem'
          }}>
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
}
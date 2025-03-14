
import Link from 'next/link';

export default function StudentCard({ student }) {
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h2>
          <span style={{ 
            backgroundColor: 'var(--primary-color)', 
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Year {student.year}
          </span>
        </div>
        
        <div className="mb-6" style={{ display: 'grid', gap: '1rem' }}>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray font-medium">Student ID:</div>
            <div className="col-span-2">{student.studentId}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray font-medium">Subject:</div>
            <div className="col-span-2">{student.subject}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray font-medium">Created:</div>
            <div className="col-span-2">
              {new Date(student.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray font-medium">Last Updated:</div>
            <div className="col-span-2">
              {new Date(student.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Link
            href={`/students/${student.id}/edit`}
            className="btn btn-warning"
          >
            Edit
          </Link>
          
          <Link
            href="/students"
            className="btn btn-secondary"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}
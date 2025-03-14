// app/students/add/page.js
import StudentForm from '@/app/components/StudentForm';

export default function AddStudentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Student</h1>
      <StudentForm />
    </div>
  );
}
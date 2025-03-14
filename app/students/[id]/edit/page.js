// app/students/[id]/edit/page.js
import { notFound } from 'next/navigation';
import StudentForm from '@/app/components/StudentForm';
import prisma from '@/lib/prisma';

async function getStudent(id) {
  const student = await prisma.student.findUnique({
    where: { id },
  });
  
  if (!student) {
    notFound();
  }
  
  return student;
}

export default async function EditStudentPage({ params }) {
  const student = await getStudent(params.id);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Student</h1>
      <StudentForm student={student} />
    </div>
  );
}
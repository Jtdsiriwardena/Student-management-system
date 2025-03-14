// app/students/[id]/page.js
import { notFound } from 'next/navigation';
import StudentCard from '@/app/components/StudentCard';
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

export default async function StudentPage({ params }) {
  const student = await getStudent(params.id);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student Details</h1>
      <StudentCard student={student} />
    </div>
  );
}
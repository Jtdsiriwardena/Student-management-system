// app/students/page.js
import { Suspense } from 'react';
import Link from 'next/link';
import StudentList from '../components/StudentList';
import prisma from '@/lib/prisma';

async function getStudents() {
  const students = await prisma.student.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return students;
}

export default async function StudentsPage() {
  const students = await getStudents();
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students</h1>
        <Link
          href="/students/add"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Student
        </Link>
      </div>
      
      <Suspense fallback={<div>Loading students...</div>}>
        <StudentList students={students} />
      </Suspense>
    </div>
  );
}
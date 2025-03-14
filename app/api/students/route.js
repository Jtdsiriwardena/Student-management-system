// app/api/students/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

// POST a new student
export async function POST(request) {
  try {
    const data = await request.json();
    const { studentId, firstName, lastName, year, subject } = data;
    
    // Validate the data
    if (!studentId || !firstName || !lastName || !year || !subject) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if studentId already exists
    const existingStudent = await prisma.student.findUnique({
      where: { studentId },
    });
    
    if (existingStudent) {
      return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
    }
    
    const student = await prisma.student.create({
      data: {
        studentId,
        firstName,
        lastName,
        year: parseInt(year),
        subject,
      },
    });
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
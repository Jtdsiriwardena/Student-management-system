// app/api/students/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET student by ID
export async function GET(request, { params }) {
  try {
    const id = params.id;
    const student = await prisma.student.findUnique({
      where: { id },
    });
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
  }
}

// PUT update student
export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const data = await request.json();
    const { studentId, firstName, lastName, year, subject } = data;
    
    // Validate the data
    if (!studentId || !firstName || !lastName || !year || !subject) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if studentId already exists for another student
    if (studentId) {
      const existingStudent = await prisma.student.findUnique({
        where: { studentId },
      });
      
      if (existingStudent && existingStudent.id !== id) {
        return NextResponse.json({ error: 'Student ID already exists' }, { status: 400 });
      }
    }
    
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        studentId,
        firstName,
        lastName,
        year: parseInt(year),
        subject,
      },
    });
    
    return NextResponse.json(updatedStudent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

// DELETE student
export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    await prisma.student.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
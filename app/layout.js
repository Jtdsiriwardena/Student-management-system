// app/layout.js
import './styles/globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Student Management System',
  description: 'A CRUD application for managing students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
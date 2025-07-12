import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom"
import Navbar from './components/navbar'
import { Noteslist } from './components/noteslist'
import { Createnotes } from './components/createnotes'
import { Viewnotes } from './components/Viewnotes'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Logout from './components/logout'

// Simple authentication check
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Protected route wrapper
function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Noteslist /> },
      { path: "notes", element: <Createnotes /> },
      { path: "editnotes/:id", element: <Viewnotes /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App

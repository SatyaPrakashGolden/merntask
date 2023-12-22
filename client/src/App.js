import Login from './pages/login/Login'
import Register from './pages/register/Register'
import React, { useContext } from 'react'
import { AuthContext } from "./context/authContext";
import Home from './pages/home/Home'
import Write from './pages/write/Write'
import Topbar from './components/topbar/Topbar'
import Update from './components/update/Update'
import Reads from './components/read/Reads';
import Mynotes from './components/mynotes/Mynotes'
import { createBrowserRouter, RouterProvider, Outlet, Navigate, } from "react-router-dom";
const App = () => {
  let { currentUser } = useContext(AuthContext);
  const Layout = () => {
    return (
      <div className="">
        <Topbar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
      </div>
    )
  };
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/reads/:id",
          element: <Reads/>,
        },
        {
          path: "/write",
          element: <Write/>,
        },
        {
          path: "/mynotes",
          element: <Mynotes/>,
        },
        {
          path: "/update/:id",
          element: <Update/>,
        }
        
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);
  return (
      <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
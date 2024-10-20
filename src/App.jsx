import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


function App() {

  const isLoggedIn = localStorage.getItem('jwtToken') ? true : false;

  const wrapPrivateRoute = (element, user, redirect) => {
    return (
      <PrivateRoute user={user} redirect={redirect}>
        {element}
      </PrivateRoute>
    );
  };

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Home />,
    },
    {
      path:"/auth/login", element:<Login />,
    },
    {
      path:"/auth/register", element:<Register />,
    },
    {
      path:"/protected/*", element:wrapPrivateRoute(<ProtectedRoute />, isLoggedIn, '/protected'),
    }
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

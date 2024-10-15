import Landing from './pages/landing';
import Login from './pages/login';
import MainHome from './pages/main-home';
import MyCollection from './pages/my-collection';
import Register from './pages/register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Wallet from './pages/wallet';
import NotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  { path:"/signup",
  element: <Register />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/home",
    element:<MainHome />
  },
  {
    path:"/myalbums",
    element: <MyCollection />
  },
  {
    path:"/mywallet",
    element:<Wallet />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

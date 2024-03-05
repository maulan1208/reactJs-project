import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutRoot from 'pages/layout-root/LayoutRoot';
import UserList from 'components/user-list/UserList';
import UserEdit from 'components/user-edit/UserEdit';
import Login from 'components/login/Login'
import ResetAccount from "components/reset-account/ResetAccount";
import Register from 'components/register/Register'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot/>,

    children:[
      {
        path: "/",
        element: <UserList/>
      },
      {
        path: "user/create",
        element: <UserEdit />
      },
      {
        path: "edit/:userID",
        element: <UserEdit/>
      }
    ]
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "reset-account",
    element: <ResetAccount/> 
  },
  {
    path: "register",
    element: <Register/> 
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

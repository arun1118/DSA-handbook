import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import store from './store.js';
import {Provider} from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ProblemList from "./components/ProblemList.jsx";
import Layout from "./components/Layout.jsx";
import AddProblemForm from "./components/AddProblemForm.jsx";
import SingleProblemPage from "./components/SingleProblemPage.jsx";
import EditproblemPage from "./components/EditproblemPage.jsx";
import Notfound from "./components/Notfound.jsx";

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />}/>
      <Route path='/login' element={<LoginScreen />}/>
      <Route path='/register' element={<RegisterScreen />}/>
      {/* private routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />}/> 
        <Route path='/problems' element={<Layout />}>
          <Route index element={<ProblemList />}/>
          <Route path='addproblem'element={<AddProblemForm />}/>
          {/* <Route path='problem/:problemId'element={<SingleProblemPage />}/> */}
          <Route path='problem/:problemName'element={<SingleProblemPage />}/>
          <Route path='edit/:problemName'element={<EditproblemPage />}/>
        </Route>
      </Route>
      <Route path="*" element={<Notfound />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
)
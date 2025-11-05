import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Test from './pages/Test.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import LabDashboard from './components/Dashboard/LabDashboard.jsx';
import {Provider} from "react-redux"
import {store} from "./store/store.js"
import LabRegister from './components/LabRegister.jsx';
import Protected from './components/Protected.jsx';
import Appointments from './components/Appointments.jsx';
import PendingRequests from './components/PendingRequests.jsx';
import TotalAppointmentsLab from './components/TotalAppointmentsLab.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/test' element={<Test />} />
      <Route path='/book-appointment' element={
         <BookAppointment />
      } />
      <Route path='/user-dashboard' element={
        <UserDashboard />
        }>
        </Route>
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/pending-requests' element={<PendingRequests />} />

        <Route path='/lab-appointments' element={<TotalAppointmentsLab />} />
      <Route path='/lab-dashboard' element={
        <LabDashboard />
        } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

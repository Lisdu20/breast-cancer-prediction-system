import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/Home'
import Assessment from './pages/dashboard/Assessment'
import Result from './pages/dashboard/Result'
import History from './pages/dashboard/History'
import Recommendations from './pages/dashboard/Recommendations'
import Information from './pages/dashboard/Information'
import Profile from './pages/dashboard/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<History />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="information" element={<Information />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

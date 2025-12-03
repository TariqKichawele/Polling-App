import './App.css'
import Header from './pages/header/Header'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/auth/signup/Signup'
import Login from './pages/auth/login/Login'
import Dashboard from './pages/user/dashboard/Dashboard'
import CreatePoll from './pages/user/create-poll/CreatePoll'
import ViewPolls from './pages/user/view-polls/ViewPolls'
import ViewPollDetails from './pages/user/view-polls/ViewPollDetails'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/poll/create" element={<CreatePoll />} />
        <Route path="/my-polls" element={<ViewPolls />} />
        <Route path="/poll/:id/view" element={<ViewPollDetails />} />
      </Routes>
    </>
  )
}

export default App

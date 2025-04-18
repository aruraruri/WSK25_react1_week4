import './App.css'
import Home from './Views/Home'
import Profile from './Views/Profile'
import Upload from './Views/Upload'
import Single from './Views/Single'
import Login from './Views/Login'
import Logout from './Views/Logout'

import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './Components/Layout';

function App() {
  // make a table with the mediaArray
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/" element={<Home />} />
          {/* TODO: add missing routes */}
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

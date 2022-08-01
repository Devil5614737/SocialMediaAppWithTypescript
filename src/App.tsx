
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import {
  Routes,
  Route,
} from "react-router-dom";
import AuthContextProvider from './context/AuthContext';
import PostContextProvider from './context/PostContext';
import Profile from './pages/Profile';


function App() {
  return (
        <AuthContextProvider>
    <PostContextProvider>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

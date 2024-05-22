

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserRoute from './routes/UserRoute';


function App() {

  return (
    <div>
<Router>
  <Routes>
    <Route path='/*' element={<UserRoute />} ></Route>
    
  </Routes>
</Router>
    </div>
  )
}

export default App

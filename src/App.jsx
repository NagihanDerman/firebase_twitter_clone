import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Protected from "./pages/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Kullanicinin, hesabına erismek icin  giriş yapması zorunlu olan route'ları kapsayıcı bir route icine alma */}
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/setting" element={<h1>Setting</h1>} />
          <Route path="/Message" element={<h1>Message</h1>} />
          <Route path="/mail" element={<h1>Email</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

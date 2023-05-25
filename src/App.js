import GlobalStyle from "./assets/styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./contexts/auth";
import useLocalStorage from "./hooks/useLocalStorage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage"
import IncomePage from "./pages/IncomePage"
import ExpensePage from "./pages/ExpensePage"
import EditPage from "./pages/EditPage";

export default function App() {
  const [user, setUser] = useLocalStorage("user", null);


  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/income" element={<IncomePage />}/>
          <Route path="/expense" element={<ExpensePage />}/>
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

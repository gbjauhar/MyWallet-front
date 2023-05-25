import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./auth";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import useLocalStorage from "./useLocalStorage";
import HomePage from "./HomePage"
import IncomePage from "./IncomePage"
import ExpensePage from "./ExpensePage"
import EditPage from "./EditPage";

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

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import PowerFeedPage from "./pages/powerfeed/Powerfeed";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import TopPowerpostsPage from "./pages/topPowerposts/TopPowerpostsPage";
import LiftLogPage from "./pages/liftLogPage/LiftLogPage";
import OneRMCalculatorPage from "./pages/onermcalculatorPage/OneRMCalculatorPage";
import ArticlesPage from "./pages/articlesPage/ArticlesPage";
import CreateArticlePage from "./pages/createArticlePage/CreateArticlePage";
import Article from "./pages/article/Article";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router forceRefresh={true}>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/powerfeed" element={<PowerFeedPage />} />
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/toppowerposts"
          element={user ? <TopPowerpostsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/liftlog"
          element={user ? <LiftLogPage /> : <Navigate to="/" />}
        />
        <Route
          path="/onermcalculator"
          element={user ? <OneRMCalculatorPage /> : <Navigate to="/" />}
        />
        <Route
          path="/articles"
          element={user ? <ArticlesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/articles/create"
          element={user?.isAdmin ? <CreateArticlePage /> : <Navigate to="/" />}
        />
        <Route path="/articles/:articleId" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;

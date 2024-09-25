import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import axios from "axios";
import { server } from "./constant/config";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home")); //dynamicly loads pages when called,code splitting

const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"));

import { LayoutLoader } from "./components/Layout/Loaders";
import Groups from "./pages/Groups";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { SocketProvider, getSocket } from "./socket.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch(() => dispatch(userNotExists()));
  }, []);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <LayoutLoader />
          </div>
        }
      >
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/group" element={<Groups />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect={"/"}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FormContextProvider } from "./contexts/FormContext";
import Event from "./pages/Event";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <AppProvider>
          <FormContextProvider>
            <AppLayout>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="/create" element={<CreateEvent />} />
                  <Route path="/edit/:eventId" element={<EditEvent />} />
                  <Route path="/:eventId" element={<Event />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AppLayout>
          </FormContextProvider>
        </AppProvider>
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
};

export default App;

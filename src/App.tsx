import { AuthContextProvider } from "./contexts/AuthContext";
import { FormContextProvider } from "./contexts/FormContext";
import { AppProvider } from "./contexts/AppContext";

import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Event from "./pages/Event";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import PaymentPage from "./pages/PaymentPage";

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
                  <Route path="/:eventId/pay" element={<PaymentPage />} />
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

import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeProvider,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import CreateMeeting from "./pages/CreateMeeting";
import OneonOneMeeting from "./pages/OneonOneMeeting";
import { useAppSelector } from "./app/hooks";
import { setToasts } from "./app/slices/MeetingSlice";
import { useDispatch } from "react-redux";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";
import Meetings from "./pages/Meetings";
import JoinMeeting from "./pages/JoinMeeting";

function App() {
  const dispatch = useDispatch();
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };
  return (
    <EuiProvider>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="*" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/create1on1" element={<OneonOneMeeting />} />
          <Route path="/videoconference" element={<VideoConference />} />
          <Route path="/mymeetings" element={<MyMeetings />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/join/:id" element={<JoinMeeting />} />
        </Routes>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={4000}
        />
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;

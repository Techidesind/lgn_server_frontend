import React, { useEffect } from "react";
import "./App.css";
import { Box, Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Authentication/ProtectRoute";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import BannerManagement from "./Pages/BannerManagement/BannerManagement";
import UserManagement from "./Pages/UserManagement/UserManagement";
import TournamentPage from "./Pages/TournamentManagement/TournamentPage.jsx";
import TourDetails from "./Pages/TournamentDetailsPage/TourDetails";
import Notification from "./Pages/Notification/Notification";
import SupportPage from "./Pages/SupportPage/SupportPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Store from "./Pages/Store/Store.jsx";
import VideoPage from "./Pages/VideoPages/VideoPage.jsx";
import ReedemHistory from "./Pages/ReedemHistory/ReedemHistory.jsx";


import Pusher from 'pusher-js';
import { GlobalContext } from "./Context/Context";


function App() {
  const { setNotifications, setNotificationsCount } = GlobalContext();

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.REACT_APP_KEY, {
      cluster: process.env.REACT_APP_CLUSTER,
    });

    // Subscribe to the channel
    const channel = pusher.subscribe('user-channel');

    // Bind to an event
    channel.bind('admin-notification', (data) => {
      console.log(data);
      if (data.fromAdmin === false) {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
        setNotificationsCount((prev) => prev + 1);
      }
    });

    // Cleanup function to unsubscribe from the channel
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect(); // Disconnect Pusher when component unmounts
    };
  }, []); // Empty dependency array to run once



  return (
    <div className="app">
      <Routes>
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />

        {/* Home page */}
        <Route
          path='/'
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Banner Management page */}
        <Route
          path='/banner'
          exact
          element={
            <ProtectedRoute>
              <BannerManagement />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* User Management page */}
        <Route
          path='/user'
          exact
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Tournament Management page */}
        <Route
          path='/tournament'
          exact
          element={
            <ProtectedRoute>
              <TournamentPage />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Tournament details Management page */}
        <Route
          path='/tournament-details/:id'
          exact
          element={
            <ProtectedRoute>
              <TourDetails />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Notification Management page */}
        <Route
          path='/notification'
          exact
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Support Management page */}
        <Route
          path='/support'
          exact
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        >
        </Route>

        {/* Store page */}
        <Route
          path={`/store`}
          exact
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />

        {/* Reels page */}
        <Route
          path={`/reels`}
          exact
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />

        {/* Reedem History page */}
        <Route
          path={`/reedem-history`}
          exact
          element={
            <ProtectedRoute>
              <ReedemHistory />
            </ProtectedRoute>
          }
        />

        {/* Create Banner page */}
        <Route
          path='*'
          exact
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

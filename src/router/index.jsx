import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthLayout } from "../component/AuthLayout";
import Layout from "../component/layout";
import { useAuth } from "../hooks/useAuth";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import { JWT_TOKEN } from "../utils/constants";
import Protected from "./Protected";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem(JWT_TOKEN);
      resolve(user);
    }, 2000)
  );
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={async () => defer({ userPromise: await getUserData() })}
    >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        />
      </Route>
    </Route>
  )
);

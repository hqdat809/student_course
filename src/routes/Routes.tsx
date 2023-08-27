import React, { Suspense } from "react";
import {
  Route,
  Routes as ReactRoutes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as RoutePaths from "./paths";

const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const AdminPage = React.lazy(() => import("../pages/admin/AdminPage"));
const CoursePage = React.lazy(() => import("../pages/course/CoursePage"));
const ProfilePage = React.lazy(() => import("../pages/profile/ProfilePage"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <SignIn />,
      path: "/",
    },
    {
      element: <SignIn />,
      path: RoutePaths.SIGNIN,
    },
    {
      element: <AdminPage />,
      children: [
        { path: RoutePaths.COURSE, element: <CoursePage /> },
        { path: RoutePaths.PROFILE, element: <ProfilePage /> },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  );
};

export default Routes;

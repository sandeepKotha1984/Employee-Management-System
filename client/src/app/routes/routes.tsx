import {lazy} from "react";
import { Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = lazy(() => import("../../components/pages/LoginPage"));
const DocumentWorkspacePage = lazy (() => import ("../../components/pages/DocumentWorkspacePage"));
const MainLayout = lazy (() => import ("../../components/layout/MainLayout"));
const ClaimsPage = lazy(() => import("../../features/claims/ClaimsPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/main",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="claims" replace />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "claims",
            element: <ClaimsPage />,
          },
          {
            path: ":claimid/documents",
            element: <DocumentWorkspacePage />,
          },
        ],
      },
    ],
  },
];

export default routes;

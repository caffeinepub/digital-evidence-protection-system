import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import Navbar from "./components/Navbar";
import { Navigate } from "./components/Navigate";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import CaseDashboard from "./pages/CaseDashboard";
import Contact from "./pages/Contact";
import EvidenceUpload from "./pages/EvidenceUpload";
import EvidenceVerification from "./pages/EvidenceVerification";
import Home from "./pages/Home";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";
import Login from "./pages/Login";
import OfficerDashboard from "./pages/OfficerDashboard";
import RolePortal from "./pages/RolePortal";
import Signup from "./pages/Signup";
import UserPortal from "./pages/UserPortal";

function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      <Navbar />
      <Outlet />
    </div>
  );
}

function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  if (isInitializing) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <Loader2
            className="mx-auto mb-3 w-8 h-8 animate-spin"
            style={{ color: "#DC2626" }}
          />
          <p
            className="text-sm font-mono"
            style={{ color: "rgba(240,240,240,0.4)" }}
          >
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify",
  component: EvidenceVerification,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});

const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: () => (
    <ProtectedContent>
      <EvidenceUpload />
    </ProtectedContent>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedContent>
      <CaseDashboard />
    </ProtectedContent>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedContent>
      <AdminPanel />
    </ProtectedContent>
  ),
});

const rolePortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/role-portal",
  component: () => (
    <ProtectedContent>
      <RolePortal />
    </ProtectedContent>
  ),
});

const investigatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/investigator",
  component: () => (
    <ProtectedContent>
      <InvestigatorDashboard />
    </ProtectedContent>
  ),
});

const officerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/officer",
  component: () => (
    <ProtectedContent>
      <OfficerDashboard />
    </ProtectedContent>
  ),
});

const userPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user-portal",
  component: () => (
    <ProtectedContent>
      <UserPortal />
    </ProtectedContent>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  verifyRoute,
  contactRoute,
  loginRoute,
  signupRoute,
  uploadRoute,
  dashboardRoute,
  adminRoute,
  rolePortalRoute,
  investigatorRoute,
  officerRoute,
  userPortalRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#13131a",
            border: "1px solid rgba(220,38,38,0.3)",
            color: "#f0f0f0",
          },
        }}
      />
    </LanguageProvider>
  );
}

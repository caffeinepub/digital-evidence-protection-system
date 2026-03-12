import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import CyberAnimatedBG from "./components/CyberAnimatedBG";
import Navbar from "./components/Navbar";
import ThreeBackground3D from "./components/ThreeBackground3D";
import { LanguageProvider } from "./contexts/LanguageContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EvidenceUpload from "./pages/EvidenceUpload";
import EvidenceVerification from "./pages/EvidenceVerification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Home = lazy(() => import("./pages/Home"));
const CaseDashboard = lazy(() => import("./pages/CaseDashboard"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const InvestigatorDashboard = lazy(
  () => import("./pages/InvestigatorDashboard"),
);
const OfficerDashboard = lazy(() => import("./pages/OfficerDashboard"));
const UserPortal = lazy(() => import("./pages/UserPortal"));
const MyPortal = lazy(() => import("./pages/MyPortal"));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#DC2626" }} />
    </div>
  );
}

function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f" }}>
      <ThreeBackground3D />
      <CyberAnimatedBG />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
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
  component: EvidenceUpload,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: CaseDashboard,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});
const investigatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/investigator",
  component: InvestigatorDashboard,
});
const officerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/officer",
  component: OfficerDashboard,
});
const userPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user-portal",
  component: UserPortal,
});
const myPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-portal",
  component: MyPortal,
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
  investigatorRoute,
  officerRoute,
  userPortalRoute,
  myPortalRoute,
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

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import StudentInfo from "./pages/StudentInfo";
import CareerVisualization from "./pages/CareerVisualization";
import PersonalityAssessment from "./pages/PersonalityAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function getRouteComponent(pathname) {
  const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  switch (path) {
    case "/":
      return <Welcome />;
    case "/auth":
      return <Auth />;
    case "/student-info":
      return <StudentInfo />;
    case "/career-visualization":
      return <CareerVisualization />;
    case "/personality-assessment":
      return <PersonalityAssessment />;
    default:
      return <NotFound />;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" theme="dark" />
      {getRouteComponent()}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


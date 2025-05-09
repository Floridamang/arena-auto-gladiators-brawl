
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Training from "./pages/Training";
import Market from "./pages/Market";
import Ludus from "./pages/Ludus";
import Rest from "./pages/Rest";
import { GameProvider } from "./context/GameContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <div className="w-full min-h-screen relative">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/arena" element={<Index />} />
              <Route path="/training" element={<Training />} />
              <Route path="/market" element={<Market />} />
              <Route path="/ludus" element={<Ludus />} />
              <Route path="/rest" element={<Rest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

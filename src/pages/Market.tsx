
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Market = () => {
  return (
    <div className="min-h-screen bg-game-light p-8">
      <Link to="/" className="flex items-center gap-2 text-game-primary mb-6 hover:text-game-primary/80">
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold text-game-dark mb-8">Market</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-game-dark text-center">Market coming soon...</p>
      </div>
    </div>
  );
};

export default Market;

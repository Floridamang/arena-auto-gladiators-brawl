
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sword, GraduationCap, Store, Bed } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-game-light p-8">
      {/* Character Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-game-dark mb-2">Septimus Gregorious</h1>
        <h2 className="text-2xl text-game-primary">House Gregorious</h2>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/arena" className="no-underline">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="h-6 w-6" />
                Gladiator Battle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Enter the arena and watch your gladiators fight</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/training" className="no-underline">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Training Camp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View and manage your gladiators</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/market" className="no-underline">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-6 w-6" />
                Market
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Buy and sell gladiators and equipment</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/rest" className="no-underline">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-6 w-6" />
                Sleep
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Rest and recover</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

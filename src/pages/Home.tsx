
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sword, GraduationCap, Store, Bed } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const HomePage = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center p-8 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/2c7581e1-7250-4d67-9894-3f83edbdd709.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better readability */}
      
      {/* Character Info Section - Top Left */}
      <div className="relative z-10 flex items-start gap-4 mb-12">
        <Avatar className="w-24 h-24 border-4 border-game-primary">
          <AvatarImage src="/lovable-uploads/8f18e069-f431-4d6b-8b8b-7ed3f153d601.png" alt="Septimus" />
          <AvatarFallback>SG</AvatarFallback>
        </Avatar>
        <div className="text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Septimus Gregorious</h1>
          <h2 className="text-2xl text-game-secondary drop-shadow-md">House Gregorious</h2>
        </div>
      </div>

      {/* Navigation Grid - Positioned according to the villa layout */}
      <div className="relative z-10 grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-32">
        {/* Top Row - Sleep and Training */}
        <div className="col-start-1 col-span-2 flex justify-between">
          <Link to="/rest" className="w-64">
            <Card className="bg-white/90 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-6 w-6" />
                  Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Rest and recover in your villa</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/training" className="w-64">
            <Card className="bg-white/90 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Training Camp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Train your gladiators</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Bottom Row - Arena and Market */}
        <div className="col-span-2 flex justify-center gap-6 mt-32">
          <Link to="/arena" className="w-64">
            <Card className="bg-white/90 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-6 w-6" />
                  Gladiator Battle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Enter the arena</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/market" className="w-64">
            <Card className="bg-white/90 hover:bg-white transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-6 w-6" />
                  Market
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Buy and sell gladiators</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

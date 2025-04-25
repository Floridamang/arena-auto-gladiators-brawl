
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Sword, GraduationCap, Store, Bed } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the image to check if it loads correctly
    const img = new Image();
    img.src = '/lovable-uploads/558cf441-f28f-4973-9408-42fa02f880d8.png';
    img.onload = () => {
      console.log("Background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load background image");
    };
  }, []);

  return (
    <div 
      className="min-h-screen relative bg-game-dark"
    >
      {/* Background div with absolute positioning */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/558cf441-f28f-4973-9408-42fa02f880d8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1
        }}
      />
      
      <div className="absolute inset-0 bg-black/30 z-0" /> {/* Overlay for better readability */}
      
      <div className="relative z-10 p-8">
        {/* Character Info Section - Top Left */}
        <div className="flex items-start gap-4 mb-12">
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
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
          {/* Top Row - Sleep area near the mansion/villa */}
          <div className="col-start-1 justify-self-start">
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
          </div>

          {/* Top Right - Training camp near the training area with gladiators */}
          <div className="col-start-2 justify-self-end">
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

          {/* Bottom Row - Arena and Market positioned toward the town in the distance */}
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

      {!imageLoaded && (
        <div className="absolute bottom-4 right-4 bg-game-primary text-white px-4 py-2 rounded-md z-20">
          Background image not loaded. Check console for details.
        </div>
      )}
    </div>
  );
};

export default HomePage;

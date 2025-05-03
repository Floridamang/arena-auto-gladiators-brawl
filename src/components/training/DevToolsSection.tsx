
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

interface DevToolsProps {
  devIncreaseLevel: () => void;
  devAddGold: (amount: number) => void;
}

const DevToolsSection = ({ devIncreaseLevel, devAddGold }: DevToolsProps) => {
  const [devMode, setDevMode] = useState(false);
  
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setDevMode(prev => !prev)}
          className="border-gray-300"
        >
          <Wrench className="h-4 w-4 mr-1" />
          {devMode ? "Hide" : "Show"} Dev Tools
        </Button>
      </div>
      
      {devMode && (
        <Card className="bg-gray-100 border-dashed border-gray-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-4 w-4" /> 
              Developer Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button onClick={() => devIncreaseLevel()}>
                Increase Level +1
              </Button>
              <Button onClick={() => devAddGold(500)}>
                Add 500 Gold
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DevToolsSection;

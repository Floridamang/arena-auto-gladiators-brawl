
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PrivateLessonsProps {
  gold: number;
  purchaseSkillPoint: (amount: number) => void;
}

const PrivateLessonsCard = ({ gold, purchaseSkillPoint }: PrivateLessonsProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Private Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Purchase additional skill points to enhance your gladiator's abilities.
          Each skill point costs 100 gold.
        </p>
        <div className="flex items-center gap-3">
          <Button onClick={() => purchaseSkillPoint(1)} disabled={gold < 100}>
            Buy 1 Skill Point (100 Gold)
          </Button>
          <Button onClick={() => purchaseSkillPoint(3)} disabled={gold < 300}>
            Buy 3 Skill Points (300 Gold)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivateLessonsCard;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RandomNumberDrawer = () => {
  const [maxNumber, setMaxNumber] = useState(100);
  const [drawCount, setDrawCount] = useState(10);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    setAvailableNumbers(numbers);
    setDrawnNumbers([]);
    setGameStarted(true);
  };

  const drawNumber = () => {
    if (availableNumbers.length === 0 || drawnNumbers.length >= drawCount) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers[randomIndex];
    
    setDrawnNumbers(prev => [...prev, drawnNumber]);
    setAvailableNumbers(prev => prev.filter(num => num !== drawnNumber));
  };

  const resetGame = () => {
    setGameStarted(false);
    setDrawnNumbers([]);
    setAvailableNumbers([]);
  };

  return (
    <div className="container mx-auto p-4">
      {!gameStarted ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Random Number Drawer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Maximum number range:</span>
                <Input 
                  type="number" 
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(Number(e.target.value))}
                  className="w-24"
                  min="10"
                  max="1000"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Number of draws:</span>
                <Input 
                  type="number" 
                  value={drawCount}
                  onChange={(e) => setDrawCount(Number(e.target.value))}
                  className="w-24"
                  min="1"
                  max="50"
                />
              </div>
              <Button 
                onClick={handleStartGame} 
                className="w-full"
                disabled={maxNumber < 10 || drawCount < 1 || drawCount > maxNumber}
              >
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Random Number Drawer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {drawnNumbers.map((num, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="cursor-default"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={drawNumber} 
                  disabled={drawnNumbers.length >= drawCount}
                  className="flex-1"
                >
                  Draw Number
                </Button>
                <Button 
                  onClick={resetGame} 
                  variant="secondary"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {drawnNumbers.length}/{drawCount} numbers drawn
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RandomNumberDrawer;

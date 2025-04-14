
import React from 'react';
import { Over, Ball } from '@/services/cricketApi';
import { cn } from '@/lib/utils';

interface RecentOversProps {
  overs: Over[];
}

const RecentOvers: React.FC<RecentOversProps> = ({ overs }) => {
  // Sort overs in descending order to show most recent first
  const sortedOvers = [...overs].sort((a, b) => b.over - a.over);
  // Take only the most recent 5 overs
  const recentOvers = sortedOvers.slice(0, 5);

  // Function to render the ball result with appropriate styling
  const renderBallResult = (ball: Ball) => {
    let bgColor = 'bg-gray-100'; // Default background
    let textColor = 'text-gray-800'; // Default text color

    // Apply specific styling based on ball outcome
    if (ball.wicket) {
      bgColor = 'bg-cricket-red';
      textColor = 'text-white';
    } else if (ball.score === 4) {
      bgColor = 'bg-cricket-blue';
      textColor = 'text-white';
    } else if (ball.score === 6) {
      bgColor = 'bg-cricket-green';
      textColor = 'text-white';
    } else if (ball.extra) {
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
    }

    // Determine what text to display
    let displayText = ball.score.toString();
    if (ball.wicket) displayText = 'W';
    if (ball.extra) displayText = ball.extraType.charAt(0);

    return (
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          bgColor,
          textColor
        )}
      >
        {displayText}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Overs</h3>
      
      {recentOvers.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent overs data available</p>
      ) : (
        <div className="space-y-3">
          {recentOvers.map((over) => (
            <div key={over.over} className="p-3 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Over {over.over}</span>
                <span className="text-sm text-gray-500">
                  {over.balls.reduce((sum, ball) => sum + (ball.score || 0), 0)} runs
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {over.balls.map((ball, idx) => (
                  <div key={idx} className="relative">
                    {renderBallResult(ball)}
                    <span className="absolute -top-1 -right-1 text-[10px] bg-white rounded-full w-3 h-3 flex items-center justify-center border">
                      {ball.ball}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOvers;

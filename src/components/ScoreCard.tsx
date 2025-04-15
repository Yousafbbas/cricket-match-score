import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Scorecard, Batsman, Bowler } from '@/services/cricketApi';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
  scorecard: Scorecard;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ scorecard }) => {
  const getBatsmanHighlight = (batsman: Batsman) => {
    if (batsman.runs >= 100) return "bg-gradient-to-r from-yellow-50 to-transparent";
    if (batsman.runs >= 50) return "bg-gradient-to-r from-gray-50 to-transparent";
    return "";
  };

  const getBowlerHighlight = (bowler: Bowler) => {
    if (bowler.wickets >= 5) return "bg-gradient-to-r from-yellow-50 to-transparent";
    if (bowler.wickets >= 3) return "bg-gradient-to-r from-gray-50 to-transparent";
    return "";
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 to-transparent px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {scorecard.battingTeam} Batting
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Batsman</TableHead>
                <TableHead className="w-fit font-semibold">Dismissal</TableHead>
                <TableHead className="text-right font-semibold">R</TableHead>
                <TableHead className="text-right font-semibold">B</TableHead>
                <TableHead className="text-right font-semibold">4s</TableHead>
                <TableHead className="text-right font-semibold">6s</TableHead>
                <TableHead className="text-right font-semibold">SR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.batsmen.map((batsman: Batsman, index: number) => (
                <TableRow 
                  key={index}
                  className={cn(
                    getBatsmanHighlight(batsman),
                    "transition-colors hover:bg-gray-50"
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{batsman.name}</span>
                      {batsman.runs >= 50 && (
                        <span className="text-xs text-gray-500">
                          {batsman.runs >= 100 ? "Century" : "Half Century"}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-gray-600">
                    {batsman.dismissal || "Not Out"}
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-semibold",
                    batsman.runs >= 100 ? "text-yellow-600" :
                    batsman.runs >= 50 ? "text-blue-600" : ""
                  )}>
                    {batsman.runs}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">{batsman.balls}</TableCell>
                  <TableCell className="text-right text-gray-600">{batsman.fours}</TableCell>
                  <TableCell className="text-right text-gray-600">{batsman.sixes}</TableCell>
                  <TableCell className="text-right text-gray-600">{batsman.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-green-50 to-transparent px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {scorecard.fieldingTeam} Bowling
          </h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Bowler</TableHead>
                <TableHead className="text-right font-semibold">O</TableHead>
                <TableHead className="text-right font-semibold">M</TableHead>
                <TableHead className="text-right font-semibold">R</TableHead>
                <TableHead className="text-right font-semibold">W</TableHead>
                <TableHead className="text-right font-semibold">Econ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.bowlers.map((bowler: Bowler, index: number) => (
                <TableRow 
                  key={index}
                  className={cn(
                    getBowlerHighlight(bowler),
                    "transition-colors hover:bg-gray-50"
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{bowler.name}</span>
                      {bowler.wickets >= 3 && (
                        <span className="text-xs text-gray-500">
                          {bowler.wickets >= 5 ? "5 Wicket Haul" : "3+ Wickets"}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-gray-600">{bowler.overs}</TableCell>
                  <TableCell className="text-right text-gray-600">{bowler.maidens}</TableCell>
                  <TableCell className="text-right text-gray-600">{bowler.runs}</TableCell>
                  <TableCell className={cn(
                    "text-right font-semibold",
                    bowler.wickets >= 5 ? "text-yellow-600" :
                    bowler.wickets >= 3 ? "text-green-600" : ""
                  )}>
                    {bowler.wickets}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">{bowler.economy.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;

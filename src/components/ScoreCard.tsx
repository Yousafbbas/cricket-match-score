
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

interface ScoreCardProps {
  scorecard: Scorecard;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ scorecard }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">{scorecard.battingTeam} Batting</h3>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batsman</TableHead>
                <TableHead className="w-fit">Dismissal</TableHead>
                <TableHead className="text-right">R</TableHead>
                <TableHead className="text-right">B</TableHead>
                <TableHead className="text-right">4s</TableHead>
                <TableHead className="text-right">6s</TableHead>
                <TableHead className="text-right">SR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.batsmen.map((batsman: Batsman, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{batsman.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{batsman.dismissal}</TableCell>
                  <TableCell className="text-right">{batsman.runs}</TableCell>
                  <TableCell className="text-right">{batsman.balls}</TableCell>
                  <TableCell className="text-right">{batsman.fours}</TableCell>
                  <TableCell className="text-right">{batsman.sixes}</TableCell>
                  <TableCell className="text-right">{batsman.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{scorecard.fieldingTeam} Bowling</h3>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bowler</TableHead>
                <TableHead className="text-right">O</TableHead>
                <TableHead className="text-right">M</TableHead>
                <TableHead className="text-right">R</TableHead>
                <TableHead className="text-right">W</TableHead>
                <TableHead className="text-right">Econ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.bowlers.map((bowler: Bowler, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{bowler.name}</TableCell>
                  <TableCell className="text-right">{bowler.overs}</TableCell>
                  <TableCell className="text-right">{bowler.maidens}</TableCell>
                  <TableCell className="text-right">{bowler.runs}</TableCell>
                  <TableCell className="text-right">{bowler.wickets}</TableCell>
                  <TableCell className="text-right">{bowler.economy.toFixed(2)}</TableCell>
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

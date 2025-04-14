import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Match, getFormattedDate, formatOvers } from '@/services/cricketApi';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  if (!match) {
    return null;
  }

  const isLive = match.status?.toLowerCase().includes("live") || false;
  const matchDate = match.dateTimeGMT ? new Date(match.dateTimeGMT) : new Date();

  const getTeamScore = (teamName: string) => {
    if (!match.score || !Array.isArray(match.score)) return null;
    const score = match.score.find(s => s?.inning?.includes(teamName));
    if (!score) return null;
    return `${score.r || 0}/${score.w || 0} (${score.o || 0})`;
  };

  const teams = match.teams || [];
  const teamInfo = match.teamInfo || [];

  // Function to determine match type
  const getMatchTypeBadge = () => {
    switch (match.matchType?.toLowerCase()) {
      case 't20':
        return <Badge className="bg-cricket-green">T20</Badge>;
      case 'odi':
        return <Badge className="bg-blue-500">ODI</Badge>;
      case 'test':
        return <Badge className="bg-red-600">TEST</Badge>;
      default:
        return <Badge>{match.matchType?.toUpperCase() || "Unknown"}</Badge>;
    }
  };

  return (
    <Link to={`/match/${match.id}`}>
      <Card className={`hover:shadow-lg transition-shadow ${isLive ? 'border-green-500 border-2' : ''}`}>
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm font-medium line-clamp-2">
              {match.name || "Untitled Match"}
            </CardTitle>
            <Badge variant={isLive ? "default" : "secondary"} className="ml-2">
              {match.status || "Unknown"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {format(matchDate, "PPp")}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teams.map((team, index) => {
              const info = teamInfo.find(t => t?.name === team);
              const score = getTeamScore(team);
              
              return (
                <div key={team || index} className="flex items-center space-x-2">
                  {info?.img && (
                    <img
                      src={info.img}
                      alt={team}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/24x24/gray/white?text=${info.shortname || 'T'}`;
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{info?.shortname || team}</p>
                    {score && (
                      <p className="text-sm text-muted-foreground">{score}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {match.venue && (
            <p className="text-xs text-muted-foreground mt-4">
              {match.venue}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

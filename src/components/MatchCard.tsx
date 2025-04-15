import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Match, getFormattedDate, formatOvers } from '@/services/cricketApi';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

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

  // Function to determine match type and color
  const getMatchTypeBadge = () => {
    switch (match.matchType?.toLowerCase()) {
      case 't20':
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">T20</Badge>;
      case 'odi':
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">ODI</Badge>;
      case 'test':
        return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700">TEST</Badge>;
      default:
        return <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700">{match.matchType?.toUpperCase() || "Unknown"}</Badge>;
    }
  };

  // Function to get status badge styling
  const getStatusBadge = () => {
    const baseStyle = "font-medium";
    if (isLive) {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className={cn(baseStyle, "text-green-600")}>{match.status}</span>
        </div>
      );
    }
    return <span className={cn(baseStyle, "text-gray-600")}>{match.status}</span>;
  };

  return (
    <Link to={`/match/${match.id}`} className="block transform transition-all duration-300 hover:scale-[1.02]">
      <Card className={cn(
        "backdrop-blur-sm bg-white/90 transition-all duration-300",
        isLive ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/10' : 'hover:shadow-xl',
        "relative overflow-hidden"
      )}>
        {isLive && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent" />
        )}
        
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CardTitle className="text-sm font-medium line-clamp-2 text-gray-900">
                {match.name || "Untitled Match"}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                {format(matchDate, "PPp")}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getMatchTypeBadge()}
              {getStatusBadge()}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {teams.map((team, index) => {
              const info = teamInfo.find(t => t?.name === team);
              const score = getTeamScore(team);
              
              return (
                <HoverCard key={team || index}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      {info?.img && (
                        <div className="relative w-8 h-8 flex-shrink-0">
                          <img
                            src={info.img}
                            alt={team}
                            className="w-full h-full object-contain rounded-full shadow-sm"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://placehold.co/32x32/gray/white?text=${info.shortname || 'T'}`;
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {info?.shortname || team}
                        </p>
                        {score && (
                          <p className="text-sm text-gray-600 font-medium">
                            {score}
                          </p>
                        )}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{team}</h4>
                        <p className="text-sm text-gray-600">
                          {score || "Yet to bat"}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
          {match.venue && (
            <div className="mt-4 flex items-start gap-1">
              <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-gray-500 leading-tight">
                {match.venue}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

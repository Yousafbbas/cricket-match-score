
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
  MatchDetails, 
  fetchMatchDetails,
  getFormattedDate,
  formatOvers
} from '@/services/cricketApi';
import ScoreCard from '@/components/ScoreCard';
import RecentOvers from '@/components/RecentOvers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MatchDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('summary');

  useEffect(() => {
    const getMatchDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      const details = await fetchMatchDetails(id);
      setMatchDetails(details);
      setLoading(false);
    };

    getMatchDetails();

    // Set up auto-refresh every 30 seconds for live matches
    const refreshInterval = setInterval(() => {
      if (matchDetails?.status.toLowerCase().includes('live')) {
        getMatchDetails();
      }
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-cricket-blue" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!matchDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Match Not Found</h2>
            <p className="text-gray-600 mb-6">The match you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/" 
              className="inline-flex items-center text-cricket-blue hover:text-cricket-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isLive = matchDetails.status.toLowerCase().includes('live');
  const team1 = matchDetails.teamInfo[0];
  const team2 = matchDetails.teamInfo[1];
  
  const getTeamScore = (teamName: string) => {
    const score = matchDetails.score.find(s => s.inning === teamName);
    if (!score) return null;
    return {
      runs: score.r,
      wickets: score.w,
      overs: formatOvers(score.o)
    };
  };

  const team1Score = getTeamScore(team1.name);
  const team2Score = getTeamScore(team2.name);

  // Get match type badge
  const getMatchTypeBadge = () => {
    switch (matchDetails.matchType.toLowerCase()) {
      case 't20':
        return <Badge className="bg-cricket-green">T20</Badge>;
      case 'odi':
        return <Badge className="bg-blue-500">ODI</Badge>;
      case 'test':
        return <Badge className="bg-red-600">TEST</Badge>;
      default:
        return <Badge>{matchDetails.matchType.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-cricket-blue text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-3">
              <Link 
                to="/" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
              <span className="text-white/60">|</span>
              <div className="flex items-center gap-2">
                {getMatchTypeBadge()}
                <span className="text-sm">{getFormattedDate(matchDetails.date)}</span>
                {isLive && (
                  <span className="flex items-center bg-cricket-red text-white text-xs px-2 py-0.5 rounded">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    LIVE
                  </span>
                )}
              </div>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold mb-4">{matchDetails.name}</h1>
            
            <div className="text-sm mb-1">{matchDetails.venue}</div>
            <div className="text-sm text-white/80 mb-4">{matchDetails.status}</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className={cn(
                "flex items-center p-4 rounded-lg",
                team1Score ? "bg-white/10" : "bg-white/5"
              )}>
                <div className="flex-shrink-0 w-12 h-12 mr-4">
                  <img 
                    src={team1.img} 
                    alt={team1.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/48x48/gray/white?text=" + team1.shortname;
                    }}
                  />
                </div>
                <div>
                  <h2 className="font-bold">{team1.name}</h2>
                  {team1Score && (
                    <div className="text-xl font-bold mt-1">
                      {team1Score.runs}/{team1Score.wickets} 
                      <span className="text-sm font-normal ml-2">
                        ({team1Score.overs})
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={cn(
                "flex items-center p-4 rounded-lg",
                team2Score ? "bg-white/10" : "bg-white/5"
              )}>
                <div className="flex-shrink-0 w-12 h-12 mr-4">
                  <img 
                    src={team2.img} 
                    alt={team2.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/48x48/gray/white?text=" + team2.shortname;
                    }}
                  />
                </div>
                <div>
                  <h2 className="font-bold">{team2.name}</h2>
                  {team2Score && (
                    <div className="text-xl font-bold mt-1">
                      {team2Score.runs}/{team2Score.wickets}
                      <span className="text-sm font-normal ml-2">
                        ({team2Score.overs})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <Tabs 
            defaultValue="summary" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
              <TabsTrigger value="overs">Recent Overs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="p-1">
              <div className="space-y-6">
                <div className="border rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3">Match Info</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600 col-span-1">Match Type:</span>
                      <span className="col-span-2">{matchDetails.matchType.toUpperCase()}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600 col-span-1">Venue:</span>
                      <span className="col-span-2">{matchDetails.venue}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600 col-span-1">Date:</span>
                      <span className="col-span-2">{getFormattedDate(matchDetails.date)}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600 col-span-1">Status:</span>
                      <span className="col-span-2">{matchDetails.status}</span>
                    </div>
                  </div>
                </div>
                
                {matchDetails.scorecard && (
                  <div className="space-y-6">
                    {matchDetails.scorecard.map((inning, index) => (
                      <div key={index} className="border rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">{inning.inning}</h3>
                        
                        {/* Top Batsmen */}
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-700 mb-2">Top Batsmen</h4>
                          <div className="space-y-3">
                            {inning.batsmen.slice(0, 3).map((batsman, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                                <div>
                                  <div className="font-medium">{batsman.name}</div>
                                  <div className="text-xs text-gray-500">{batsman.dismissal}</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg">{batsman.runs}</div>
                                  <div className="text-xs text-gray-500">{batsman.balls} balls (SR: {batsman.strikeRate.toFixed(2)})</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Top Bowlers */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Top Bowlers</h4>
                          <div className="space-y-3">
                            {inning.bowlers.slice(0, 3).map((bowler, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                                <div>
                                  <div className="font-medium">{bowler.name}</div>
                                  <div className="text-xs text-gray-500">{bowler.overs} overs (Econ: {bowler.economy.toFixed(2)})</div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-lg">{bowler.wickets}/{bowler.runs}</div>
                                  <div className="text-xs text-gray-500">{bowler.maidens} maiden{bowler.maidens !== 1 ? 's' : ''}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="scorecard" className="p-1">
              {matchDetails.scorecard ? (
                <div className="space-y-8">
                  {matchDetails.scorecard.map((inning, index) => (
                    <div key={index} className="border rounded-lg p-5">
                      <h3 className="text-xl font-semibold mb-4">{inning.inning}</h3>
                      <ScoreCard scorecard={inning} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Scorecard data is not available for this match.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overs" className="p-1">
              {matchDetails.scorecard ? (
                <div className="space-y-8">
                  {matchDetails.scorecard.map((inning, index) => (
                    <div key={index} className="border rounded-lg p-5">
                      <h3 className="text-xl font-semibold mb-4">{inning.inning}</h3>
                      <RecentOvers overs={inning.overs} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Overs data is not available for this match.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MatchDetailsPage;

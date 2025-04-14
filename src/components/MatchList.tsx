import { useQuery } from "@tanstack/react-query";
import { getLiveMatches } from "@/services/cricketApi";
import MatchCard from "./MatchCard";
import { Skeleton } from "./ui/skeleton";

export default function MatchList() {
  const { data: matches = [], isLoading, error } = useQuery({
    queryKey: ["liveMatches"],
    queryFn: getLiveMatches,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading matches. Please try again later.
      </div>
    );
  }

  if (!Array.isArray(matches) || matches.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No live matches available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {matches.map((match) => (
        <MatchCard key={match.id || Math.random()} match={match} />
      ))}
    </div>
  );
}

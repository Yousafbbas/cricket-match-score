import { toast } from "sonner";
import axios from 'axios';

// Constants for API configuration
const API_KEY = '4a403f5e-a4ca-43f6-a93d-8c39fba39529';
const BASE_URL = "https://api.cricapi.com/v1";

// Types for our cricket API responses
export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface MatchDetails {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  scorecard: Scorecard[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export interface Scorecard {
  inning: string;
  battingTeam: string;
  fieldingTeam: string;
  batsmen: Batsman[];
  bowlers: Bowler[];
  overs: Over[];
}

export interface Batsman {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

export interface Bowler {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface Over {
  over: number;
  balls: Ball[];
}

export interface Ball {
  ball: number;
  score: number;
  wicket: boolean;
  extra: boolean;
  extraType: string;
  comment: string;
}

export interface ApiResponse<T> {
  apikey: string;
  data: T;
  status: string;
  info: Info;
}

export interface Info {
  hitsToday: number;
  hitsUsed: number;
  hitsLimit: number;
  credits: number;
  creditsUsed: number;
  creditsLimit: number;
  server: number;
  offsetRows: number;
  totalRows: number;
  queryTime: number;
  s: number;
  cache: number;
}

export interface MatchesResponse {
  apikey: string;
  data: Match[];
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
  };
}

// Mock data for development (since we don't have an actual API key)
export const mockMatches: Match[] = [
  {
    id: "1",
    name: "Chennai Super Kings vs Mumbai Indians",
    matchType: "t20",
    status: "Chennai Super Kings won by 5 wickets",
    venue: "M.A. Chidambaram Stadium, Chennai",
    date: "2023-04-16",
    dateTimeGMT: "2023-04-16T14:00:00",
    teams: ["Chennai Super Kings", "Mumbai Indians"],
    teamInfo: [
      {
        name: "Chennai Super Kings",
        shortname: "CSK",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/150px-Chennai_Super_Kings_Logo.svg.png"
      },
      {
        name: "Mumbai Indians",
        shortname: "MI",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/150px-Mumbai_Indians_Logo.svg.png"
      }
    ],
    score: [
      {
        r: 172,
        w: 5,
        o: 19.2,
        inning: "Chennai Super Kings"
      },
      {
        r: 169,
        w: 8,
        o: 20,
        inning: "Mumbai Indians"
      }
    ],
    series_id: "ipl2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: true
  },
  {
    id: "2",
    name: "Royal Challengers Bangalore vs Kolkata Knight Riders",
    matchType: "t20",
    status: "Kolkata Knight Riders won by 21 runs",
    venue: "M. Chinnaswamy Stadium, Bangalore",
    date: "2023-04-17",
    dateTimeGMT: "2023-04-17T14:00:00",
    teams: ["Royal Challengers Bangalore", "Kolkata Knight Riders"],
    teamInfo: [
      {
        name: "Royal Challengers Bangalore",
        shortname: "RCB",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_2020.svg/150px-Royal_Challengers_Bangalore_2020.svg.png"
      },
      {
        name: "Kolkata Knight Riders",
        shortname: "KKR",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/150px-Kolkata_Knight_Riders_Logo.svg.png"
      }
    ],
    score: [
      {
        r: 154,
        w: 9,
        o: 20,
        inning: "Royal Challengers Bangalore"
      },
      {
        r: 175,
        w: 6,
        o: 20,
        inning: "Kolkata Knight Riders"
      }
    ],
    series_id: "ipl2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: true
  },
  {
    id: "3",
    name: "Australia vs England",
    matchType: "test",
    status: "Day 2: Stumps - England lead by 67 runs",
    venue: "Lord's, London",
    date: "2023-07-28",
    dateTimeGMT: "2023-07-28T10:00:00",
    teams: ["Australia", "England"],
    teamInfo: [
      {
        name: "Australia",
        shortname: "AUS",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/150px-Flag_of_Australia.svg.png"
      },
      {
        name: "England",
        shortname: "ENG",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/150px-Flag_of_England.svg.png"
      }
    ],
    score: [
      {
        r: 325,
        w: 10,
        o: 95.5,
        inning: "Australia"
      },
      {
        r: 392,
        w: 8,
        o: 102.5,
        inning: "England"
      }
    ],
    series_id: "ashes2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: false
  },
  {
    id: "4",
    name: "Islamabad United vs Lahore Qalandars",
    matchType: "t20",
    status: "Islamabad United won by 8 wickets",
    venue: "Gaddafi Stadium, Lahore",
    date: "2023-03-10",
    dateTimeGMT: "2023-03-10T14:00:00",
    teams: ["Islamabad United", "Lahore Qalandars"],
    teamInfo: [
      {
        name: "Islamabad United",
        shortname: "ISU",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Islamabad_United_logo.png/150px-Islamabad_United_logo.png"
      },
      {
        name: "Lahore Qalandars",
        shortname: "LHQ",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Lahore_Qalandars.png/150px-Lahore_Qalandars.png"
      }
    ],
    score: [
      {
        r: 183,
        w: 2,
        o: 18.1,
        inning: "Islamabad United"
      },
      {
        r: 182,
        w: 7,
        o: 20,
        inning: "Lahore Qalandars"
      }
    ],
    series_id: "psl2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: true
  },
  {
    id: "5",
    name: "India vs Pakistan",
    matchType: "odi",
    status: "Live - Pakistan needs 54 runs in 7.2 overs",
    venue: "Melbourne Cricket Ground, Melbourne",
    date: "2023-10-15",
    dateTimeGMT: "2023-10-15T03:30:00",
    teams: ["India", "Pakistan"],
    teamInfo: [
      {
        name: "India",
        shortname: "IND",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/150px-Flag_of_India.svg.png"
      },
      {
        name: "Pakistan",
        shortname: "PAK",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/150px-Flag_of_Pakistan.svg.png"
      }
    ],
    score: [
      {
        r: 234,
        w: 9,
        o: 50,
        inning: "India"
      },
      {
        r: 181,
        w: 6,
        o: 42.4,
        inning: "Pakistan"
      }
    ],
    series_id: "worldcup2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: false
  },
  {
    id: "6",
    name: "Karachi Kings vs Quetta Gladiators",
    matchType: "t20",
    status: "Live - Karachi Kings needs 23 runs in 14 balls",
    venue: "National Stadium, Karachi",
    date: "2023-03-12",
    dateTimeGMT: "2023-03-12T14:00:00",
    teams: ["Karachi Kings", "Quetta Gladiators"],
    teamInfo: [
      {
        name: "Karachi Kings",
        shortname: "KRK",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Karachi_Kings.png/150px-Karachi_Kings.png"
      },
      {
        name: "Quetta Gladiators",
        shortname: "QTG",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Quetta_Gladiators.png/150px-Quetta_Gladiators.png"
      }
    ],
    score: [
      {
        r: 148,
        w: 4,
        o: 18,
        inning: "Karachi Kings"
      },
      {
        r: 170,
        w: 8,
        o: 20,
        inning: "Quetta Gladiators"
      }
    ],
    series_id: "psl2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: false
  }
];

// Mock detailed match data
export const mockMatchDetails = {
  "5": {
    id: "5",
    name: "India vs Pakistan",
    matchType: "odi",
    status: "Live - Pakistan needs 54 runs in 7.2 overs",
    venue: "Melbourne Cricket Ground, Melbourne",
    date: "2023-10-15",
    dateTimeGMT: "2023-10-15T03:30:00",
    teams: ["India", "Pakistan"],
    teamInfo: [
      {
        name: "India",
        shortname: "IND",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/150px-Flag_of_India.svg.png"
      },
      {
        name: "Pakistan",
        shortname: "PAK",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/150px-Flag_of_Pakistan.svg.png"
      }
    ],
    score: [
      {
        r: 234,
        w: 9,
        o: 50,
        inning: "India"
      },
      {
        r: 181,
        w: 6,
        o: 42.4,
        inning: "Pakistan"
      }
    ],
    scorecard: [
      {
        inning: "India",
        battingTeam: "India",
        fieldingTeam: "Pakistan",
        batsmen: [
          {
            name: "Rohit Sharma",
            dismissal: "c Shadab Khan b Shaheen Afridi",
            runs: 42,
            balls: 38,
            fours: 6,
            sixes: 1,
            strikeRate: 110.53
          },
          {
            name: "KL Rahul",
            dismissal: "b Mohammad Amir",
            runs: 18,
            balls: 24,
            fours: 2,
            sixes: 0,
            strikeRate: 75.00
          },
          {
            name: "Virat Kohli",
            dismissal: "c Babar Azam b Haris Rauf",
            runs: 65,
            balls: 63,
            fours: 7,
            sixes: 1,
            strikeRate: 103.17
          },
          {
            name: "Shreyas Iyer",
            dismissal: "c Mohammad Rizwan b Shaheen Afridi",
            runs: 28,
            balls: 36,
            fours: 2,
            sixes: 0,
            strikeRate: 77.78
          },
          {
            name: "Rishabh Pant",
            dismissal: "lbw b Shadab Khan",
            runs: 33,
            balls: 42,
            fours: 3,
            sixes: 0,
            strikeRate: 78.57
          },
          {
            name: "Hardik Pandya",
            dismissal: "c Fakhar Zaman b Haris Rauf",
            runs: 22,
            balls: 24,
            fours: 1,
            sixes: 1,
            strikeRate: 91.67
          },
          {
            name: "Ravindra Jadeja",
            dismissal: "not out",
            runs: 14,
            balls: 18,
            fours: 1,
            sixes: 0,
            strikeRate: 77.78
          },
          {
            name: "Bhuvneshwar Kumar",
            dismissal: "run out",
            runs: 6,
            balls: 14,
            fours: 0,
            sixes: 0,
            strikeRate: 42.86
          },
          {
            name: "Mohammad Shami",
            dismissal: "b Mohammad Amir",
            runs: 2,
            balls: 8,
            fours: 0,
            sixes: 0,
            strikeRate: 25.00
          },
          {
            name: "Jasprit Bumrah",
            dismissal: "b Shaheen Afridi",
            runs: 1,
            balls: 3,
            fours: 0,
            sixes: 0,
            strikeRate: 33.33
          }
        ],
        bowlers: [
          {
            name: "Shaheen Afridi",
            overs: 10,
            maidens: 1,
            runs: 43,
            wickets: 3,
            economy: 4.30
          },
          {
            name: "Mohammad Amir",
            overs: 10,
            maidens: 0,
            runs: 39,
            wickets: 2,
            economy: 3.90
          },
          {
            name: "Haris Rauf",
            overs: 10,
            maidens: 0,
            runs: 52,
            wickets: 2,
            economy: 5.20
          },
          {
            name: "Shadab Khan",
            overs: 10,
            maidens: 0,
            runs: 48,
            wickets: 1,
            economy: 4.80
          },
          {
            name: "Imad Wasim",
            overs: 10,
            maidens: 0,
            runs: 50,
            wickets: 0,
            economy: 5.00
          }
        ],
        overs: [
          {
            over: 47,
            balls: [
              {
                ball: 1,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Jadeja takes a single"
              },
              {
                ball: 2,
                score: 0,
                wicket: true,
                extra: false,
                extraType: "",
                comment: "Bumrah is bowled by Shaheen Afridi"
              },
              {
                ball: 3,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Dot ball"
              },
              {
                ball: 4,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Single taken"
              },
              {
                ball: 5,
                score: 4,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Jadeja hits a boundary"
              },
              {
                ball: 6,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "End of the over"
              }
            ]
          },
          {
            over: 48,
            balls: [
              {
                ball: 1,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Dot ball"
              },
              {
                ball: 2,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Single taken"
              },
              {
                ball: 3,
                score: 0,
                wicket: true,
                extra: false,
                extraType: "",
                comment: "Shami is bowled by Mohammad Amir"
              },
              {
                ball: 4,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Dot ball"
              },
              {
                ball: 5,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Single taken"
              },
              {
                ball: 6,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "End of the over"
              }
            ]
          }
        ]
      },
      {
        inning: "Pakistan",
        battingTeam: "Pakistan",
        fieldingTeam: "India",
        batsmen: [
          {
            name: "Babar Azam",
            dismissal: "c Rohit Sharma b Jasprit Bumrah",
            runs: 48,
            balls: 52,
            fours: 5,
            sixes: 0,
            strikeRate: 92.31
          },
          {
            name: "Mohammad Rizwan",
            dismissal: "c Virat Kohli b Bhuvneshwar Kumar",
            runs: 56,
            balls: 73,
            fours: 4,
            sixes: 1,
            strikeRate: 76.71
          },
          {
            name: "Fakhar Zaman",
            dismissal: "lbw b Mohammad Shami",
            runs: 14,
            balls: 21,
            fours: 1,
            sixes: 0,
            strikeRate: 66.67
          },
          {
            name: "Iftikhar Ahmed",
            dismissal: "c Rishabh Pant b Hardik Pandya",
            runs: 2,
            balls: 6,
            fours: 0,
            sixes: 0,
            strikeRate: 33.33
          },
          {
            name: "Shadab Khan",
            dismissal: "not out",
            runs: 32,
            balls: 38,
            fours: 2,
            sixes: 1,
            strikeRate: 84.21
          },
          {
            name: "Asif Ali",
            dismissal: "c Shreyas Iyer b Ravindra Jadeja",
            runs: 21,
            balls: 32,
            fours: 1,
            sixes: 1,
            strikeRate: 65.63
          },
          {
            name: "Mohammad Nawaz",
            dismissal: "not out",
            runs: 8,
            balls: 15,
            fours: 0,
            sixes: 0,
            strikeRate: 53.33
          }
        ],
        bowlers: [
          {
            name: "Jasprit Bumrah",
            overs: 9,
            maidens: 1,
            runs: 33,
            wickets: 1,
            economy: 3.67
          },
          {
            name: "Bhuvneshwar Kumar",
            overs: 9,
            maidens: 0,
            runs: 39,
            wickets: 1,
            economy: 4.33
          },
          {
            name: "Mohammad Shami",
            overs: 8,
            maidens: 0,
            runs: 34,
            wickets: 1,
            economy: 4.25
          },
          {
            name: "Hardik Pandya",
            overs: 7,
            maidens: 0,
            runs: 31,
            wickets: 1,
            economy: 4.43
          },
          {
            name: "Ravindra Jadeja",
            overs: 9.4,
            maidens: 0,
            runs: 44,
            wickets: 2,
            economy: 4.55
          }
        ],
        overs: [
          {
            over: 42,
            balls: [
              {
                ball: 1,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Shadab takes a single"
              },
              {
                ball: 2,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Dot ball"
              },
              {
                ball: 3,
                score: 0,
                wicket: true,
                extra: false,
                extraType: "",
                comment: "Asif Ali caught by Shreyas Iyer off Ravindra Jadeja"
              },
              {
                ball: 4,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Mohammad Nawaz plays a defensive shot"
              },
              {
                ball: 5,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Nawaz takes a single"
              },
              {
                ball: 6,
                score: 4,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Shadab hits a boundary"
              }
            ]
          },
          {
            over: 43,
            balls: [
              {
                ball: 1,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Nawaz takes a single"
              },
              {
                ball: 2,
                score: 2,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Shadab takes two runs"
              },
              {
                ball: 3,
                score: 1,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Single taken"
              },
              {
                ball: 4,
                score: 0,
                wicket: false,
                extra: false,
                extraType: "",
                comment: "Dot ball"
              }
            ]
          }
        ]
      }
    ],
    series_id: "worldcup2023",
    fantasyEnabled: true,
    bbbEnabled: true,
    hasSquad: true,
    matchStarted: true,
    matchEnded: false
  }
};

// Function to fetch current matches
export const fetchCurrentMatches = async (): Promise<Match[]> => {
  // If we had a real API key, we would use this:
  /*
  try {
    const response = await fetch(`${BASE_URL}/matches?apikey=${API_KEY}&offset=0`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    const data: ApiResponse<Match[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    toast.error("Failed to load matches. Please try again later.");
    return [];
  }
  */

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMatches);
    }, 500);
  });
};

// Function to fetch match details
export const fetchMatchDetails = async (matchId: string): Promise<MatchDetails | null> => {
  // If we had a real API key, we would use this:
  /*
  try {
    const response = await fetch(`${BASE_URL}/match_info?apikey=${API_KEY}&id=${matchId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match details');
    }
    const data: ApiResponse<MatchDetails> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching match details:", error);
    toast.error("Failed to load match details. Please try again later.");
    return null;
  }
  */

  // For now, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // @ts-ignore - TypeScript doesn't know that we're returning mocked data
      resolve(mockMatchDetails[matchId] || null);
    }, 500);
  });
};

// Function to extract tournament type from match data
export const getTournamentType = (match: Match): string => {
  if (match.series_id.includes("ipl")) {
    return "IPL";
  } else if (match.series_id.includes("psl")) {
    return "PSL";
  } else if (match.matchType === "test" || match.matchType === "odi" || match.matchType === "t20i") {
    return "International";
  } else {
    return "Other";
  }
};

// Function to get formatted date
export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

// Function to format overs (e.g. 4.3 means 4 overs and 3 balls)
export const formatOvers = (overs: number): string => {
  const fullOvers = Math.floor(overs);
  const balls = (overs - fullOvers) * 10;
  return `${fullOvers}.${balls}`;
};

export const getLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await axios.get<MatchesResponse>(`${BASE_URL}/matches`, {
      params: {
        apikey: API_KEY,
        offset: 0,
        per_page: 50,
      },
    });
    
    return response.data.data.filter(match => 
      match.status !== "completed" && match.status !== "cancelled"
    );
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

export const getMatchDetails = async (matchId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/match_info`, {
      params: {
        apikey: API_KEY,
        id: matchId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};

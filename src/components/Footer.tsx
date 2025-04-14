
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cricket-blue text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CricketLive</h3>
            <p className="text-sm text-gray-300">
              Your destination for live cricket scores, match updates, and comprehensive cricket coverage from around the world.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cricket-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?filter=IPL" className="hover:text-cricket-green transition-colors">
                  IPL
                </Link>
              </li>
              <li>
                <Link to="/?filter=PSL" className="hover:text-cricket-green transition-colors">
                  PSL
                </Link>
              </li>
              <li>
                <Link to="/?filter=International" className="hover:text-cricket-green transition-colors">
                  International
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">API Information</h4>
            <p className="text-sm text-gray-300 mb-2">
              This website uses CricketData.org API for fetching live cricket scores and match data.
            </p>
            <p className="text-sm text-gray-300">
              To get your own API key, visit{" "}
              <a
                href="https://cricketdata.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cricket-green hover:underline"
              >
                CricketData.org
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CricketLive. All rights reserved.</p>
          <p className="mt-1">
            Created for demonstration purposes. Not affiliated with any official cricket organization.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

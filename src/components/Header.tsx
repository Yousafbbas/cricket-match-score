
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-cricket-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              CricketLive
            </Link>
            <div className="hidden md:flex ml-8 space-x-6">
              <Link to="/" className="hover:text-cricket-green transition-colors">
                Home
              </Link>
              <Link to="/?filter=IPL" className="hover:text-cricket-green transition-colors">
                IPL
              </Link>
              <Link to="/?filter=PSL" className="hover:text-cricket-green transition-colors">
                PSL
              </Link>
              <Link to="/?filter=International" className="hover:text-cricket-green transition-colors">
                International
              </Link>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search matches or teams..."
                className="w-full md:w-64 pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-cricket-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </form>
        </div>
      </div>
      
      <div className="md:hidden bg-cricket-blue/90 border-t border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <Link to="/" className="py-1 px-3 rounded hover:bg-cricket-blue/80 transition-colors">
              All
            </Link>
            <Link to="/?filter=IPL" className="py-1 px-3 rounded hover:bg-cricket-blue/80 transition-colors">
              IPL
            </Link>
            <Link to="/?filter=PSL" className="py-1 px-3 rounded hover:bg-cricket-blue/80 transition-colors">
              PSL
            </Link>
            <Link to="/?filter=International" className="py-1 px-3 rounded hover:bg-cricket-blue/80 transition-colors">
              International
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import MatchList from '@/components/MatchList';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [filter, setFilter] = useState<string | undefined>(filterParam || undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update filter when URL search params change
  useEffect(() => {
    setFilter(filterParam || undefined);
  }, [filterParam]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {filter ? `${filter} Matches` : 'Live Cricket Scores'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {filter 
            ? `Latest scores and updates from ${filter} cricket matches`
            : 'Real-time updates from cricket matches around the world'}
        </p>
        
        <MatchList 
          filter={filter} 
          searchQuery={searchQuery}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

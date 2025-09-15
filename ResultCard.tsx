import React from 'react';

interface ResultCardProps {
  icon: string;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

const ResultCard: React.FC<ResultCardProps> = ({ icon, label, value, trend = 'neutral' }) => {
  const trendIcon = () => {
    if (trend === 'up') return <span className="ml-1 text-lg text-green-500" aria-label="Trending up">▲</span>;
    if (trend === 'down') return <span className="ml-1 text-lg text-red-500" aria-label="Trending down">▼</span>;
    return null;
  };

  // Adjust font size for longer values to prevent overflow
  const valueFontSize = value.length > 6 ? 'text-2xl' : 'text-3xl';

  return (
    <div className="bg-white rounded-lg p-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 transform hover:shadow-lg hover:-translate-y-1">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="flex items-baseline justify-center">
        <div className={`${valueFontSize} font-black text-gray-900 tracking-tighter`}>{value}</div>
        {trendIcon()}
      </div>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};

export default ResultCard;

import React, { useState } from 'react';
import type { ForecastInputs, ForecastResults } from './types';
import InputSlider from './components/InputSlider';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ForecastInputs>({
    totalProspects: 10000,
    openRate: 50,
    replyRate: 10,
    meetingConversion: 20,
    avgDealValue: 500,
  });
  
  const [results, setResults] = useState<ForecastResults | null>(null);
  const [previousResults, setPreviousResults] = useState<ForecastResults | null>(null);


  const handleInputChange = (field: keyof ForecastInputs) => (value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? 0 : parseInt(value, 10);
    setInputs(prev => ({ ...prev, [name]: isNaN(parsedValue) ? 0 : parsedValue }));
  };
  
  const handleCalculate = () => {
    setPreviousResults(results);

    const opens = inputs.totalProspects * (inputs.openRate / 100);
    const replies = opens * (inputs.replyRate / 100);
    const meetings = replies * (inputs.meetingConversion / 100);
    const roi = meetings * inputs.avgDealValue;

    setResults({
      estimatedOpens: opens,
      estimatedReplies: replies,
      estimatedMeetings: meetings,
      projectedROI: roi,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const formatNumber = (value: number) => {
    // Show one decimal place for numbers between 0 and 10, otherwise show integer
    if (value > 0 && value < 10 && value % 1 !== 0) {
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
    }
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  };

  const getTrend = (current: number, previous: number | undefined | null): 'up' | 'down' | 'neutral' => {
    if (previous === undefined || previous === null || current === previous) {
      return 'neutral';
    }
    return current > previous ? 'up' : 'down';
  };

  return (
    <div className="min-h-screen w-full font-sans p-4 sm:p-8 flex items-center justify-center">
      <main className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Reply Rate Forecaster</h1>
          <p className="text-lg text-indigo-200 mt-4 max-w-2xl mx-auto">Estimate opens, replies, and meetings in seconds.</p>
        </header>
        
        <div className="bg-white rounded-xl p-6 md:p-10 text-gray-800 border-2 border-dashed border-indigo-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="totalProspects" className="block text-sm font-medium text-gray-700 mb-2">Total Prospects</label>
              <input
                id="totalProspects"
                name="totalProspects"
                type="number"
                value={inputs.totalProspects}
                onChange={handleNumberInputChange}
                className="w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 10000"
              />
            </div>

            <InputSlider label="Open Rate %" value={inputs.openRate} onChange={handleInputChange('openRate')} />
            <InputSlider label="Reply Rate % (of Opens)" value={inputs.replyRate} onChange={handleInputChange('replyRate')} />
            <InputSlider label="Meeting Conversion % (of Replies)" value={inputs.meetingConversion} onChange={handleInputChange('meetingConversion')} />
            
             <div>
              <label htmlFor="avgDealValue" className="block text-sm font-medium text-gray-700 mb-2">Average Deal Value ($)</label>
              <input
                id="avgDealValue"
                name="avgDealValue"
                type="number"
                value={inputs.avgDealValue}
                onChange={handleNumberInputChange}
                className="w-full bg-white text-gray-900 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 500"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-6 text-base rounded-md transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Calculate Forecast
            </button>
          </div>
          
          {results && (
            <div className="mt-8 animate-[fadeIn_0.5s_ease-in-out]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ResultCard 
                      icon="📩" 
                      label="Estimated Opens" 
                      value={formatNumber(results.estimatedOpens)} 
                      trend={getTrend(results.estimatedOpens, previousResults?.estimatedOpens)}
                    />
                    <ResultCard 
                      icon="💬" 
                      label="Estimated Replies" 
                      value={formatNumber(results.estimatedReplies)} 
                      trend={getTrend(results.estimatedReplies, previousResults?.estimatedReplies)}
                    />
                    <ResultCard 
                      icon="📅" 
                      label="Estimated Meetings" 
                      value={formatNumber(results.estimatedMeetings)} 
                      trend={getTrend(results.estimatedMeetings, previousResults?.estimatedMeetings)}
                    />
                    <ResultCard 
                      icon="💵" 
                      label="Projected ROI" 
                      value={formatCurrency(results.projectedROI)}
                      trend={getTrend(results.projectedROI, previousResults?.projectedROI)}
                    />
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;


export interface ForecastInputs {
  totalProspects: number;
  openRate: number;
  replyRate: number;
  meetingConversion: number;
  avgDealValue: number;
}

export interface ForecastResults {
  estimatedOpens: number;
  estimatedReplies: number;
  estimatedMeetings: number;
  projectedROI: number;
}

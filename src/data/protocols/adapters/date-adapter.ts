export interface DateAdapter {
  now: (format?: string) => string
  format: (date: string, format?: string) => string
  diffInDay: (date: string) => number
  diffInMinutes: (endDate: string, startDate?: string) => number
  getTimeRemaining: (futureDate: string) => string
  addMinutes: (minutes:number, date?: string) => string
  calculatePercentage: (initDate: string, previsionDate: string) => number
  duration: (date: string) => string
}

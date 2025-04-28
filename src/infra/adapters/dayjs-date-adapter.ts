import { DateAdapter } from '@/data/protocols'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(duration)

export class DayJsDateAdapter implements DateAdapter {
  now(format?: string) {
    return dayjs().format(format || 'DD-MM-yyyy HH:mm:ss')
  }
  
  format(date?: string, format: string = 'DD/MM/YYYY') {
    return dayjs(date).format(format)
  }

  diffInDay(date: string) {
    return dayjs().diff(date, 'day')
  }

  diffInMinutes(endDate: string, startDate?: string) {
    return dayjs(startDate).diff(endDate, 'minutes')
  }

  getTimeRemaining(futureDate: string){
    const now = dayjs()
    const future = dayjs(futureDate)
    const diff = future.diff(now)

    const remainingDuration = dayjs.duration(diff)
    const minutes = String(remainingDuration.minutes()).padStart(2, '0')
    const seconds = String(remainingDuration.seconds()).padStart(2, '0')

    return `${minutes}:${seconds}`
  }

  duration(date: string) {
    const now = dayjs()
    const targetDate = dayjs(date)

    const difference = targetDate.diff(now)

    if (difference <= 0) {
      return '0h0min'
    }

    const timeLeft = dayjs.duration(difference)
    let formattedTime = ''

    if(timeLeft.hours() > 0) {
      formattedTime += `${timeLeft.hours()}h`
    }

    if(timeLeft.minutes() > 0) {
      formattedTime += `${timeLeft.minutes()}m`
    }

    return formattedTime
  }

  calculatePercentage(initDate: string, previsionDate: string) {
    const now = dayjs()
    const startDate = dayjs(initDate)
    const endDate = dayjs(previsionDate)

    const totalDuration = endDate.diff(startDate) // Duração total entre as datas em milissegundos
    const elapsed = now.diff(startDate) // Tempo decorrido desde a data de entrada

    const progress = Math.min((elapsed / totalDuration) * 100, 100)

    return progress
  }

  addMinutes(minutes:number, datetime: string = dayjs().toDate().toLocaleString()) {
    const start = dayjs(datetime)
    return start.add(minutes, 'minutes').format('YYYY-MM-DD HH:mm:ss')
  }
}

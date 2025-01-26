import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";

type dates = {
    day: string;
    date: number;
    milisecond: number;
}

export type useCalendarStrip = {
    todayDate: any,
    todayWeekNumber: number,
    selectedDate: number,
    setSelectedDate: React.Dispatch<React.SetStateAction<number>>,
    selectedWeek: number,
    setSelectedWeek: React.Dispatch<React.SetStateAction<number>>,
    currentWeekDays: dates[],
    currentMonth: string,
    currentYear: number,
    nextWeekDays: dates[],
    prevWeekDays: dates[]
}


export const useCalendarStrip = () => {
    const todayDate = moment();
    const todayWeekNumber = moment().isoWeek()
    const [selectedDate, setSelectedDate] = useState<number>(parseInt(moment().startOf('day').format('x')));
    const [selectedWeek, setSelectedWeek] = useState<number>(moment().isoWeek());
    const [currentWeekDays, setCurrentWeekDays] = useState<dates[]>(getISOWeekDates(selectedWeek));
    const [nextWeekDays, setNextWeekDays] = useState<dates[]>(getISOWeekDates(selectedWeek + 1));
    const [prevWeekDays, setPrevWeekDays] = useState<dates[]>(getISOWeekDates(selectedWeek - 1));
    const [currentMonth, setCurrentMonth] = useState<string>(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate));
    const [currentYear, setCurrentYear] = useState<number>(parseInt(new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(selectedDate)));


    function getISOWeekDates(isoWeekNum:number) {
        let d = moment().isoWeek(1).startOf('isoWeek').add(isoWeekNum - 1, 'weeks');
        for (var dates: dates[]=[], i=0; i < 7; i++) {
          dates.push({day: d.format('ddd') as string, date: parseInt(d.format('DD')), milisecond: parseInt(d.startOf('day').format('x'))});
          d.add(1, 'day');
        }
        
        return dates
      }
      
      useEffect(() => {
        setCurrentWeekDays(getISOWeekDates(selectedWeek));
        setNextWeekDays(getISOWeekDates(selectedWeek + 1));
        setPrevWeekDays(getISOWeekDates(selectedWeek - 1));
      }, [selectedWeek]);

      useEffect(() => {
        setCurrentMonth(new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate));
        setCurrentYear(parseInt(new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(selectedDate)));
      }, [selectedDate]);
      
      return {
          todayDate,
          todayWeekNumber,
          selectedDate,
          setSelectedDate,
          selectedWeek,
          setSelectedWeek,
          currentWeekDays,
          currentMonth,
          currentYear,
          nextWeekDays,
          prevWeekDays
      }
      
      
}
'use client';

import { useState } from 'react';
import { Locale } from '@/types';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Props {
  tour: any;
  locale: Locale;
  onNext: (data: any) => void;
  onBack: () => void;
  initialDate: string;
}

export function DateSelector({ tour, locale, onNext, onBack, initialDate }: Props) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      setError(locale === 'en' ? 'Please select a date' : 'Veuillez sélectionner une date');
      return;
    }
    onNext({ date: selectedDate });
  };

  // Generate available dates (next 90 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      // Skip Sundays (or any day you want to block)
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Get dates for current month view
  const getMonthDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const dates = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      dates.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  const monthDates = getMonthDates();
  const isAvailable = (date: Date) => {
    return availableDates.some(d => d.toDateString() === date.toDateString());
  };

  const isSelected = (date: Date) => {
    return selectedDate === date.toISOString().split('T')[0];
  };

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  };

  const dayNames = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  };

  const content = {
    en: {
      title: 'Select Your Travel Date',
      subtitle: `Choose your preferred date for the ${tour.title[locale]} tour.`,
      continue: 'Continue to Travellers',
      back: 'Back to Tour',
    },
    fr: {
      title: 'Choisissez Votre Date de Voyage',
      subtitle: `Choisissez votre date préférée pour le circuit ${tour.title[locale]}.`,
      continue: 'Continuer vers Voyageurs',
      back: 'Retour au Circuit',
    },
  };

  const t = content[locale];

  return (
    <div>
      <h2 className="text-xl font-heading text-teal mb-2">{t.title}</h2>
      <p className="text-nearblack/60 text-sm mb-6">{t.subtitle}</p>

      <form onSubmit={handleSubmit}>
        {/* Calendar */}
        <div className="bg-cream rounded-xl p-4 mb-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="font-medium">
              {monthNames[locale][currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames[locale].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-nearblack/50 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {monthDates.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              const available = isAvailable(date);
              const selected = isSelected(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => {
                    if (available) {
                      setSelectedDate(formatDate(date) || '');
                      setError('');
                    }
                  }}
                  disabled={!available}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    selected
                      ? 'bg-teal text-white'
                      : available
                      ? 'hover:bg-teal/10 hover:border-teal/30 cursor-pointer'
                      : 'text-nearblack/20 cursor-not-allowed'
                  } ${isToday && !selected ? 'border border-teal/30' : ''}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white text-xs text-nearblack/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal rounded" />
              <span>{locale === 'en' ? 'Selected' : 'Sélectionné'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cream border border-cream rounded" />
              <span>{locale === 'en' ? 'Available' : 'Disponible'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-nearblack/10 rounded" />
              <span>{locale === 'en' ? 'Unavailable' : 'Indisponible'}</span>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-terracotta text-sm mb-4">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-cream text-nearblack/60 px-6 py-3 rounded-xl font-medium hover:bg-cream transition-colors"
          >
            {t.back}
          </button>
          <button
            type="submit"
            className="flex-1 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            {t.continue}
          </button>
        </div>
      </form>
    </div>
  );
}
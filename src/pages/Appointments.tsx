import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

function Appointments() {
  const user = useStore((state) => state.user);
  const appointments = useStore((state) => state.appointments);
  const addAppointment = useStore((state) => state.addAppointment);
  const therapists = useStore((state) => state.therapists);
  
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  const handleSchedule = () => {
    if (!user || !selectedTherapist || !selectedDate || !selectedTime) return;

    addAppointment({
      id: Math.random().toString(),
      userId: user.id,
      therapistId: selectedTherapist,
      timeSlot: {
        id: Math.random().toString(),
        date: selectedDate,
        startTime: selectedTime,
        endTime: format(
          new Date(`2024-01-01 ${selectedTime}`).getTime() + 60 * 60 * 1000,
          'HH:mm'
        ),
        isBooked: true
      },
      status: 'scheduled'
    });

    setSelectedTherapist('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const userAppointments = appointments.filter(
    (apt) => apt.userId === user?.id
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule New Appointment</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Therapist
            </label>
            <select
              value={selectedTherapist}
              onChange={(e) => setSelectedTherapist(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Choose a therapist</option>
              {therapists.map((therapist) => (
                <option key={therapist.id} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Choose a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSchedule}
              disabled={!selectedTherapist || !selectedDate || !selectedTime}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Appointments</h2>
        
        <div className="space-y-4">
          {userAppointments.map((appointment) => {
            const therapist = therapists.find(t => t.id === appointment.therapistId);
            return (
              <div
                key={appointment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{therapist?.name}</p>
                      <p className="text-sm text-gray-500">{therapist?.specialties[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{format(new Date(appointment.timeSlot.date), 'MMM d, yyyy')}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{`${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}`}</span>
                  </div>

                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${appointment.status === 'scheduled'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {userAppointments.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No appointments scheduled yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
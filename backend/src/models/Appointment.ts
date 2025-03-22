import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  helper: mongoose.Types.ObjectId;
  seeker: mongoose.Types.ObjectId;
  dateTime: Date;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'initial' | 'followup';
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>({
  helper: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seeker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 60,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  type: {
    type: String,
    enum: ['initial', 'followup'],
    required: true,
  },
  notes: String,
  meetingLink: String,
}, {
  timestamps: true,
});

// Index for querying appointments
appointmentSchema.index({ helper: 1, dateTime: 1 });
appointmentSchema.index({ seeker: 1, dateTime: 1 });
appointmentSchema.index({ status: 1, dateTime: 1 });

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema); 
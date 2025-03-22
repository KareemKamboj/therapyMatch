import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import mongoose from 'mongoose';

// Create appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { dateTime, duration, type, notes } = req.body;
    const { helperId } = req.params;

    const appointment = await Appointment.create({
      helper: helperId,
      seeker: req.user._id,
      dateTime,
      duration,
      type,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's appointments (as either helper or seeker)
export const getUserAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { status, startDate, endDate } = req.query;

    const query: any = {
      $or: [{ helper: userId }, { seeker: userId }],
    };

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.dateTime = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const appointments = await Appointment.find(query)
      .populate('helper', 'name email')
      .populate('seeker', 'name email')
      .sort({ dateTime: 1 });

    res.json(appointments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update appointment status
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes, meetingLink } = req.body;
    const userId = req.user._id;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify user is part of the appointment
    if (!appointment.helper.equals(userId) && !appointment.seeker.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    // Only helpers can set meeting links
    if (meetingLink && !appointment.helper.equals(userId)) {
      return res.status(403).json({ message: 'Only helpers can set meeting links' });
    }

    Object.assign(appointment, {
      status,
      notes,
      ...(meetingLink && { meetingLink }),
    });

    await appointment.save();
    res.json(appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Check helper availability
export const checkHelperAvailability = async (req: Request, res: Response) => {
  try {
    const { helperId } = req.params;
    const { date } = req.query;

    const startOfDay = new Date(date as string);
    const endOfDay = new Date(date as string);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      helper: helperId,
      dateTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['confirmed', 'pending'] },
    }).select('dateTime duration');

    res.json(appointments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 
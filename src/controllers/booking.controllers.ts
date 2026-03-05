import { Request, Response } from 'express';
import { BookingService } from "../services/booking.service"

const bookingService = new BookingService();

export const getBookings = (req: Request, res: Response) => {
  const bookings = bookingService.getAllBookings();
  res.json(bookings);
};

export const getBooking = (req: Request, res: Response) => {
  const booking = bookingService.getBookingById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

export const createBooking = (req: Request, res: Response) => {
  const newBooking = bookingService.createBooking(req.body);
  res.status(201).json(newBooking);
};

export const updateBookingStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedBooking = bookingService.updateBookingStatus(id, status);
  
  if (updatedBooking) {
    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

export const getBookingsByEmail = (req: Request, res: Response) => {
  const { email } = req.params;
  const bookings = bookingService.getBookingsByEmail(email);
  res.json(bookings);
};
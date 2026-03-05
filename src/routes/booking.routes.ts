import { Router } from 'express';
import { 
  getBookings, 
  getBooking, 
  createBooking, 
  updateBookingStatus,
  getBookingsByEmail 
} from '../controllers/booking.controllers';

const router = Router();

router.get('/', getBookings);
router.get('/email/:email', getBookingsByEmail);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.patch('/:id/status', updateBookingStatus);

export { router as bookingRouter };
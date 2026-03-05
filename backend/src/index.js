const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Booking API' });
});

app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => console.log(`Booking API running on port ${PORT}`));
const { v4: uuidv4 } = require('uuid');

let bookings = [];

// Seed some example data
const seed = () => {
  const names = ['Ana García', 'Carlos López', 'María Rodríguez', 'Juan Martínez'];
  const services = ['Consulta General', 'Revisión Técnica', 'Asesoría', 'Soporte'];
  const statuses = ['confirmed', 'pending', 'cancelled'];
  
  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) - 7);
    bookings.push({
      id: uuidv4(),
      clientName: names[i % names.length],
      clientEmail: `client${i}@email.com`,
      service: services[i % services.length],
      date: date.toISOString().split('T')[0],
      time: `${9 + (i % 8)}:00`,
      status: statuses[i % statuses.length],
      notes: '',
      createdAt: new Date().toISOString()
    });
  }
};

seed();

const getAll = () => bookings;

const getById = (id) => bookings.find(b => b.id === id);

const getByDateAndTime = (date, time, excludeId = null) =>
  bookings.find(b => b.date === date && b.time === time && b.id !== excludeId);

const add = (booking) => { bookings.push(booking); return booking; };

const update = (id, fields) => {
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = { ...bookings[idx], ...fields };
  return bookings[idx];
};

const remove = (id) => {
  const idx = bookings.findIndex(b => b.id === id);
  if (idx === -1) return false;
  bookings.splice(idx, 1);
  return true;
};

const getStats = () => {
  const total = bookings.length;
  const byStatus = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});
  const byService = bookings.reduce((acc, b) => {
    acc[b.service] = (acc[b.service] || 0) + 1;
    return acc;
  }, {});
  const today = new Date().toISOString().split('T')[0];
  const todayCount = bookings.filter(b => b.date === today).length;

  return { total, byStatus, byService, todayCount };
};

module.exports = { getAll, getById, getByDateAndTime, add, update, remove, getStats };
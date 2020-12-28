// Imports --------------------------------------------------------//
import express from 'express';
import bookingService from '../service/BookingService.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/user/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const booking = await bookingService.getBookingsByUserId(userId).catch(next);
    return res.send(booking);
});

router.get('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const booking = await bookingService.getBookingById(bookingId).catch(next);
    return res.send(booking);
});

router.get('/search/:query', (req, res) => {
    let searchQuery = req.params.query;
    //todo
    return res.send('Endpoint GET /api/booking/search/:query works\n Search query: ' + searchQuery);
});

router.put('', async (req, res, next) => {
    //let bookingId = req.params.bookingId;
    const booking = req.body;
    bookingService.updateBooking(booking).then(() => {
        return res.json(booking).status(200);
    }).catch(next);
});

router.delete('/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;

    bookingService
        .deleteBookingById(bookingId)
        .then(() => {
            res.status(200).end();
        })
        .catch(next);
});

// Exports -------------------------------------------------------//
export default router;

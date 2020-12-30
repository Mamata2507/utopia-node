// Imports --------------------------------------------------------//
import express from 'express';
import travelerService from '../service/TravelerService.js';
import HttpStatus from '../constants/HttpStatus.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/booking/:bookingId', async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const travelers = await travelerService.getAllByBookingId(bookingId).catch(next);
    return res.status(HttpStatus.OK).json(travelers);
});

router.delete('/:travelerId', (req, res, next) => {
    const travelerId = req.params.travelerId;
    travelerService
        .deleteById(travelerId)
        .then(() => {
            res.status(HttpStatus.OK).send('Traveler successfully deleted.');
        })
        .catch(next);
});

router.post('/:bookingId', (req, res, next) => {
    const bookingId = req.params.bookingId;
    travelerService.addBooking(req.body, bookingId)
        .then(() => {
            res.status(HttpStatus.CREATED).send("Traveler successfully added to bookingId: " + bookingId);
        })
        .catch(next);
});

// Exports -------------------------------------------------------//
export default router;

import {rateLimit} from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 7, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: 'Too many OTP verification attempts from this IP, please try again after 15 minutes'
});


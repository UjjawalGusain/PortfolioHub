import {rateLimit} from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 7, // Limit each IP to 7
	message: 'Too many OTP verification attempts from this IP, please try again after 15 minutes'
});


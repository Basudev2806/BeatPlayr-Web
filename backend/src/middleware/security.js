const helmet = require('helmet');
const cors = require('cors');

// CORS configuration
const corsOptions = {
  // Allow multiple origins for development and production
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',        // React default
      'http://localhost:3001',        // Backend (for testing)
      'http://localhost:5173',        // Vite default
      'http://localhost:4200',        // Angular default
      'http://localhost:8080',        // Vue default
      'http://127.0.0.1:3000',       // Alternative localhost
      'http://127.0.0.1:5173',       // Alternative localhost for Vite
      'https://beatplayr.online',     // Production frontend
      'https://www.beatplayr.online', // Production frontend with www
      'https://beatplayr.com',        // Alternative production domain
      'https://www.beatplayr.com',    // Alternative production domain with www
      'https://app.beatplayr.io',     // App subdomain
      process.env.FRONTEND_URL,       // Dynamic frontend URL from env
      process.env.PRODUCTION_URL,     // Production URL from env
    ].filter(Boolean); // Remove undefined values

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      // In development, log but allow; in production, block
      if (process.env.NODE_ENV === 'development') {
        console.warn('Development mode: allowing blocked origin');
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  
  // Allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  
  // Allowed headers
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key',
    'X-Forwarded-For',
    'User-Agent',
    'Cache-Control',
    'Pragma'
  ],
  
  // Expose headers to frontend
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'Retry-After'
  ],
  
  // Allow credentials (cookies, authorization headers)
  credentials: true,
  
  // Preflight cache duration (24 hours)
  maxAge: 86400,
  
  // Handle preflight requests
  preflightContinue: false,
  optionsSuccessStatus: 200
};

// Enhanced CORS middleware with logging
const corsMiddleware = (req, res, next) => {
  // Log CORS requests for debugging
  if (req.method === 'OPTIONS') {
    console.log(`CORS Preflight: ${req.method} ${req.path} from ${req.headers.origin}`);
  } else if (req.headers.origin) {
    console.log(`CORS Request: ${req.method} ${req.path} from ${req.headers.origin}`);
  }
  
  // Apply CORS
  return cors(corsOptions)(req, res, next);
};

// Helmet configuration for security headers
const helmetOptions = {
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:", "http:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // Allow cross-origin requests
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
};

module.exports = {
  helmet: helmet(helmetOptions),
  cors: corsMiddleware,
  corsOptions
};
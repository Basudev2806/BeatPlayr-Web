require('dotenv').config();

const config = {
  // Server configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3001,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Email configuration
  email: {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    adminEmail: 'basudev@beatplayr.online',
    fromName: 'BeatPlayr'
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  },
  
  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  
  // Validation rules
  validation: {
    maxNameLength: 100,
    maxEmailLength: 254,
    maxMessageLength: 5000,
    maxTitleLength: 200,
    maxPhoneLength: 20
  },
  
  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.API_KEY
  }
};

// Validate required environment variables
const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

module.exports = config;
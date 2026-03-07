// Vercel serverless function entry point
// This wraps the Express app for Vercel's serverless environment
import app from "../src/index.js";

// Export the Express app as a serverless function
export default app;

* File Structure

- index.js: App entry point 
- middleware/: Middleware functions for processing requests before reaching route handlers (/routes). (Validation, Error Handling, Authentication)
- 1. routes/: Route files for different API endpoints.
- 2. controllers/: Controller files containing business logic, which call the specific services/fx required.
- 3. services/: Handle HTTP requests and responses.
- 4. models/: Define MongoDB data models in the app.




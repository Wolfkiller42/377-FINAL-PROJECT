# Phone Verify App Project

## Project Overview

**Title**: Phone Verify App Project  
**Description**:  
This web application allows users to input a phone number and verify its validity, carrier, line type, and country information using the NumVerify API. The application sends requests from a React-based frontend to a Node.js/Express backend, which then stores the validated results in a Supabase database. Results are displayed to the user both textually and visually using Chart.js. The system includes multiple views, including a homepage, about page, and the phone verification page which represents the core functionality.

**One thing to keep in mind when testing the app on Vercel is that, although the app runs locally with no problems when the backend server is active. Vercel has no way of me running the backend server, which causes it to return an error. If you run the full program locally, everything should work fine.**

**Target Browsers**:  
- Google Chrome 
- Safari on macOS and iOS  
- Microsoft Edge  

**Link to Developer Manual**:  
See the second half of this README below.

---
# Developer Manual

This developer manual is intended for future developers who will maintain or continue working on the Phone Verify App. The audience is assumed to have general web development experience but no prior knowledge of this project.

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/phone-verify-app-project.git
cd phone-verify-app-project
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

---

## Running the Application

### 1. Set Environment Variables

In the `server/` folder, create a `.env` file and include:

```
PORT=5050
NUMVERIFY_API_KEY=your_numverify_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Start the Backend

```bash
cd server
npm start
```

This will start the Express server on port 5050.

### 3. Start the Frontend

```bash
cd client
npm start
```

This will start the React application on http://localhost:3000

---

## Testing

There are no unit tests written for this project. All verification can currently be tested manually via the user interface or using tools like `curl` to POST to the API.

---

## API Reference

### POST `/api/verify`

**Description**: Submits a phone number for verification using the NumVerify API. Saves the result to Supabase.

**Request Body**:
```json
{
  "number": "+14155552671"
}
```

**Response**:
Returns phone metadata (validity, country, carrier, line type).

---

### GET `/api/verify/history`

**Description**: Fetches recent verification history from the Supabase database.

**Response**:
Returns an array of previously verified numbers with metadata.

---

## Known Issues

- Carrier name and line type are sometimes missing or inaccurate, depending on NumVerify's dataset.
- The free version of NumVerify has a daily request limit, which can restrict testing.
- No loading spinner or error display currently appears if the API call fails.

---

## Future Roadmap

- Add error and loading state UI for a better user experience.
- Add a results table to show historical lookups within the UI.
- Implement pagination and sorting for history data.
- Add user accounts to allow tracking individual usage (requires Supabase Auth).
- Write frontend and backend unit tests for critical logic.

---

## Documentation

- This `README.md` contains both the user-facing project overview and developer setup documentation.
- Place this file in your root project directory and inside a `/docs/` folder copy as required by the project submission.

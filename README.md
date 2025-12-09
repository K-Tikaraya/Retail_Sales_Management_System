# Retail Sales Management System

## Overview

This is a full-stack retail management application that helps businesses track and manage sales transactions. The system allows users to search, filter, sort, and paginate through sales data efficiently. It provides a user-friendly interface for viewing customer information, product details, and transaction history in real-time.

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- ESLint

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Tools:**
- npm (package manager)
- PostCSS
- Autoprefixer

## Search Implementation Summary

The search feature allows users to find sales records by customer name and phone number. Search queries are case-insensitive and use MongoDB text indexes for fast performance. When a user enters a search term, the backend queries the database and returns matching records. The search works in real-time as users type, providing instant results without page reload.

## Filter Implementation Summary

Filters enable users to narrow down sales data by multiple criteria including customer region, gender, product category, payment method, and tags. Each filter can be combined with others for more specific results. Filters also support numeric ranges for age and date fields. The filtered results update dynamically on the frontend without requiring a page refresh.

## Sorting Implementation Summary

The sorting feature allows users to arrange sales records by various fields such as customer name, total amount, quantity, date, and age. Users can sort in ascending or descending order with a single click. Multiple sort options are available through a dropdown menu. The sorting operation happens on the backend for better performance with large datasets.

## Pagination Implementation Summary

Pagination divides sales data into manageable pages to improve performance and user experience. Each page displays a fixed number of records (typically 10-20 items per page). Users can navigate through pages using next, previous, and page number buttons. The current page number and total page count are displayed to help users understand their position in the dataset.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with:
   ```
   MONGO_URI= your mongodb atlas string
   PORT=your port
   ```

4. Start the server:
   ```
   npm run dev
   ```



### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client/retail_management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

  

### Running Both

Open two terminal windows:
- Terminal 1: Run backend server from `server` directory
- Terminal 2: Run frontend from `client/retail_management` directory



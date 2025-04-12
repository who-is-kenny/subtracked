# Subtracked

Subtracked is a subscription management application that helps users track their subscriptions, manage billing dates, and stay organized. The app allows users to add, edit, and reorder subscriptions, and provides visual indicators for upcoming billing dates.

## Features

- **Add Subscriptions**: Easily add new subscriptions with details such as name, price, billing cycle, start date, end date, status, category, and notes.
- **Edit Subscriptions**: Modify subscription details with an intuitive edit form.
- **Reorder Subscriptions**: Drag and drop subscriptions to reorder them.
- **Billing Notifications**: Get notified when a subscription's billing date is approaching.
- **Visual Indicators**: Colored dots indicate the time remaining until the subscription's end date:
  - Green: More than a month remaining.
  - Yellow: Less than a month remaining.
  - Red: Less than a week remaining.
- **Responsive Design**: The app is designed to fit within a fixed width of 400px, making it ideal for browser extensions or small screens.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/subtracked.git
2. Navigate to the project directory:
   ```bash
   cd subtracked
3. Install the required dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm start

## How to connect it to chrom extensions

1. download project files / clone project
2. open chrome extensions
3. enable developer mode
4. load unpacked and open the 'dist' folder

## Technologies Used
- **React:** For building the user interface.
- **React Router:** For navigation between pages.
- **TypeScript:** For type safety and better developer experience.
- **CSS:** For styling the application.
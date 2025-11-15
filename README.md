# My Event

My Event is a web application for discovering and managing events. Users can browse upcoming events, view event details, and create their own events. It also features user authentication and the ability to favorite events.

## Features

- **User Authentication:** Sign in with your Google account.
- **Create Events:** Authenticated users can create new events with details like title, description, date, category, and a cover image.
- **Browse Events:** View a list of upcoming events.
- **Event Details:** See more information about a specific event.
- **Edit and Delete Events:** Users can edit or delete the events they have created.
- **Favorite Events:** Users can mark events as favorites and view them in a separate list.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
- **State Management:**
  - [Tanstack Query](https://tanstack.com/query/v4)
- **Forms:**
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/)
- **Routing:**
  - [React Router](https://reactrouter.com/)
- **Backend Services:**
  - [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
  - [Cloudinary](https://cloudinary.com/) (Image Hosting)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/my-event.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up environment variables
    - Create a `.env` file in the root of the project.
    - Copy the contents of `env.example` into the `.env` file.
    - Fill in the values for the environment variables. You will need to create a Firebase project and a Cloudinary account to get the necessary keys.

### Usage

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Live Site

Open [https://ost-my-events.web.app/](https://ost-my-events.web.app/) to view it in the browser.

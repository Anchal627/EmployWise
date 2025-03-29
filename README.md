# User List Management

This project is a React-based user management system that allows you to fetch, display, edit, delete, and search users. It also includes authentication with login/logout functionality.

 #Frontend Link : https://employ-wise-p9zj.vercel.app/
 
## Features

- Fetch users from an API and display them in a list
- Search users by name
- Edit user details through a modal
- Delete users with confirmation
- Pagination support
- Logout functionality
- Toast notifications for user interactions

## Technologies Used

- React.js
- Tailwind CSS (for styling)
- React Router (for navigation)
- React Toastify (for notifications)
- Lucide Icons (for UI enhancements)
- Axios (for API requests)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/users.git
   cd users
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

## API Integration

This project fetches user data from an external API. Ensure your backend API endpoints match the functions in `api.js`:

- `fetchAllUser(page)` - Fetches paginated user data.
- `deleteUser(id)` - Deletes a user by ID.
- `updateUser(id, data)` - Updates user details.
- `login(email, password)` - Authenticates users.

## Usage

### Login

Users must log in before accessing the user list. Upon successful login, a JWT token is stored in local storage and used for authentication.

### User List

- Users are displayed in a grid format with profile images.
- A search bar allows filtering by name.
- Pagination controls help navigate between pages.

### Editing Users

- Clicking "Edit" opens a modal where user details can be updated.
- Changes are submitted via the `updateUser` API function.

### Deleting Users

- Clicking "Delete" prompts a confirmation before removing a user.
- Users are deleted using the `deleteUser` API function.

### Logout

- Clicking "Logout" removes the authentication token and redirects to the login page.

## Toast Notifications

- **Success:** Displays after a successful login, user update, or deletion.
- **Error:** Displays if login fails or user actions encounter issues.

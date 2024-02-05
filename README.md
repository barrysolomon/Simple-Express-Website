# Express Authentication App

This Express app demonstrates basic authentication flow including user registration, login, and access control, utilizing MongoDB as the database for storing user credentials.

## Features

- User Registration
- User Login
- Session Management
- Protected Home Page accessible only after successful login
- MongoDB for user data storage
- EJS for templating

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running on your machine

## Installing Express Authentication App

To install the app, follow these steps:

1. Clone the repo:
   ```bash
   git clone https://github.com/barrysolomon/Simple-Express-Website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd express-login-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuring the App

1. Ensure MongoDB is running on your local machine, or configure the connection string in `app.js` to point to your MongoDB instance.

    Note: k8/mongodb.yaml can be used to create the mongdo in a k8 cluster.  

    ```bash
    kubectl -f k8/mongodb.yaml
    kubectl port-forward svc/mongodb 27017:27017
    ```

2. (Optional) Adjust session secret and other settings in `app.js`.

## Running the App

To run the app, execute:

```bash
node app.js
```

The server should start, and you can navigate to `http://localhost:3000` to access the app.

## Using the App

1. **Register**: Navigate to `http://localhost:3000/register` to create a new user account.
2. **Login**: Go to `http://localhost:3000/login` and enter your credentials to log in.
3. **Home Page**: Upon successful login, you will be redirected to the home page at `http://localhost:3000/home`.
4. **Logout**: Click the logout button to end your session and return to the login page.

## Contributing to the App

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - Barry Solomon - barrysolomon@hotmail.com

Project Link: [https://github.com/barrysolomon/Simple-Express-Website.git](https://github.com/barrysolomon/Simple-Express-Website.git)

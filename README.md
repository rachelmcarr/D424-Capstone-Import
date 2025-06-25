Rachel Carr
Student ID: 011037652
D424 Task 4
June 25, 2025

# Rare Oddities Tattoos and Piercings Web Application

---

# Overview

This document outlines the process used to deploy the Rare Oddities full-stack web application. It satisfies Task 4 Section B requirements.

- **Frontend**: Angular application deployed using Firebase Hosting
- **Backend**: Spring Boot API deployed using Railway
- **Database**: MySQL database hosted on Railway

---

# Frontend Deployment – Firebase Hosting

# Prerequisites

- Node.js and Angular CLI installed
- Firebase CLI installed:
  ```bash
  npm install -g firebase-tools
  ```

# Steps

```bash
# Navigate to the frontend directory
cd frontend

# Build the Angular project for production
ng build --configuration production

# Log into Firebase (if not already logged in)
firebase login

# Initialize Firebase project (first time only)
firebase init

# Deploy to Firebase Hosting
firebase deploy
```

# Result

Firebase will return a hosting URL, such as:
```
https://rare-oddities.web.app
```

---

# Backend Deployment – Railway (Spring Boot)

# Prerequisites

- Java JDK 17+ and Maven installed
- Railway account created at https://railway.app
- Backend code committed to the repository

# Steps

1. Log in to Railway and create a new project.
2. Link the project to the GitLab backend repository.
3. Configure the following environment variables in Railway:

```
SPRING_DATASOURCE_URL=jdbc:mysql://switchback.proxy.rlwy.net:21118/railway?useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

4. Railway automatically detects the Maven project and builds using:
```bash
./mvnw clean package -DskipTests
```

# Result

Railway will assign a backend URL such as:
```
https://rare-oddities-backend-production.up.railway.app
```

---

# Connecting Frontend to Backend

# Update Angular API URLs

Ensure all service files in Angular (e.g., customer.service.ts) use the deployed backend URL:

```ts
this.http.get('https://rare-oddities-backend-production.up.railway.app/api/customers');
```

# Configure CORS in Spring Boot

In the `SecurityConfig.java` file, allow Firebase's frontend domain:

```java
.allowedOrigins("https://rare-oddities.web.app")
```

---

# Verifying Deployment

1. Visit the Firebase frontend URL in a browser.
2. Perform actions such as submitting an intake form.
3. Confirm data is saved to the Railway-hosted MySQL database.
4. Use Railway's logs to confirm backend activity.

---

# Redeployment

# Frontend (after code changes)

```bash
cd frontend
ng build --configuration production
firebase deploy
```

# Backend (after code changes)

- Push code to the GitLab repository.
- Railway will automatically rebuild and redeploy.

---
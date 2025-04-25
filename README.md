# 📱 SalasFullStackToDo Frontend

This is the **frontend** of the **SalasFullStackToDo** app, built using **React Native** with **Expo**. The app connects to a FastAPI backend to manage tasks with full CRUD functionality.

👉 **Backend GitHub Repo:** [https://github.com/Sosiggg/salasfullstacktodo/](https://github.com/Sosiggg/salasfullstacktodo/)

## 🚀 Features

- React Native app with Expo  
- Task management (add, update, delete, view)  
- API integration with FastAPI backend  
- EAS Build for APK generation  
- Supports light/dark themes  
- Responsive and user-friendly design

## 🛠 Tech Stack

- **React Native**  
- **Expo**  
- **Axios** (for API requests)  
- **EAS Build** (for generating APK)  
- **FastAPI** backend (deployed on Render)

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/salasfullstacktodo-frontend.git
cd salasfullstacktodo-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npx expo start
```

> Make sure your backend is running and the API base URL is set correctly in your code.

## 📱 Building APK

To build an APK for Android using EAS:

1. **Login to Expo:**

```bash
npx expo login
```

2. **Configure EAS:**

```bash
npx eas build:configure
```

3. **Build the APK:**

```bash
npx eas build --platform android
```

The APK will be generated in the cloud and a download link will be provided by Expo.

## 🔗 API Integration

The app communicates with the following backend endpoints:

- \`GET /tasks/list/\`  
- \`POST /tasks/create/\`  
- \`GET /tasks/detail/{task_id}/\`  
- \`PUT /tasks/update/{task_id}/\`  
- \`DELETE /tasks/delete/{task_id}/\`

👉 **Backend API:** [https://salasfullstacktodo.onrender.com/docs/](https://salasfullstacktodo.onrender.com/docs/)

## 📝 Notes

- The app is designed to be paired with the **FastAPI backend**.
- Make sure to replace API URLs with your own deployment if needed.

# 🫁 Lung Cancer Detection System

A full-stack AI-powered web application that assists doctors in the **early detection of lung cancer** using CT scans and deep learning.

> 🎓 Built as a graduation project by [Seval Hatice Kayıkcı](https://github.com/sevalkayikci)  
> 🧠 AI meets medicine — all in the browser.

---

## 🌟 Features

- 📤 **CT Scan Upload** — Upload and analyze lung scans instantly  
- 🤖 **YOLOv11Xl Detection** — Custom-trained YOLO model for nodule detection  
- 📈 **AI Confidence Scores** — See confidence values for cancer probability  
- 👨‍⚕️ **Doctor & Patient Dashboard** — Manage users and patient records  
- 🩺 **Diagnosis Archive** — View previous scan results with annotated output  
- 🔐 **JWT Auth** — Role-based secure login (admin, doctor)  

---

## 🧰 Tech Stack

| Frontend         | Backend            | AI / Detection           | Database       |
|------------------|--------------------|---------------------------|----------------|
| React + Vite ⚛️  | Node.js + Express 🚀 | Python + Flask + YOLO 🐍📸 | PostgreSQL 🐘  |

---

## 🗂️ Project Structure

```
Lung-Cancer-Detection-System/
├── flask-api/         # Flask + YOLOv11Xl inference API
├── node-backend/      # Express.js backend for auth & DB
├── react-frontend/    # React-based UI with full flow
└── LungScans/         # Uploaded scans and predictions
```

---

## 🚀 Installation & Running

### 1️⃣ Clone the repo
```bash
git clone https://github.com/sevalkayikci/Lung-Cancer-Detection-System.git
cd Lung-Cancer-Detection-System
```

### 2️⃣ Run Flask API (YOLO)
```bash
cd flask-api
pip install -r requirements.txt
python app.py
```

### 3️⃣ Run Node.js Backend
```bash
cd ../node-backend
npm install
node server.js
```

### 4️⃣ Run React Frontend
```bash
cd ../react-frontend
npm install
npm run dev
```

---

## 🧪 Sample Workflow

1. Doctor logs in securely (JWT-based)  
2. Uploads CT scan image  
3. Flask API runs YOLOv11Xl and returns predictions  
4. Backend stores scan + results  
5. Doctor sees diagnosis with confidence + image overlay  

---

## 📦 Environment Variables

### Backend (`node-backend/.env`)
```
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

---

## 📄 Graduation Report

A detailed technical report is available that explains the methodology, dataset selection, YOLOv11Xl training process, Flask integration, database schema, and more.

📘 [View Final Report (PDF)](./Report.pdf)

---

## 📜 License

MIT © [Seval Hatice Kayıkcı](https://github.com/sevalkayikci)  
For educational & research use only. Not for clinical deployment.

---

## 🙋‍♀️ About the Author

👩‍💻 **Seval Hatice Kayıkcı**  
Software Engineering Graduate | Passionate about AI & Computer Vision  
📫 [GitHub](https://github.com/sevalkayikci) • ✉️ sevalkayikci@gmail.com

---

## 💖 Acknowledgements

- [YOLOv11](https://github.com/ultralytics/ultralytics) for object detection  
- [React](https://react.dev/), [Node.js](https://nodejs.org/), and [PostgreSQL](https://www.postgresql.org/)  
- Inspiration: All doctors working tirelessly to detect diseases early

# 🚀 Full Stack AWS DevOps Project

## 👤 Author: Noor Mohammad

---

# 📌 Project Overview

This project demonstrates deployment of a **full-stack application** using:

* **Backend** → Flask (Python)
* **Frontend** → Node.js (Express)
* **Infrastructure** → AWS EC2
* **Containerization** → Docker
* **Registry** → AWS ECR

The application displays a list of users fetched from the backend API.

---

# 🌐 Live Application

* 🔗 **Frontend URL:** http://18.61.166.60:3000
* 🔗 **Backend API:** http://18.61.166.60:5000/api/users

---

# 📂 GitHub Repository

👉 https://github.com/noormohammad161996-cloud/fullstack-aws-app

---

# 🏗️ Architecture

```
User → Browser → Frontend (Node.js :3000)
                        ↓
                  Backend API (Flask :5000)
                        ↓
                  Static Data (Users)
```

---

# ⚙️ Task 1: EC2 Setup & Deployment

## 🔹 Step 1: Launch EC2 Instance

* OS: Ubuntu
* Instance Type: t3.micro
* Open ports:

  * 3000 (Frontend)
  * 5000 (Backend)
  * 22 (SSH)

---

## 🔹 Step 2: Connect to EC2

```bash
ssh -i key.pem ubuntu@<EC2-IP>
```

👉 **Meaning:**

* `ssh` → Secure remote login
* `-i key.pem` → Private key authentication
* `ubuntu@IP` → login user

---

## 🔹 Step 3: Install Dependencies

```bash
sudo apt update
sudo apt install python3-pip nodejs npm git -y
```

👉 **Meaning:**

* `apt update` → refresh package list
* `pip` → Python package manager
* `npm` → Node package manager

---

## 🔹 Step 4: Clone Repository

```bash
git clone https://github.com/noormohammad161996-cloud/fullstack-aws-app.git
cd fullstack-aws-app
```

---

# 🧠 Backend Setup (Flask)

## 🔹 Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

👉 **Meaning:**

* `venv` → isolated Python environment
* avoids system conflicts

---

## 🔹 Install Dependencies

```bash
pip install -r requirements.txt
```

👉 installs:

* Flask
* Flask-CORS

---

## 🔹 Run Backend

```bash
nohup python3 app.py &
```

👉 **Meaning:**

* `nohup` → run process in background (even after logout)
* `&` → run in background
* Output goes to `nohup.out`

---

## 🔹 Verify API

```bash
http://<EC2-IP>:5000/api/users
```

---

# 🎨 Frontend Setup (Node.js)

## 🔹 Install Dependencies

```bash
cd frontend
npm install
```

---

## 🔹 Run Frontend

```bash
nohup node server.js &
```

👉 runs server on port 3000

---

## 🔹 Verify UI

```bash
http://<EC2-IP>:3000
```

---

# 🔗 Task 2: API Integration

## 🔹 What was done:

* Frontend calls backend API:

  ```js
  http://<EC2-IP>:5000/api/users
  ```
* Enabled CORS in Flask:

  ```python
  from flask_cors import CORS
  CORS(app)
  ```

👉 **Meaning:**

* CORS allows frontend (port 3000) to access backend (port 5000)

---

# 🐳 Task 3: Docker & ECR

---

## 🔹 Install Docker

```bash
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu
newgrp docker
```

👉 gives Docker permission without sudo

---

# 🐳 Backend Dockerfile

```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

👉 Explanation:

* `FROM` → base image
* `WORKDIR` → working directory
* `COPY` → copy code
* `RUN` → install dependencies
* `CMD` → run app

---

## 🔹 Build Backend Image

```bash
docker build -t backend-app ./backend
```

---

# 🐳 Frontend Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

---

## 🔹 Build Frontend Image

```bash
docker build -t frontend-app ./frontend
```

---

# ☁️ AWS ECR Setup

---

## 🔹 Configure AWS CLI

```bash
aws configure
```

Enter:

* Access Key
* Secret Key
* Region: ap-south-2

---

## 🔹 Create ECR Repositories

```bash
aws ecr create-repository --repository-name backend-repo
aws ecr create-repository --repository-name frontend-repo
```

---

## 🔹 Login to ECR

```bash
aws ecr get-login-password --region ap-south-2 | docker login --username AWS --password-stdin 939103584852.dkr.ecr.ap-south-2.amazonaws.com
```

👉 Uses IAM credentials (not manual password)

---

## 🔹 Tag Images

```bash
docker tag backend-app:latest 939103584852.dkr.ecr.ap-south-2.amazonaws.com/backend-repo:latest
docker tag frontend-app:latest 939103584852.dkr.ecr.ap-south-2.amazonaws.com/frontend-repo:latest
```

---

## 🔹 Push Images

```bash
docker push 939103584852.dkr.ecr.ap-south-2.amazonaws.com/backend-repo:latest
docker push 939103584852.dkr.ecr.ap-south-2.amazonaws.com/frontend-repo:latest
```

---

# 🎯 Key Concepts Explained

### 🔹 nohup

Runs process even after SSH disconnect

### 🔹 Docker

Packages app + dependencies into container

### 🔹 ECR

Private Docker registry in AWS

### 🔹 EC2

Virtual server in AWS

---

# 📦 Final Outcome

✅ Full-stack app deployed on EC2
✅ Frontend + Backend connected
✅ Docker images created
✅ Images pushed to AWS ECR

---

# 🚀 Future Improvements

* Deploy using ECS / Kubernetes
* Add CI/CD pipeline (GitHub Actions)
* Use Load Balancer

---

# 🙌 Conclusion

This project demonstrates real-world DevOps workflow including:

* Infrastructure setup
* Application deployment
* Containerization
* Cloud registry usage

---

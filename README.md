AI-Powered Flood Prediction & Relief Coordination System 🌊🤖

An end-to-end AI and software solution for predicting floods and coordinating relief efforts, built with deep learning, Flask, and interactive dashboards.

🚀 Project Overview

Floods are not just a natural disaster—they are a challenge in data analysis, coordination, and timely response. This project demonstrates how AI, software engineering, and data science can be applied to directly support disaster management and relief efforts.

Key highlights:

Predicts flood severity (Low / Moderate / Severe) using a CNN with attention mechanisms

Recommends relief resources: food, shelter, medical aid, boats

Role-based dashboards for Citizens, Admins, and Relief Teams

Full backend with Flask APIs, persistent storage (SQLite), and real-time data access

Interactive frontend dashboards with dynamic visualizations

📊 Features
Feature	Description
Flood Severity Prediction	Deep Learning CNN model with attention gates classifies flood severity from input data/images
Relief Recommendation	Automatic suggestion of resources based on predicted flood severity
Role-Based Dashboards	Separate views and actions for Citizens, Admins, and Relief Teams
API Integration	RESTful Flask APIs for real-time interaction and data access
Deployment	Backend hosted on Google Colab with ngrok tunneling for testing 

🖥️ How to Use This Project

Follow the steps below to run the complete Flood Prediction & Relief Coordination System locally.

✅ Step 1 — Clone the Repository

Clone this repository to your local system:

git clone https://github.com/YOUR_USERNAME/flood_prediction_project.git
cd flood_prediction_project

✅ Step 2 — Download Model Files

The trained models are large and hosted on Google Drive.

Download the following files from the provided Drive link:

flood_model.pkl

flood.h5

Place both files inside your Google Drive project folder (or the same directory used in the Colab notebook).

These models are required for flood severity prediction and system execution.

✅ Step 3 — Configure ngrok Authentication

Open the backend Google Colab notebook(named 'BACKEND' in project folder )

Replace the existing ngrok token with your own:

!ngrok authtoken YOUR_NGROK_AUTH_TOKEN


Run all notebook cells in sequence.

The system will start a Flask server and generate a public ngrok URL.

✅ Step 4 — Update Frontend API URLs

After running the backend:

Copy the generated ngrok HTTPS URL.

Open the frontend files and replace the API base URL with the new ngrok link in:

script.js (all 4 script files)

predict.js

Example:

const BASE_URL = "https://xxxx-xx-xx-xx.ngrok-free.app";

✅ Step 5 — Run the Application

Once the URLs are updated:

Open the frontend pages in your browser.

The system will now communicate with the live backend via ngrok.

You can submit flood data, run predictions, and access role-based dashboards.

🔗 Useful Links

Google Drive (Model Files):
👉 https://drive.google.com/drive/folders/1PCFo0R9euwB0H3zq2M9ryQMybZXLaVLn?usp=drive_link

📬 Contact & Project Inquiry

If you would like to learn more about this project, discuss collaboration opportunities, or explore implementation ideas, feel free to connect with me:

LinkedIn: 👉 www.linkedin.com/in/wahaj-asad-9a1092206

Email: 👉 muhammadwahaj34@gmail.com

I’m always open to discussions related to:


Machine Learning Deployment

Data Science & AI Projects

Research and Collaboration Opportunities


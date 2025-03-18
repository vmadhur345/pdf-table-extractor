PDF Table Extractor

📌 Project Overview

PDF Table Extractor is a web application that allows users to upload a PDF file and extract tables from it. The extracted tables can be downloaded as structured data files.

🚀 Features

Upload a PDF file

Extract tables using backend processing

Download extracted tables

User-friendly interface with a modern UI

🛠 Tech Stack

Frontend:

React.js (Vite for fast development)

ShadCN/UI (for modern UI components)

Tailwind CSS (for styling)

Axios (for API calls)

Lucide-React (for icons)

Backend:

Node.js & Express.js (for API server)

Multer (for file handling)

PDF Parsing Library (like pdf-table-extract or pdf-lib)

📂 Project Structure

pdf-extractor/
├── backend/            # Node.js Express backend
│   ├── server.js       # Main backend logic
│   ├── routes/         # API routes
│   ├── uploads/        # Stores uploaded PDFs temporarily
│   └── extracted/      # Stores extracted table data
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── App.jsx     # Main UI logic
│   │   ├── index.css   # Styles
│   │   ├── api.js      # API calls
│   ├── public/         # Static assets
│   ├── vite.config.js  # Vite config
└── README.md           # Project Documentation

🎨 UI Preview



🏗 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yourusername/pdf-table-extractor.git
cd pdf-table-extractor

2️⃣ Install Dependencies

Frontend:

cd pdf-extractor-frontend
npm install

Backend:

cd ../pdf-extractor-backend
npm install

3️⃣ Start the Project

Start Backend Server:

cd pdf-extractor-backend
node server.js

Start Frontend:

cd pdf-extractor-frontend
npm run dev

⚡ Usage

Upload a PDF file

Click Extract Tables

Download the extracted tables

📌 Future Improvements

Support for multiple file formats

Table preview before download

Cloud storage integration

🤝 Contributing

Pull requests are welcome! Feel free to open an issue if you find any bugs or want to suggest a new feature.

📜 License

This project is licensed under the MIT License. Feel free to use and modify it!


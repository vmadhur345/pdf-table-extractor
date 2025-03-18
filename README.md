# PDF Table Extractor

## Overview
This project is a **PDF Table Extractor** that allows users to upload a PDF file, extract tables, and download them as an Excel file. It is built using the **MERN stack** with a clean and modern UI.

## Features
- Upload PDF files containing tables.
- Extract tables from the PDF without using Tabula or Camelot.
- Download extracted tables in **Excel format (.xlsx)**.
- User-friendly interface with a **responsive design**.

## Technologies Used
### Frontend:
- **React** (with Vite for fast development)
- **Tailwind CSS** for styling
- **ShadCN UI components** for enhanced UI
- **Axios** for API requests

### Backend:
- **Node.js & Express.js** for API handling
- **pdfplumber & Pandas (Python)** for table extraction
- **Multer** for handling file uploads
- **Cors** for cross-origin requests

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **Python** (v3.8 or later) with pip installed

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/pdf-table-extractor.git
cd pdf-table-extractor

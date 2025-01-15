# Hotel Search Application

This is a full-stack Hotel Search application that allows users to search for hotels based on various criteria. It includes a Python-based backend using Flask and a React-based frontend.

---

## Features

- Hotel search functionality with filters.
- User-friendly interface with a modern design.
- Backend powered by Flask with NLP processing using SpaCy.
- Frontend powered by React for a responsive experience.

---

## Prerequisites

Ensure you have the following installed:

- Python (version 3.x)
- Node.js (version 14+)
- npm (Node Package Manager)

---

## Installation

Follow the steps below to set up and run the project:

```bash
# Clone the repository
https://github.com/TusharSachdeva29/Hotel-Search-new.git
cd hotel-search

# Set up the Python backend
py -3 -m venv .venv
cd .venv
source Scripts/activate
pip install -r requirements.txt
python -m spacy download en_core_web_trf
flask run

# Navigate back to the main project directory
cd ..

# Set up the frontend
cd frontend
npm i
npm run dev

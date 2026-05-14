# Rainfall Prediction

A FastAPI web application for predicting rainfall based on atmospheric inputs.
The project includes a modern responsive frontend built with HTML, CSS, JavaScript, and Jinja2 templates.

## Project Structure

- `Model Notebook/` - Jupyter notebook for data exploration, preprocessing, training, and model export.
- `Server/` - FastAPI backend and frontend files.
  - `main.py` - FastAPI application.
  - `requirements.txt` - Python dependencies.
  - `Rainfall_Prediction_model.pkl` - serialized trained model.
  - `static/` - CSS and JavaScript assets.
  - `templates/` - Jinja2 HTML template.

## Features

- Clean modern UI with responsive card layout.
- Smooth animations and glassmorphism design.
- Input validation with unit labels and placeholders.
- AJAX-style prediction request to preserve scroll position.
- Rain / sun themed result cards with animated styling.
- Backend powered by FastAPI and a saved scikit-learn model.

## Requirements

- Python 3.11+
- Virtual environment recommended
- Dependencies listed in `Server/requirements.txt`

## Setup

1. Open a terminal in the project root.
2. Create and activate a virtual environment:

```powershell
python -m venv venv
& "venv\Scripts\Activate.ps1"
```

3. Install dependencies:

```powershell
pip install -r "Server\requirements.txt"
```

## Run the application

From the `Server` directory, start the FastAPI server:

```powershell
cd "Server"
uvicorn main:app --reload
```

Then open the browser at:

```text
http://127.0.0.1:8000
```

## Usage

1. Enter values for pressure, temperature, humidity, cloud cover, sunshine, wind direction, and wind speed.
2. Click `Predict Rainfall`.
3. The result appears in a styled result card.

## Notes

- The app uses `Rainfall_Prediction_model.pkl` for prediction.
- The frontend is intentionally decoupled from backend route logic.
- Route names are unchanged: `/` for homepage and `/predict` for form submission.

## Optional Improvements

- Add a dedicated `favicon.ico` file in `Server/static`.
- Convert the notebook training workflow into a reproducible script.
- Replace the static pickle model with a REST API model serving backend.

---

Built with FastAPI, Jinja2, and modern frontend design patterns.
from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

import pickle
import pandas as pd
from pathlib import Path

app = FastAPI()

# Base Directory
BASE_DIR = Path(__file__).resolve().parent

# Templates
templates = Jinja2Templates(
    directory=BASE_DIR / "templates"
)

# Static Files
app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)

# Load Model
model_path = BASE_DIR / "Rainfall_Prediction_model.pkl"

with open(model_path, "rb") as file:
    data = pickle.load(file)

model = data["model"]

# Optional Features
features = data.get("features", None)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):

    return templates.TemplateResponse(
        request,
        "index.html",
        {"request": request}
    )


@app.post("/predict", response_class=HTMLResponse)
async def predict(
    request: Request,
    pressure: float = Form(...),
    temparature: float = Form(...),
    humidity: float = Form(...),
    cloud: float = Form(...),
    sunshine: float = Form(...),
    winddirection: float = Form(...),
    windspeed: float = Form(...)
):

    try:

        # Create dataframe
        input_data = pd.DataFrame([{
            "pressure": pressure,
            "temparature": temparature,
            "humidity": humidity,
            "cloud": cloud,
            "sunshine": sunshine,
            "winddirection": winddirection,
            "windspeed": windspeed
        }])

        # Arrange feature order if saved
        if features:
            input_data = input_data[features]

        # Prediction
        prediction = model.predict(input_data)

        result = (
            "🌧 Rainfall Expected"
            if prediction[0] == 1
            else "☀ No Rainfall"
        )

        return templates.TemplateResponse(
            request,
            "index.html",
            {
                "request": request,
                "prediction": result
            }
        )

    except Exception as e:

        return templates.TemplateResponse(
            request,
            "index.html",
            {
                "request": request,
                "error": str(e)
            }
        )

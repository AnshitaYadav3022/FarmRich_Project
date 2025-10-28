# DB initialization script here
# backend/create_db.py
from app.database import engine
from app import models
from app.database import SessionLocal
from app.crud import create_product
from app.schemas import ProductIn

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()

# load initial products
items = [
    ProductIn(name="Fresh Tomatoes", description="Organic tomatoes", price=40, unit="per kg", category="produce"),
    ProductIn(name="Fresh Spinach", description="Green spinach", price=25, unit="per bunch", category="produce"),
    ProductIn(name="Organic Fertilizer", description="NPK organic", price=500, unit="10kg", category="supply"),
    ProductIn(name="Bio-Pesticide", description="Neem", price=300, unit="5L", category="supply"),
]

for i in items:
    create_product(db, i, owner_id=None)

print("DB initialized.")

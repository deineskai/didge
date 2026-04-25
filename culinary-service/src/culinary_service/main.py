from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from culinary_service import models, database, auth, schemas, services

models.Base.metadata.create_all(bind=database.engine)


def init_culinary_units(db: Session):
    existing_units = db.query(models.CulinaryUnit).count()
    if existing_units == 0:
        units = [
            models.CulinaryUnit(name="gram", abbreviation="g", conversion_factor=1),
            models.CulinaryUnit(
                name="kilogram",
                abbreviation="kg",
                conversion_factor=1000,
                base_unit_id=1,
            ),
            models.CulinaryUnit(
                name="milliliter", abbreviation="ml", conversion_factor=1
            ),
            models.CulinaryUnit(
                name="liter", abbreviation="l", conversion_factor=1000, base_unit_id=3
            ),
            models.CulinaryUnit(name="piece", abbreviation="pc", conversion_factor=1),
            models.CulinaryUnit(
                name="serving", abbreviation="srv", conversion_factor=1
            ),
        ]
        db.add_all(units)
        db.commit()


def init_culinary_tags(db: Session):
    existing_tags = db.query(models.CulinaryTag).count()
    if existing_tags == 0:
        tags = [
            models.CulinaryTag(name="gluten-free"),
            models.CulinaryTag(name="dairy-free"),
            models.CulinaryTag(name="low-carb"),
        ]
        db.add_all(tags)
        db.commit()


def init_culinary_items(db: Session):
    existing_items = db.query(models.CulinaryItem).count()
    if existing_items == 0:
        items = [
            models.CulinaryItem(
                name="Salt",
                icon_id="salt",
                culinary_unit_id=1,
                quantity=3.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Pepper",
                icon_id="salt",
                culinary_unit_id=1,
                quantity=3.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Flour",
                icon_id="salt",
                culinary_unit_id=1,
                quantity=0.0,
                diet=models.DietFlag(vegan=True, vegetarian=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Water",
                icon_id="droplet",
                culinary_unit_id=1,
                quantity=0.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Olive Oil",
                icon_id="olive",
                culinary_unit_id=1,
                quantity=0.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Bell Pepper",
                icon_id="bell-pepper",
                culinary_unit_id=1,
                quantity=80.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Potato",
                icon_id="potato",
                culinary_unit_id=1,
                quantity=120.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
            models.CulinaryItem(
                name="Carrot",
                icon_id="carrot",
                culinary_unit_id=1,
                quantity=90.0,
                diet=models.DietFlag(vegan=True, vegetarian=True, gluten_free=True),
                tags=db.query(models.CulinaryTag)
                .filter(models.CulinaryTag.id.in_([1]))
                .all(),
            ),
        ]
        db.add_all(items)
        db.commit()


init_culinary_units(database.SessionLocal())
init_culinary_tags(database.SessionLocal())
init_culinary_items(database.SessionLocal())

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/culinary-units", response_model=list[schemas.CulinaryUnitRead])
def get_culinary_units(db: Session = Depends(get_db)):
    return services.get_all_units(db)


@app.get("/culinary-tags", response_model=list[schemas.CulinaryTagRead])
def get_culinary_tags(db: Session = Depends(get_db)):
    return services.get_all_tags(db)


@app.post("/culinary-tags", status_code=201)
def add_culinary_tags(
    tag_data: schemas.CulinaryTagCreate, db: Session = Depends(get_db)
):
    try:
        tag = services.create_culinary_tag(db, tag_data)
        return {"message": "Culinary tag created successfully", "id": tag.id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/culinary-items/recipes", response_model=list[schemas.RecipeRead])
def get_recipes(db: Session = Depends(get_db)):
    return services.get_all_recipes(db)


@app.get("/culinary-items/ingredients", response_model=list[schemas.IngredientRead])
def get_ingredients(db: Session = Depends(get_db)):
    return services.get_base_ingredients(db)


@app.get("/culinary-items/{item_id}", response_model=schemas.CulinaryItemRead)
def get_culinary_item(item_id: int, db: Session = Depends(get_db)):
    item = services.get_culinary_item_by_id(db, item_id)
    if not item:
        raise HTTPException(
            status_code=404, detail=f"Culinary item with ID {item_id} not found"
        )
    return item


@app.post("/culinary-items", status_code=201)
def add_culinary_item(
    item_data: schemas.CulinaryItemCreate, db: Session = Depends(get_db)
):
    try:
        item = services.create_culinary_item(db, item_data)
        return {"message": "Culinary item created successfully", "id": item.id}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

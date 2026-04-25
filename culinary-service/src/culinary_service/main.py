from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import exists
from culinary_service import models, database, auth

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


# Endpoints


@app.get("/culinary-units")
def get_culinary_units(db: Session = Depends(get_db)):
    return db.query(models.CulinaryUnit).all()


@app.get("/culinary-tags")
def get_culinary_tags(db: Session = Depends(get_db)):
    return db.query(models.CulinaryTag).all()


@app.post("/culinary-tags")
def add_culinary_tags(tags: list[str] = Body(...), db: Session = Depends(get_db)):
    # TODO: implement method
    return


@app.get("/culinery-items/recipes")
def get_recipes(db: Session = Depends(get_db)):
    recipes = (
        db.query(models.CulinaryItem)
        .filter(models.CulinaryItem.compositions.any())
        .options(joinedload(models.CulinaryItem.culinary_unit))
        .all()
    )
    return recipes


@app.get("/culinary-items")
def get_culinary_item(id: int, db: Session = Depends(get_db)):
    item = (
        db.query(models.CulinaryItem)
        .filter(models.CulinaryItem.id == id)
        .options(
            # Lädt die Compositions UND das darin enthaltene CulinaryItem
            joinedload(models.CulinaryItem.compositions).joinedload(
                models.CulinaryItemComposition.contained_item
            ),
            # Lädt die Einheiten der Compositions (ebenfalls wichtig!)
            joinedload(models.CulinaryItem.compositions).joinedload(
                models.CulinaryItemComposition.unit
            ),
            joinedload(models.CulinaryItem.instructions),
            joinedload(models.CulinaryItem.culinary_unit),
            joinedload(models.CulinaryItem.diet),
            joinedload(models.CulinaryItem.tags),
        )
        .first()
    )

    if not item:
        raise HTTPException(status_code=404, detail="Culinary item not found")

    return item


@app.get("/culinary-items/ingredients")
def get_ingredients(db: Session = Depends(get_db)):
    recipes = (
        db.query(models.CulinaryItem)
        .filter(~models.CulinaryItem.compositions.any())
        .all()
    )
    return recipes


@app.post("/culinary-items")
def add_culinary_item(
    name: str = Body(...),
    icon_id: str | None = Body(None),
    image_url: str | None = Body(None),
    culinary_unit_id: int = Body(...),
    quantity: float = Body(...),
    tag_ids: list[int] = Body(...),
    instructions: list[models.InstructionSchema] | None = Body([]),
    ingredients: list[models.ItemCompositionSchema] | None = Body([]),
    db: Session = Depends(get_db),
):
    tags = db.query(models.CulinaryTag).filter(models.CulinaryTag.id.in_(tag_ids)).all()

    if len(tags) != len(tag_ids):
        raise HTTPException(status_code=400, detail="One or more tags not found")

    if db.query(models.CulinaryItem).filter(models.CulinaryItem.name == name).first():
        raise HTTPException(
            status_code=400, detail="Culinary item with this name already exists"
        )

    if (
        not db.query(models.CulinaryUnit)
        .filter(models.CulinaryUnit.id == culinary_unit_id)
        .first()
    ):
        raise HTTPException(status_code=400, detail="Culinary unit not found")

    db_item = models.CulinaryItem(
        name=name,
        icon_id=icon_id,
        image_url=image_url,
        culinary_unit_id=culinary_unit_id,
        quantity=quantity,
        tags=tags,
    )
    db.add(db_item)
    db.flush()

    if ingredients:
        add_ingredients(db_item, ingredients, db)
        add_diet(db_item, ingredients, db)

    if instructions:
        add_instructions(db_item, instructions, db)

    db.commit()
    db.refresh(db_item)
    return "Culinary item created successfully"


def add_ingredients(
    containing_item: models.CulinaryItem,
    ingredients: list[models.ItemCompositionSchema],
    db: Session,
):
    for ingredient in ingredients:
        item = models.CulinaryItemComposition(
            containing_item_id=containing_item.id,
            contained_item_id=ingredient.contained_item_id,
            unit_id=ingredient.unit_id,
            quantity=ingredient.quantity,
        )
        db.add(item)


def add_diet(
    containing_item: models.CulinaryItem,
    ingredients: list[models.ItemCompositionSchema],
    db: Session,
):
    item_ids = [ing.contained_item_id for ing in ingredients]
    db_ingredients = (
        db.query(models.CulinaryItem).filter(models.CulinaryItem.id.in_(item_ids)).all()
    )

    diet = models.DietFlag(
        item_id=containing_item.id,
        vegan=all(ing.diet.vegan for ing in db_ingredients),
        vegetarian=all(ing.diet.vegetarian for ing in db_ingredients),
        gluten_free=all(ing.diet.gluten_free for ing in db_ingredients),
    )
    db.add(diet)


def add_instructions(
    culinary_item: models.CulinaryItem,
    instructions: list[models.InstructionSchema],
    db: Session,
):
    if instructions and len(instructions) > 0:
        for instruction in instructions:
            db.add(
                models.CulinaryInstruction(
                    item_id=culinary_item.id,
                    step_number=instruction.step_number,
                    summary=instruction.summary,
                    details=instruction.details,
                )
            )

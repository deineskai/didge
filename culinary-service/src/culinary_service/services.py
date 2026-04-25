from sqlalchemy.orm import Session, joinedload
from culinary_service import schemas
from culinary_service import models


def create_culinary_item(db: Session, item_data: schemas.CulinaryItemCreate):
    tags = validate_item_creation(db, item_data)
    db_item = init_culinary_item(db, item_data, tags)

    process_item_extensions(db, db_item, item_data)

    db.commit()
    db.refresh(db_item)
    return db_item


def validate_item_creation(db: Session, item_data: schemas.CulinaryItemCreate):
    if db.query(models.CulinaryItem).filter_by(name=item_data.name).first():
        raise ValueError("Culinary item with this name already exists")

    if not db.query(models.CulinaryUnit).get(item_data.culinary_unit_id):
        raise ValueError("Culinary unit not found")

    tags = (
        db.query(models.CulinaryTag)
        .filter(models.CulinaryTag.id.in_(item_data.tag_ids))
        .all()
    )
    if len(tags) != len(item_data.tag_ids):
        raise ValueError("One or more tags not found")

    return tags


def init_culinary_item(
    db: Session, item_data: schemas.CulinaryItemCreate, tags: list[models.CulinaryTag]
):
    db_item = models.CulinaryItem(
        name=item_data.name,
        icon_id=item_data.icon_id,
        image_url=item_data.image_url,
        culinary_unit_id=item_data.culinary_unit_id,
        quantity=item_data.quantity,
        tags=tags,
    )
    db.add(db_item)
    db.flush()
    return db_item


def process_item_extensions(
    db: Session, db_item: models.CulinaryItem, item_data: schemas.CulinaryItemCreate
):
    if item_data.ingredients:
        add_ingredients(db_item, item_data.ingredients, db)
        add_diet(db_item, item_data.ingredients, db)

    if item_data.instructions:
        add_instructions(db_item, item_data.instructions, db)


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


def get_culinary_item_by_id(db: Session, item_id: int):
    return (
        db.query(models.CulinaryItem)
        .filter(models.CulinaryItem.id == item_id)
        .options(
            joinedload(models.CulinaryItem.compositions).joinedload(
                models.CulinaryItemComposition.contained_item
            ),
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


def get_base_ingredients(db: Session):
    return (
        db.query(models.CulinaryItem)
        .filter(~models.CulinaryItem.compositions.any())
        .all()
    )


def get_all_recipes(db: Session):
    return (
        db.query(models.CulinaryItem)
        .filter(models.CulinaryItem.compositions.any())
        .options(joinedload(models.CulinaryItem.culinary_unit))
        .all()
    )


def create_culinary_tag(db: Session, tag_data: schemas.CulinaryTagCreate):
    if db.query(models.CulinaryItem).filter_by(name=tag_data.name).first():
        raise ValueError("Culinary tag with this name already exists")

    db_tag = models.CulinaryTag(name=tag_data.name)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


def add_instructions(
    culinary_item: models.CulinaryItem,
    instructions: list[models.InstructionSchema],
    db: Session,
):
    if not instructions or len(instructions) > 0:
        return

    for instruction in instructions:
        db_instruction = models.CulinaryInstruction(
            item_id=culinary_item.id,
            step_number=instruction.step_number,
            summary=instruction.summary,
            details=instruction.details,
        )
        db.add(db_instruction)


def get_all_units(db: Session):
    return db.query(models.CulinaryUnit).all()


def get_all_tags(db: Session):
    return db.query(models.CulinaryTag).all()

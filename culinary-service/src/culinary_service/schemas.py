from pydantic import BaseModel


class CulinaryItemCreate(BaseModel):
    name: str
    icon_id: str | None = None
    image_url: str | None = None
    culinary_unit_id: int
    quantity: float
    tag_ids: list[int]
    instructions: list[CulinaryInstructionCreate] = []
    ingredients: list[ItemCompositionCreate] = []


class CulinaryTagCreate(BaseModel):
    name: str


class CulinaryInstructionCreate(BaseModel):
    step_number: int
    summary: str
    details: str


class ItemCompositionCreate(BaseModel):
    containing_item_id: int | None = None
    contained_item_id: int
    unit_id: int
    quantity: float


class DietFlagRead(BaseModel):
    vegan: bool
    vegetarian: bool
    gluten_free: bool

    class Config:
        from_attributes = True


class CulinaryItemRead(BaseModel):
    id: int
    name: str
    icon_id: str | None
    image_url: str | None
    quantity: float
    diets: DietFlagRead | None
    tags: list[CulinaryTagRead] = []
    instructions: list[CulinaryInstructionRead] = []

    class Config:
        from_attributes = True


class IngredientRead(BaseModel):
    id: int
    name: str
    icon_id: str | None
    image_url: str | None

    class Config:
        from_attributes = True


class RecipeRead(BaseModel):
    id: int
    name: str
    icon_id: str | None
    image_url: str | None
    diets: DietFlagRead | None
    tags: list[CulinaryTagRead] | None

    class Config:
        from_attributes = True


class CulinaryUnitRead(BaseModel):
    id: int
    name: str
    abbreviation: str
    conversion_factor: int
    base_unit_id: int | None

    class Config:
        from_attributes = True


class CulinaryTagRead(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CulinaryInstructionRead(BaseModel):
    step_number: int
    summary: str
    details: str

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float, Table
from sqlalchemy.orm import relationship
from culinary_service.database import Base


culinary_item_tag_association = Table(
    "culinary_item_tags",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("culinary_items.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("culinary_tags.id"), primary_key=True),
)


class CulinaryItem(Base):
    __tablename__ = "culinary_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    icon_id = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    culinary_unit_id = Column(Integer, ForeignKey("culinary_units.id"), nullable=False)
    quantity = Column(
        Float, nullable=False
    )  # Yielding quantity (Recipe) / Base quantity (Ingredient)

    culinary_unit = relationship("CulinaryUnit")

    compositions = relationship(
        "CulinaryItemComposition",
        foreign_keys="CulinaryItemComposition.containing_item_id",
        back_populates="containing_item",
    )
    instructions = relationship("CulinaryInstruction", back_populates="item")
    diets = relationship("DietFlag", back_populates="item", uselist=False)
    tags = relationship("CulinaryTag", secondary=culinary_item_tag_association)


class CulinaryUnit(Base):
    __tablename__ = "culinary_units"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    abbreviation = Column(String)

    conversion_factor = Column(Integer, default=1)

    base_unit_id = Column(Integer, ForeignKey("culinary_units.id"), nullable=True)

    def convert_to_base(self, quantity: float) -> float:
        return quantity * self.conversion_factor

    def convert_from_base(self, quantity_in_base: float) -> float:
        return quantity_in_base / self.conversion_factor


class CulinaryItemComposition(Base):
    __tablename__ = "culinary_item_compositions"

    id = Column(Integer, primary_key=True, index=True)
    containing_item_id = Column(
        Integer, ForeignKey("culinary_items.id"), nullable=False
    )
    contained_item_id = Column(Integer, ForeignKey("culinary_items.id"), nullable=False)
    unit_id = Column(Integer, ForeignKey("culinary_units.id"), nullable=False)
    quantity = Column(Float, nullable=False)

    containing_item = relationship(
        "CulinaryItem", foreign_keys=[containing_item_id], back_populates="compositions"
    )
    contained_item = relationship("CulinaryItem", foreign_keys=[contained_item_id])
    unit = relationship("CulinaryUnit")


class CulinaryInstruction(Base):
    __tablename__ = "culinary_instructions"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("culinary_items.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    summary = Column(String, nullable=False)
    details = Column(String, nullable=False)

    item = relationship("CulinaryItem")


class DietFlag(Base):
    __tablename__ = "diet_flags"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("culinary_items.id"), nullable=False)
    vegan = Column(Boolean)
    vegetarian = Column(Boolean)
    gluten_free = Column(Boolean)

    item = relationship("CulinaryItem", back_populates="diets")


class CulinaryTag(Base):
    __tablename__ = "culinary_tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

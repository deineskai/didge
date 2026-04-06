from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from household_service import models, database, auth

# Create database tables on startup
models.Base.metadata.create_all(bind=database.engine)

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

# Create household
@app.post("/household")
def create_household(
    name: str = Body(..., embed=True),
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    household = models.Household(
        name = name
    )

    household.members.append(
        models.HouseholdMember(
            household_id=household.id, 
            user_id=user_id, 
            is_admin=True
        )
    )

    db.add(household)    
    db.commit()
    return {"message": "Household created successfully"}

# Delete household
@app.delete("/household")
def delete_household(
    id: int,
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    household = db.query(models.Household).filter(
        models.Household.id == id
    ).first()
    
    if not household:
        raise HTTPException(
            status_code=404, 
            detail="Specified houshold does not exist"
        )
    
    is_admin = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == id,
        models.HouseholdMember.user_id == user_id,
        models.HouseholdMember.is_admin == True
    ).first()

    if not is_admin:
        raise HTTPException(
            status_code=403, 
            detail="You do not have permission to delete this household."
        )
    
    db.delete(household)
    db.commit()
    return {"message": "Household deleted successfully"}

# Get households
@app.get('/households')
def get_households(
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    households = db.query(models.Household)\
        .join(models.HouseholdMember, models.Household.id == models.HouseholdMember.household_id)\
        .filter(models.HouseholdMember.user_id == user_id)\
        .all()

    return households

# Send invitation
@app.post("/households/invitations")
def send_household_invitation(
    to_user_id = Body(...),
    household_id = Body(...),
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    sender_is_admin = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == household_id,
        models.HouseholdMember.user_id == user_id,
        models.HouseholdMember.is_admin == True
    ).first()

    if not sender_is_admin:
        raise HTTPException(
            status_code=403, 
            detail="Only admins can send invitations for this household"
        )

    existing_invitation = db.query(models.Invitation).filter(
        models.Invitation.to_user_id == to_user_id, 
        models.Invitation.household_id == household_id
    ).first()

    if existing_invitation:
        raise HTTPException(status_code=400, detail="Invitation already sent")
    
    already_member = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == household_id, 
        models.HouseholdMember.user_id == to_user_id
    ).first()

    if already_member:
        raise HTTPException(status_code=400, detail="User already is a member of the household")
    
    invitation = models.Invitation(
        household_id=household_id,
        to_user_id=to_user_id
    )
    db.add(invitation)
    db.commit()
    return {"message": "Household invitation sent successfully"}
        
# Get invitations
@app.get("/households/invitations")
def get_household_invitations(
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    results = db.query(models.Invitation, models.Household.name).join(
        models.Household, 
        models.Invitation.household_id == models.Household.id
    ).filter(
        models.Invitation.to_user_id == user_id
    ).all()

    return [
        {
            "invitation_id": invitation.id,
            "household_id": invitation.household_id,
            "household_name": household_name
        } 
        for invitation, household_name in results
    ]

# Respond to invitation
@app.post("/households/invitations/respond")
def respond_to_household_invitation(
    invitation_id: int = Body(..., embed=True),
    accept: bool = Body(..., embed=True),
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    invitation = db.query(models.Invitation).filter(
        models.Invitation.id == invitation_id,
        models.Invitation.to_user_id == user_id,
    ).first()

    if not invitation:
        raise HTTPException(status_code=404, detail="Household invitation not found")
    
    if accept:
        already_member = db.query(models.HouseholdMember).filter(
            models.HouseholdMember.household_id == invitation.household_id,
            models.HouseholdMember.user_id == user_id
        ).first()

        if not already_member:
            member = models.HouseholdMember (
                household_id=invitation.household_id,
                user_id=user_id,
                is_admin = False
            )
            db.add(member)        
    
    db.delete(invitation)
    db.commit()
    return {"message": f"Household invitation {'accepted' if accept else 'rejected'} successfully"}

# Remove household member
@app.delete("/households/members")
def remove_household_member(
    household_id: int = Body(...),
    remove_user_id: int = Body(...),
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    sender_is_admin = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == household_id,
        models.HouseholdMember.user_id == user_id,
        models.HouseholdMember.is_admin == True
    ).first()

    if not sender_is_admin and user_id != remove_user_id:
        raise HTTPException(status_code=403, detail="Not authrorized")

    member = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == household_id, 
        models.HouseholdMember.user_id == remove_user_id
    ).first()

    if not member:
        raise HTTPException(status_code=404, detail="User is not a member of the household")
    
    if member.user_id == user_id:
        admin_count = db.query(models.HouseholdMember).filter(
            models.HouseholdMember.household_id == household_id,
            models.HouseholdMember.is_admin == True
        ).count()
        
        if admin_count <= 1 and sender_is_admin:
            raise HTTPException(
                status_code=400, 
                detail="You are the last admin. You cannot leave without appointing another admin or deleting the household."
            )

    db.delete(member)
    db.commit()
    return {"message": "Removed user from household successfully"}
    
# Get household
@app.get("/household")
def get_household(
    # household_id as query param (?household_id=123)
    id: int, 
    user_id: int = Depends(auth.get_current_user_id), 
    db: Session = Depends(get_db)
):
    sender_is_member = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == id,
        models.HouseholdMember.user_id == user_id,
    ).first()

    if not sender_is_member:
        raise HTTPException(
            status_code=403, 
            detail="You are not a member of this household"
        )
    household = db.query(models.Household).filter(
        models.Household.id == id
    ).first()

    is_admin = db.query(models.HouseholdMember).filter(
        models.HouseholdMember.household_id == id,
        models.HouseholdMember.user_id == user_id,
        models.HouseholdMember.is_admin == True
    ).first()

    return {
        "id": household.id,
        "name": household.name,
        "members": household.members,
        "admin": bool(is_admin)
        }
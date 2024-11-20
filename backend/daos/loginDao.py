from models.login import Login
from app import db
from sqlalchemy.exc import IntegrityError

def add_user(name, username, email, password):
    """Add a new employee to the database."""
    try:
        new_user = Login(name=name, username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return f"User {name} added successfully!"
    except IntegrityError:
        db.session.rollback()
        return "Error: Email must be unique."

def get_all_users():
    return Login.query.all()
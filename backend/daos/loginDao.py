from models.login import Login
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError

class LoginDao:
    def add_user(self, name, username, email, password):
        """Add a new employee to the database."""
        try:
            new_user = Login(name=name, username=username, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()
            return f"User {name} added successfully!"
        except IntegrityError:
            db.session.rollback()
            return "Error: Email must be unique."

    def get_all_users(self):
        return Login.query.all()
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
            return True, f"User {name} added successfully!"
        except IntegrityError as e:
            db.session.rollback()
            if "username" in str(e.orig):
                return False, "Error: Username must be unique."
            elif "email" in str(e.orig):
                return False, "Error: Email must be unique."
            else:
                return False, "Error: An unknown integrity error occurred."

    def get_all_users(self):
        users = Login.query.all()
        return [
            {
                "id": user.id,
                "name": user.name,
                "username": user.username,
                "password": user.password,
                "email": user.email
            }
            for user in users
        ]

    def validate_login(self, username, password):
        query = Login.query.filter_by(username=username, password=password).first()
        login = None
        if query:
            login = {
                "id": query.id,
                "name": query.name,
                "username": query.username,
                "email": query.email
            }
        return login

    def delete_user(self, username):
        query = Login.query.filter_by(username=username).first()

        if query:
            try:
                db.session.delete(query)
                db.session.commit()
                return True
            except Exception as e:
                db.session.rollback()
                return False
        else:
            return False


from models.manager import Manager
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError

class ManagerDao:

    def add_manager(self, name, email, phone, type):
        try:
            new_man= Manager(name=name, phone=phone, email=email, type=type)
            db.session.add(new_man)
            db.session.commit()
            return True, f"User {name} added successfully!"
        except IntegrityError as e:
            db.session.rollback()
            if "email" in str(e.orig):
                return False, "Error: Email must be unique."
            else:
                print(e)
                return False, "Error: An unknown integrity error occurred."



    def get_all_managers(self):
        mans = Manager.query.all()
        return [
            {
                "id": man.id,
                "name": man.name,
            }
            for man in mans
        ]

    def delete_manager(self, name):
        query = Manager.query.filter_by(name=name).first()

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


from models.timesheet import Timesheet
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError

class TimesheetDao:

    def add_timesheet(self,year, employee_id, month, week1, week2, week3, week4):
        try:
            new_timesheet= Timesheet(year=year, employee_id=employee_id, month=month, week1=week1, week2=week2, week3=week3, week4=week4)
            db.session.add(new_timesheet)
            db.session.commit()
            return True, f"User {id}'s timesheet added successfully!"
        except IntegrityError as e:
            db.session.rollback()
            print(e)
            return False, "Error: An unknown integrity error occurred."





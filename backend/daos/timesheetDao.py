from models.timesheet import Timesheet
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError
import json

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

    def get_timesheet(self,employee_id, month, year):
        q = Timesheet.query.filter_by(employee_id=employee_id, month=month, year=year).first()
        ts = None
        if q:
            ts = {
                "employee_id": employee_id,
                "month": month,
                "year": year,
                "week1": json.loads(q.week1),
                "week2": json.loads(q.week2),
                "week3": json.loads(q.week3),
                "week4": json.loads(q.week4),
            }
            print(ts)
        return ts


    def update_timesheet(self,year, employee_id, month, week1, week2, week3, week4):
       try:
            q = Timesheet.query.filter_by(employee_id=employee_id, month=month, year=year).first()
            if not q:
                return False, f"User {employee_id}'s timesheet not found."
            q.week1 = week1
            q.week2 = week2
            q.week3 = week3
            q.week4 = week4
            db.session.commit()

            return True, f"User {employee_id}'s timesheet updated successfully!"
       except IntegrityError as e:
            db.session.rollback()
            print(e)
            return False, "Error: An unknown integrity error occurred."





    def delete_timesheet(self,year, employee_id, month):
        try:
            q = Timesheet.query.filter_by(employee_id=employee_id, month=month).first()
            db.session.delete(q)
            db.session.commit()
            return True, f"User {employee_id}'s timesheet deleted successfully!"
        except IntegrityError as e:
            db.session.rollback()
            return False, f"Error: An unknown integrity error occurred."



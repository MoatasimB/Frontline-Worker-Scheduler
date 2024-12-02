from models.timesheet import Timesheet
from extensions.db_extensions import db
from sqlalchemy.exc import IntegrityError
import json

class TimesheetDao:

    def add_timesheet(self,year, employee_id, month, selected_days):
        try:
            new_timesheet= Timesheet(year=year, month=month, employee_id=employee_id, selected_days=selected_days)
            db.session.add(new_timesheet)
            db.session.commit()
            return True, f"User {employee_id}'s timesheet added successfully!"
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
                "selected_days": json.loads(q.selected_days),
            }
        return ts


    def update_timesheet(self,year, employee_id, month, selected_days):
       try:
            q = Timesheet.query.filter_by(employee_id=employee_id, month=month, year=year).first()
            if not q:
                return False, f"User {employee_id}'s timesheet not found."
            q.selected_days = selected_days
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



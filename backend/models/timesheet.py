from extensions.db_extensions import db
from datetime import datetime
import json


def default_week():
    return json.dumps({"Sun":"0", "Mon":"0", "Tues":"0", "Wed":"0", "Thurs":"0", "Fri":"0", "Sat":"0"})

def default_month():
    return datetime.now().strftime("%B")

def default_year():
    return str(datetime.now().year)

class Timesheet(db.Model):
    __tablename__ = 'timesheet'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)  # Primary Key
    month = db.Column(db.String(15), nullable=False, default = default_month)
    year = db.Column(db.String(4), nullable=False, default = default_year)
    week1 = db.Column(db.String(40), nullable=True, default=default_week)
    week2 = db.Column(db.String(40), nullable=True, default=default_week)
    week3 = db.Column(db.String(40), nullable=True, default=default_week)
    week4 = db.Column(db.String(40), nullable=True, default=default_week)

    
    # Foreign Key to reference the User model
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id', name='fk_timesheet_employee'), nullable=False)
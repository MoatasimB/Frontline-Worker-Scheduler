from app import db
from datetime import datetime


def default_week():
    return "S:0 M:0 T:0 W:0 Th:0 F:0 S:0"

def default_month():
    return datetime.now().strftime("%B")

def default_year():
    return str(datetime.now().year)

class Timesheet(db.Model):
    __tablename__ = 'timesheet'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)  # Primary Key
    month = db.Column(db.String(15), nullable=False, default = default_month)
    year = db.Column(db.String(4), nullable=False, default = default_year)
    week1 = db.Column(db.String(40), nullable=False, default=default_week)
    week2 = db.Column(db.String(40), nullable=False, default=default_week)
    week3 = db.Column(db.String(40), nullable=False, default=default_week)
    week4 = db.Column(db.String(40), nullable=False, default=default_week)

    
    # Foreign Key to reference the User model
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
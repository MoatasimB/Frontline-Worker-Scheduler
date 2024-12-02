from extensions.db_extensions import db
from datetime import datetime
import json


def default_days():
    return json.dumps([])

def default_month():
    return datetime.now().strftime("%B")

def default_year():
    return str(datetime.now().year)

class Timesheet(db.Model):
    __tablename__ = 'timesheet'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)  # Primary Key
    month = db.Column(db.String(15),db.UniqueConstraint(name="uq_month"), nullable=False, default = default_month)
    year = db.Column(db.String(4),db.UniqueConstraint(name="uq_year"), nullable=False, default = default_year)
    selected_days = db.Column(db.String(80), nullable=True, default=default_days)

    # Foreign Key to reference the User model
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id', name='fk_timesheet_employee'), nullable=False)
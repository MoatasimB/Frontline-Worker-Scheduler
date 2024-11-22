from extensions.db_extensions import db

class Employee(db.Model):
    __tablename__ = 'employee'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), db.UniqueConstraint(name="uq_email"), unique=True, nullable=True)
    phone = db.Column(db.String(12), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id', name='fk_employee_manager'), nullable=True)  # Foreign key to Manager table
    type = db.Column(db.String(80), nullable=False)
    # Relationships
    managers = db.relationship('Manager', backref='employees', lazy=True)
    timesheets = db.relationship('Timesheet', backref='employees', lazy=True)


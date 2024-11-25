from extensions.db_extensions import db

class Employee(db.Model):
    __tablename__ = 'employee'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), db.UniqueConstraint(name="uq_email"), nullable=True)
    phone = db.Column(db.String(12), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('manager.id', name='fk_employee_manager'),
                           nullable=True)  # Foreign key to Manager table
    login_id = db.Column(db.Integer, db.ForeignKey('login.id', name='fk_employee_login'),
                         nullable=False)  # Foreign key to Login table
    type = db.Column(db.String(80), nullable=False)

    # Relationships
    managers = db.relationship('Manager', backref='employees', lazy=True)
    login = db.relationship('Login', backref='employees', lazy=True)  # Relationship with Login table
    timesheets = db.relationship('Timesheet', backref='employees', lazy=True)


from extensions.db_extensions import db

class Manager(db.Model):
    __tablename__ = 'manager'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), db.UniqueConstraint(name="uq_email"), nullable=True)
    phone = db.Column(db.String(12), nullable=False)
    type = db.Column(db.String(80), nullable=False)

from extensions.db_extensions import db

class Login(db.Model):
    __tablename__ = 'login'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(120), unique=True, nullable=True)
    name = db.Column(db.String(80), nullable=False)
    
from extensions.db_extensions import db

class Login(db.Model):
    __tablename__ = 'login'  # Explicit table name for clarity
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), db.UniqueConstraint(name="uq_username"), unique=True, nullable=False)
    email = db.Column(db.String(120), db.UniqueConstraint(name="uq_email"),unique=True, nullable=True)
    password = db.Column(db.String(120), nullable=True)
    name = db.Column(db.String(80), nullable=False)

    def __str__(self):
        return f"{self.id} | {self.username} | {self.name} | {self.email} | {self.password}"


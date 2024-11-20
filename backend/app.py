from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from extensions.db_extensions import db, migrate
from src.routes import routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress a warning

db.init_app(app)
migrate.init_app(app, db)

from models.employee import Employee
from models.timesheet import Timesheet
from models.manager import Manager

app.register_blueprint(routes, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)

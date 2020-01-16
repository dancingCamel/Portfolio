import os
from flask import Flask
from flask_restful import Api
from db import db
from resources.index import Index
from resources.projects import Projects


app = Flask(__name__)
api = Api(app)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = "dev"
app.config.from_pyfile('config.py', silent=True)


# move to run file for production
@app.before_first_request
def create_tables():
    db.create_all()


# site endpoints
api.add_resource(Index, '/')
api.add_resource(Projects, '/projects')


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        app.run(host="127.0.0.1", port=5000, debug=True)

from flask import request, abort, current_app
from functools import wraps
from werkzeug.security import check_password_hash
import os


def authenticate(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        username = request.headers.get('username')
        password = request.headers.get('password')

        # for use in development
        # admin_user = current_app.config['USERNAME']
        # admin_pass = current_app.config['PASSWORD']

        # for use in production
        admin_user = os.getenv('USERNAME')
        admin_pass = os.getenv('PASSWORD')

        if username != admin_user:
            abort(401)

        if check_password_hash(admin_pass, password):
            return view_function(*args, **kwargs)

        abort(401)

    return decorated_function

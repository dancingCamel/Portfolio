from flask import request, abort
from functools import wraps
from werkzeug.security import check_password_hash
from models.user import UserModel


def authenticate(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        username = request.headers.get('username')
        password = request.headers.get('password')

        user = UserModel.find_by_username(username)
        if user:
            if check_password_hash(user.password, password):
                return view_function(*args, **kwargs)

        abort(401)

    return decorated_function

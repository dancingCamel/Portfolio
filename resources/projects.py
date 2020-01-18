from flask_restful import Resource, reqparse
from models.projects import ProjectsModel
from auth import authenticate

_projects_parser = reqparse.RequestParser()

required_columns = ["title", "thumb", "image", "tags",
                    "description", "challenges", "reflections"]

optional_columns = ["github", "live"]


def add_to_parser(column_array, _required):
    if _required:
        help_string = "This field is required"
    else:
        help_string = "This field is optional"
    for column in column_array:
        _projects_parser.add_argument(
            column, type=str, required=_required, help=help_string)


add_to_parser(required_columns, True)
add_to_parser(optional_columns, False)


class Projects(Resource):

    def get(self):
        projects = [project.json() for project in ProjectsModel.find_all()]
        return {'projects': projects}, 200

    @authenticate
    def put(self):
        data = _projects_parser.parse_args()
        project = ProjectsModel.find_by_title(data['title'])

        if project:
            project.thumb = data['thumb']
            project.image = data['image']
            project.tags = data['tags']
            project.description = data['description']
            project.challenges = data['challenges']
            project.reflections = data['reflections']
            if data['github']:
                project.github = data['github']
            else:
                project.github = ""
            if data['live']:
                project.live = data['live']
            else:
                project.live = ""
        else:
            project = ProjectsModel(
                data['title'],
                data['thumb'],
                data['image'],
                data['tags'],
                data['description'],
                data['challenges'],
                data['reflections'],
                data['github'],
                data['live'])

        try:
            project.save_to_db()
        except:
            return {'message': "Something went wrong adding the project"}, 501
        return project.json()

    @authenticate
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("title", type=str, required=True,
                            help="Title is required")

        data = parser.parse_args()
        project = ProjectsModel.find_by_title(data['title'])

        if project:
            project.delete_from_db()

        return {'message': "Deleted successfully"}, 200

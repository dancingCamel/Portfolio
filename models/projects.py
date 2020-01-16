from db import db


class ProjectsModel(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    thumb = db.Column(db.String(80))
    image = db.Column(db.String(80))
    tags = db.Column(db.String())
    description = db.Column(db.String())
    challenges = db.Column(db.String())
    reflections = db.Column(db.String())
    github = db.Column(db.String(180))
    live = db.Column(db.String(80))

    def __init__(self, title, thumb, image, tags, description, challenges, reflections, github, live):
        self.title = title
        self.thumb = thumb
        self.image = image
        self.tags = tags
        self.description = description
        self.challenges = challenges
        self.reflections = reflections
        self.github = github
        self.live = live

    def json(self):
        return {'id': self.id,
                'title': self.title,
                'thumb': self.thumb,
                'image': self.image,
                'tags': self.tags,
                'description': self.description,
                'challenges': self.challenges,
                'reflections': self.reflections,
                'github': self.github,
                'live': self.live
                }

    @classmethod
    def find_by_title(cls, title):
        return cls.query.filter_by(title=title).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

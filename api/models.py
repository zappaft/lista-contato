from . import db

class ContatoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    cargo = db.Column(db.String(50))
    municipio = db.Column(db.String(50))
    regiao = db.Column(db.String(50))
    email = db.Column(db.String(50))
    numero = db.Column(db.String(50))

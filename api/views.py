from flask import Blueprint, jsonify, request, render_template
import json
from . import db
from .models import ContatoModel
import os
main = Blueprint('main', __name__)


@main.route('/')
def home():
    return render_template('index.html')


@main.route('/contatos', methods=['GET'])
def get_contatos():
    contatos = []
    params = {
        'nome': request.args.get('nome'),
        'cargo': request.args.get('cargo'),
        'municipio': request.args.get('municipio'),
        'regiao': request.args.get('regiao')
    }
    if any(x for x in params.values() if x is not None):
        contatos = filter_query(params)
    else:
        contatos_list = ContatoModel.query.all()

        for contato in contatos_list:
            contatos.append({
                'id': contato.id,
                'nome': contato.nome,
                'cargo': contato.cargo,
                'municipio': contato.municipio,
                'regiao': contato.regiao,
                'email': contato.email,
                'numero': contato.numero
            })
    return jsonify({'Contatos': contatos})


@main.route('/contatos', methods=['POST'])
def create_contato():
    data = request.get_json()
    nome = data['nome'].upper()
    contato_existente = ContatoModel.query.filter_by(nome=nome).first()
    if contato_existente is not None:
        return 'Já tem um contato com esse nome', 409
    novo_contato = ContatoModel(
        nome=data['nome'].upper(),
        cargo=data['cargo'].upper(),
        municipio=data['municipio'].upper(),
        regiao=data['regiao'].upper(),
        email=data['email'].lower(),
        numero=data['numero']
    )
    db.session.add(novo_contato)
    db.session.commit()
    return 'Contato adicionado', 201


@main.route('/contato/<int:id>', methods=['PUT'])
def update_contato(id):
    data = request.get_json()
    contato = ContatoModel.query.filter_by(id=id).first()
    print(contato.nome)
    contato.nome=data['nome'].upper()
    contato.cargo=data['cargo'].upper()
    contato.municipio=data['municipio'].upper()
    contato.regiao=data['regiao'].upper()
    contato.email=data['email'].lower()
    contato.numero=data['numero']
    db.session.commit()
    return 'Contato atualizado', 201


@main.route('/contato/<int:id>', methods=['DELETE'])
def delete_contato(id):
    contato_existente = ContatoModel.query.filter_by(id=id).delete()
    db.session.commit()
    return 'Contato removido', 201

@main.route('/contato/<int:id>', methods=['GET'])
def get_contato(id):
    contato = ContatoModel.query.filter_by(id=id).first()
    if contato is not None:
        return jsonify({
                'id': contato.id,
                'nome': contato.nome,
                'cargo': contato.cargo,
                'municipio': contato.municipio,
                'regiao': contato.regiao,
                'email': contato.email,
                'numero': contato.numero
            }), 201

@main.route('/municipios', methods=['GET'])
def get_municipios():
    with open(os.path.dirname(__file__) + r'\static\municipios.json', 'r', encoding='utf-8') as file:
        lista = json.load(file)
    return lista


def filter_query(params):
    contato = None
    resultado = []
    if params['nome'] is not None:
        params['nome'] = params['nome'].upper().strip()
        contato = ContatoModel.query.filter(
            ContatoModel.nome.like(f"%{params['nome']}%")
        )

    if params['cargo'] is not None:
        params['cargo'] = params['cargo'].upper().strip()
        if contato is not None:
            contato = contato.filter(
                ContatoModel.cargo.like(f"%{params['cargo']}%")
            )
        else:
            contato = ContatoModel.query.filter(
                ContatoModel.cargo.like(f"%{params['cargo']}%")
            )

    if params['municipio'] is not None:
        params['municipio'] = params['municipio'].upper().strip()
        if contato is not None:
            contato = contato.filter(
                ContatoModel.municipio.like(f"%{params['municipio']}%")
            )
        else:
            contato = ContatoModel.query.filter(
                ContatoModel.municipio.like(f"%{params['municipio']}%")
            )

    if params['regiao'] is not None:
        params['regiao'] = params['regiao'].upper().strip()
        if contato is not None:
            contato = contato.filter(
                ContatoModel.regiao.like(f"%{params['regiao']}%")
            )
        else:
            contato = ContatoModel.query.filter(
                ContatoModel.regiao.like(f"%{params['regiao']}%")
            )

    contato = contato.all()
    for cont in contato:
        resultado.append({
            'nome': cont.nome,
            'cargo': cont.cargo,
            'municipio': cont.municipio,
            'regiao': cont.regiao,
            'email': cont.email,
            'numero': cont.numero
        })
    return resultado

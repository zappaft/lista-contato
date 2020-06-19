# lista-contato

### [ENG]

## Description
The objective of this minimal project was to solve a daily problem both I and the other intern had to deal with. We were constantly sending e-mails to many groups of people, and these groups weren't fixed groups, ranging from whole cities to one specific role from one specific city. Probably there's a better solution already there for it, but this project was also meant for applying what I've been learning.

## How to install
Install pipenv and use it to install Pipfile requirements or do it manually.
```bash
git clone https://github.com/zappaft/lista-contato.git
cd lista-contato
pip install pipenv
pipenv sync
pipenv shell
python app.py
```
Pop this link on the browser and you're good to go:
`127.0.0.1:5000/`

## How to use
> On the very top of the page, you can create a contact, which is saved to `db.db`. As you save your new contact, it will pop on the list of contacts.

> With some contacts in, you will be able to filter then using the checkboxes for each field. *not every field is filterable*

> Now, once you have a filtered list (or the entire list if you wish) you can click on the contact's e-mail to copy it to your clipboard. If you wish to copy every e-mail from the visible list, you can click on the column header `Email`.


### [PT-BR]

## Descrição
O intuito desse mini-projeto foi criar uma solução para um problema que vivia junto com outro estagiário: Enviar centenas de e-mails semanalmente... para vários grupos distintos e variáveis. E ao mesmo tempo, tinha como objetivo aprender e praticar as ferramentas usadas aqui.
A idéia era criar uma API em Python com Flask, consumir no JavaScript e jogar no HTML. Jinja foi utilizado apenas para o path dos arquivos no HTML.

## Como instalar
Use pipenv para baixar as dependências ou faça manualmente lendo o Pipfile.
```bash
git clone https://github.com/zappaft/lista-contato.git
cd lista-contato
pip install pipenv
pipenv sync
pipenv shell
python app.py
```
Abra o endereço no navegador:
`127.0.0.1:5000/`

Pronto!

## Usabilidade
> Com o botão no topo da página você pode criar contatos que ficam salvos no arquivo `db.db`. Ao criar um contato, ele será mostrado na lista logo em seguida.

> Na lista de contatos há uma checkbox para alguns campos que, quando ativadas, filtram a lista de contatos.

> Ao clicar no e-mail de um contato, este será copiado para seu clipboard. E por fim, ao filtrar a lista que deseja enviar e-mail, você pode clicar na própria coluna `Email` para copiar todos os e-mails vísiveis.

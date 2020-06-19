# lista-contato

## Descrição
O intuito desse mini-projeto foi criar uma solução para um problema que vivia junto com outro estagiário: Enviar centenas de e-mails semanalmente... para vários grupos distintos e variáveis. E ao mesmo tempo, tinha como objetivo aprender e praticar as ferramentas usadas aqui.
A idéia era criar uma API RESTful em Python com Flask, consumir no JavaScript e jogar no HTML. Jinja foi utilizado apenas para o path dos arquivos no HTML.

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
Abra o endereço no navegador: 127.0.0.1:5000/

Pronto!

## Usabilidade
> Com o botão no topo da página você pode criar contatos que ficam salvos no arquivo `db.db`. Ao criar um contato, ele será mostrado na lista logo em seguida.

> Na lista de contatos há uma checkbox para alguns campos que, quando ativadas, filtram a lista de contatos.

> Ao clicar no e-mail de um contato, este será copiado para seu clipboard. E por fim, ao filtrar a lista que deseja enviar e-mail, você pode clicar na própria coluna `Email` para copiar todos os e-mails vísiveis.

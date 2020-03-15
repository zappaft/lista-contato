const carregarMunicipios = async () => {
    const resp = await fetch('http://127.0.0.1:5000/municipios');
    var myJson = await resp.json();
    return myJson
};

var regioes = null;
carregarMunicipios().then((res) => {
    regioes = res;
});

const limparMunicipios = (id) => {
    var municipioSelector = document.getElementById(id);
    var child = municipioSelector.lastElementChild;
    while (child) {
        municipioSelector.removeChild(child);
        child = municipioSelector.lastElementChild;
    }
};

const mudarMunicipios = (regiao, id) => {
    limparMunicipios(id);
    console.log(regioes);
    var municipioSelector = document.getElementById(id.toString());
    for (var municipio of regioes[regiao]) {
        var option = document.createElement('option');
        var optionTxt = document.createTextNode(municipio);
        option.appendChild(optionTxt);
        municipioSelector.appendChild(option);
    }
};

const getContatos = async () => {
    var url = 'http://127.0.0.1:5000/contatos';
    var nameToFilter = document.getElementById('filter-nome-checkbox').checked ? document
        .getElementById('filter-nome').value : "";
    var cargoToFilter = document.getElementById('filter-cargo-checkbox').checked ? document
        .getElementById('filter-cargo').value : "";
    var municipioToFilter = document.getElementById('filter-municipio-checkbox').checked ? document
        .getElementById('filter-municipio').value : "";
    var regiaoToFilter = document.getElementById('filter-regiao-checkbox').checked ? document
        .getElementById('filter-regiao').value : "";
    url += '?nome=' + nameToFilter;
    url += '&cargo=' + cargoToFilter;
    url += '&municipio=' + municipioToFilter;
    url += '&regiao=' + regiaoToFilter;
    const resp = await fetch(url);
    var myJson = await resp.json();
    var {
        Contatos
    } = myJson;
    atualizarTabela(Contatos);
};
getContatos();

const updateContato = async (event) => {
    event.preventDefault();
    var url = 'http://127.0.0.1:5000/contato/' + document.getElementById('edit-id').value;
    const resp = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                "id": document.getElementById('edit-id').value,
                "nome": document.getElementById('edit-nome').value,
                "cargo": document.getElementById('edit-cargo').value,
                "municipio": document.getElementById('edit-municipio').value,
                "regiao": document.getElementById('edit-regiao').value,
                "email": document.getElementById('edit-email').value,
                "numero": document.getElementById('edit-numero').value
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    getContatos();
};

const createContato = async (event) => {
    event.preventDefault();
    var url = 'http://127.0.0.1:5000/contatos';
    const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "nome": document.getElementById('create-nome').value,
                "cargo": document.getElementById('create-cargo').value,
                "municipio": document.getElementById('create-municipio').value,
                "regiao": document.getElementById('create-regiao').value,
                "email": document.getElementById('create-email').value,
                "numero": document.getElementById('create-numero').value
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    getContatos();
};

const deleteContato = async (id) => {
    var url = 'http://127.0.0.1:5000/contato/' + id;
    const resp = await fetch(url, {
        method: 'DELETE'
    });
    getContatos();
};

const popUpdateContatoModal = async (id) => {
    var url = 'http://127.0.0.1:5000/contato/' + id;
    const resp = await fetch(url, {
        method: 'GET'
    })
    var contato = await resp.json();
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-nome').value = contato['nome'];
    document.getElementById('edit-cargo').value = contato['cargo'];
    var regiaoFormatted = CaptalizeText(contato['regiao']);
    document.getElementById('edit-regiao').value = regiaoFormatted;
    mudarMunicipios(regiaoFormatted, 'edit-municipio');
    var municipioFormatted = CaptalizeText(contato['municipio']);
    document.getElementById('edit-municipio').value = municipioFormatted;
    document.getElementById('edit-email').value = contato['email'];
    document.getElementById('edit-numero').value = contato['numero'];
    console.log(document.getElementById('edit-municipio').value);
};

const limparTabela = () => {
    var table = document.getElementById('table-contatos');
    var child = table.lastElementChild;
    while (child && (child.id !== 'table-contatos-filter' && child.id !== 'table-contatos-header')) {
        table.removeChild(child);
        child = table.lastElementChild;
    }
}

const copiarTexto = (clicked) => {
    navigator.clipboard.writeText(clicked.innerText);
}

const copiarTodosEmails = () => {
    var resultado = "";
    for (var email of document.getElementsByName('contato-email')) {
        resultado += email.innerText + ';';
    };
    if (resultado.length > 0) {
        navigator.clipboard.writeText(resultado);
    };
}

const atualizarTabela = (contatos) => {
    limparTabela();
    var table = document.getElementById('table-contatos');
    contatos.forEach(contato => {
        var nameth = document.createElement('th');
        var cargotd = document.createElement('td');
        var municipiotd = document.createElement('td');
        var regiaotd = document.createElement('td');
        var emailtd = document.createElement('td');
        var emailtddiv = document.createElement('div');
        emailtddiv.classList.add('interactable');
        var emailspan = document.createElement('span');
        emailspan.classList.add('interactable-text');
        emailtd.setAttribute('name', "contato-email");
        var numerotd = document.createElement('td');

        var deleteIcon = document.createElement('span');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'icon-spacing', 'delete-icon');
        deleteIcon.addEventListener('click', () => deleteContato(contato.id));
        var editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit', 'icon-spacing', 'edit-icon');
        editIcon.addEventListener('click', () => popUpdateContatoModal(contato.id));
        editIcon.setAttribute('data-toggle', 'modal');
        editIcon.setAttribute('data-target', '#modalEditContato');
        var nameTxt = document.createTextNode(contato.nome);
        var cargoTxt = document.createTextNode(contato.cargo);
        var municipioTxt = document.createTextNode(contato.municipio);
        var regiaoTxt = document.createTextNode(contato.regiao);
        var emailTxt = document.createTextNode(contato.email);
        var numeroTxt = document.createTextNode(contato.numero);
        var spanTxt = document.createTextNode('Clique para copiar esse e-mail.');

        nameth.appendChild(deleteIcon);
        nameth.appendChild(editIcon);
        nameth.appendChild(nameTxt);
        cargotd.appendChild(cargoTxt);
        municipiotd.appendChild(municipioTxt);
        regiaotd.appendChild(regiaoTxt);
        emailtddiv.appendChild(emailTxt);
        emailspan.appendChild(spanTxt);
        emailtddiv.appendChild(emailspan);
        emailtd.appendChild(emailtddiv);
        emailtd.classList.add('email-hover');
        emailtd.addEventListener('click', () => copiarTexto(emailtd));
        numerotd.appendChild(numeroTxt);

        var newtr = document.createElement('tr');
        newtr.appendChild(nameth);
        newtr.appendChild(cargotd);
        newtr.appendChild(municipiotd);
        newtr.appendChild(regiaotd);
        newtr.appendChild(emailtd);
        newtr.appendChild(numerotd);

        var newtbody = document.createElement('tbody');
        newtbody.appendChild(newtr);

        table.appendChild(newtbody);
    });
};

function clearModal() {
    document.getElementById('create-nome').value = '';
    document.getElementById('create-cargo').value = '';
    document.getElementById('create-email').value = '';
    document.getElementById('create-numero').value = '';
    document.getElementById('create-municipio').value = '';
    document.getElementById('create-regiao').value = '';
};

function CaptalizeText(text) {
    var formattedText = text.toLowerCase().split(' ');
    for (let i = 0; i < formattedText.length; i++) {
        formattedText[i] = formattedText[i][0].toUpperCase() + formattedText[i].substr(1);
    }
    return formattedText.join(' ');
};
let series = [];
const seriesList = document.getElementById('seriesList');
const serieForm = document.getElementById('serieForm');
const formTitle = document.getElementById('formTitle');
const jsonOutput = document.getElementById('jsonOutput');
const search = document.getElementById('search');
const clearSearch = document.getElementById('clearSearch');
const cancelEdit = document.getElementById('cancelEdit');

// Carregar JSON inicial
fetch('series.json')
  .then(res => res.json())
  .then(data => {
    series = data;
    renderSeries();
    updateJSON();
  });

// Renderizar lista de séries
function renderSeries(filter = '') {
  seriesList.innerHTML = '';
  let filtered = series.filter(s => s.nome.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(serie => {
    const card = document.createElement('div');
    card.className = 'serie-card';
    card.innerHTML = `
      <strong>${serie.nome}</strong> (${serie.ano})<br>
      <em>Criador:</em> ${serie.criador}<br>
      <em>Gênero:</em> ${serie.genero}<br>
      <em>Sinopse:</em> ${serie.sinopse}<br>
      <em>Temporadas:</em> ${serie.temporadas}
      <div class="serie-actions">
        <button onclick="editSerie(${serie.id})">Editar</button>
        <button onclick="deleteSerie(${serie.id})">Excluir</button>
      </div>
    `;
    seriesList.appendChild(card);
  });
  updateJSON();
}

// Atualizar JSON exibido
function updateJSON() {
  jsonOutput.textContent = JSON.stringify(series, null, 2);
}

// Buscar por nome
search.addEventListener('input', () => {
  renderSeries(search.value);
});
clearSearch.addEventListener('click', () => {
  search.value = '';
  renderSeries();
});

// Adicionar/Editar série
serieForm.onsubmit = function(e) {
  e.preventDefault();
  const id = document.getElementById('serieId').value;
  const novaSerie = {
    id: id ? Number(id) : (series.length ? Math.max(...series.map(s => s.id)) + 1 : 1),
    nome: document.getElementById('nome').value,
    criador: document.getElementById('criador').value,
    ano: Number(document.getElementById('ano').value),
    genero: document.getElementById('genero').value,
    sinopse: document.getElementById('sinopse').value,
    temporadas: Number(document.getElementById('temporadas').value)
  };
  if (id) {
    // Editar
    const idx = series.findIndex(s => s.id === Number(id));
    series[idx] = novaSerie;
    formTitle.textContent = 'Adicionar Série';
    cancelEdit.style.display = 'none';
  } else {
    // Adicionar
    series.push(novaSerie);
  }
  serieForm.reset();
  document.getElementById('serieId').value = '';
  renderSeries(search.value);
};

// Editar série
window.editSerie = function(id) {
  const serie = series.find(s => s.id === id);
  document.getElementById('serieId').value = serie.id;
  document.getElementById('nome').value = serie.nome;
  document.getElementById('criador').value = serie.criador;
  document.getElementById('ano').value = serie.ano;
  document.getElementById('genero').value = serie.genero;
  document.getElementById('sinopse').value = serie.sinopse;
  document.getElementById('temporadas').value = serie.temporadas;
  formTitle.textContent = 'Editar Série';
  cancelEdit.style.display = 'inline-block';
};

// Excluir série
window.deleteSerie = function(id) {
  if (confirm('Excluir esta série?')) {
    series = series.filter(s => s.id !== id);
    renderSeries(search.value);
  }
};

// Cancelar edição
cancelEdit.onclick = function() {
  serieForm.reset();
  document.getElementById('serieId').value = '';
  formTitle.textContent = 'Adicionar Série';
  cancelEdit.style.display = 'none';
};
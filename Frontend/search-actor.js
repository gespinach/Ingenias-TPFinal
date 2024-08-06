document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      const actorName = document.getElementById('actor-name').value;
      fetch(`http://localhost:3000/trailerflix/actor/${actorName}`)
        .then(response => {return response.json();})
        .then(data => {renderSearchResults(data);})
        .catch(error => console.error('Error fetching data:', error));
    });
  });
  
  function renderSearchResults(results) {
    const container = document.getElementById('search-results');
  
    container.innerHTML = ''; // Borrar contenido anterior
  
    results.forEach(actorResult => {
      const actorSection = document.createElement('div');
      actorSection.className = 'actor-section';
  
      const actorTitle = document.createElement('h2');
      actorTitle.textContent = actorResult.actor;
      actorSection.appendChild(actorTitle);
  
      const itemsContainer = document.createElement('div');
      itemsContainer.className = 'items-container';
  
      actorResult.Items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
  
        const title = document.createElement('h3');
        title.textContent = item.titulo;
        card.appendChild(title);
  
        const summary = document.createElement('p');
        summary.textContent = item.resumen;
        card.appendChild(summary);
  
        const category = document.createElement('p');
        category.innerHTML = `<strong>Categoría:</strong> ${item.categoria}`;
        card.appendChild(category);
  
        const genre = document.createElement('p');
        genre.innerHTML = `<strong>Género:</strong> ${item.genero}`;
        card.appendChild(genre);
  
        const tags = document.createElement('p');
        tags.innerHTML = `<strong>Tags:</strong> ${item.tags.join(', ')}`;
        card.appendChild(tags);
        const actors = document.createElement('p');
        actors.innerHTML = `<strong>Actores:</strong> ${item.actores.join(', ')}`;
        card.appendChild(actors);
  
        const trailerLink = document.createElement('a');
        trailerLink.href = item.trailer;
        trailerLink.textContent = 'Ver trailer';
        trailerLink.target = '_blank';
        card.appendChild(trailerLink);
  
        itemsContainer.appendChild(card);
      });
  
      actorSection.appendChild(itemsContainer);
      container.appendChild(actorSection);
    });
  }
  
  
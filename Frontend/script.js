const RUTA_API = 'http://localhost:3000/trailerflix/'

document.addEventListener('DOMContentLoaded', () => {
    fetch(RUTA_API)
      .then(response => response.json())
      .then(data => {renderItems(data);})
      .catch(error => console.error('Error fetching data:', error));
  });

  document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const actor = document.getElementById('actor').value || "";
  
    if (document.getElementById('tipoBusqueda').value == 'actor'){
      fetch(RUTA_API + `actor/${actor}`)
      .then(response => response.json())
      .then(data => renderPorActor(data))
      .catch(error => console.error('Error fetching data:', error));
      return
    }
  
    const id = document.getElementById('id').value || "";
    const titulo = document.getElementById('titulo').value || "";
    const categoria = document.getElementById('categoria').value || "";
    const genero = document.getElementById('genero').value || "";
    const resumen = document.getElementById('resumen').value || "";
    const temporadas = document.getElementById('temporadas').value|| "";
    const tag = document.getElementById('tag').value || "";
    
    fetch(RUTA_API + `buscar?id=${id}&titulo=${titulo}&categoria=${categoria}&genero=${genero}&resumen=${resumen}&temporadas=${temporadas}&tag=${tag}&actor=${actor}`)
      .then(response => response.json())
      .then(data => renderItems(data))
      .catch(error => console.error('Error fetching data:', error));

  });
  
  function renderItems(items) {
    limpiarRender()
    const container = document.getElementById('items-container');
   
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';
  
      const title = document.createElement('h2');
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
  
      container.appendChild(card);
    });
  }
  


  function showSearchOptions(criterio) {
    document.getElementById('tipoBusqueda').value = criterio;

    const container = document.getElementById('items-container');
    container.innerHTML = ''; // Borrar el contenido anterior

    const inputs =  document.getElementsByClassName("opcionInput");
    Array.from(inputs).forEach (element => element.style.display = 'none')
    Array.from(inputs).forEach (element => element.value = '')
    document.getElementById('multiple-criteria').style.display = 'flex';

    switch (criterio) {
      case "multiple":
        Array.from(inputs).forEach (element => element.style.display = 'block')
        break;

        case "catalogo":
        Array.from(inputs).forEach (element => element.style.display = 'none')
        document.dispatchEvent(new Event('DOMContentLoaded'));
        break;

      default:
        document.getElementById(criterio).style.display = 'block';
        document.getElementById("botonBuscar").style.display = 'block';
        break;
    } 
    
}

function renderPorActor(results) {
  limpiarRender()
  const container = document.getElementById('search-results');
    
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
  

  function limpiarRender(){
    const container = document.getElementById('items-container');
    container.innerHTML = ''; // Borrar contenido anterior

    const container2 = document.getElementById('search-results');
    container2.innerHTML = ''; // Borrar contenido anterior
  }
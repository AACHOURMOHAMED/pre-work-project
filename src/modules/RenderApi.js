const RenderApi = async (data) => {
  const renderPeople = document.querySelector('.mainContent');
  // render Peaple form the api
  data.results.forEach((person) => {
    const personElement = document.createElement('div');
    personElement.classList.add('person');
    // CHECK IF THE PERSON HAS THE person elements in not null then render it

    // render films of peaple
    renderPeople.appendChild(personElement);
    // Add loading animation to the page
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    personElement.appendChild(loading);
    // Add loading logic to the page
    setTimeout(() => {
      loading.remove();
    }, 1000);
    // Add the person name to the page
    const personName = document.createElement('h2');
    personName.className = 'personName';
    personName.innerHTML = person.name;
    // Add the person height to the page
    const personHeight = document.createElement('p');
    personHeight.className = 'personHeight';
    personHeight.innerHTML = `Height: ${person.height}`;
    // Add the person mass to the page
    const personMass = document.createElement('p');
    personMass.className = 'personMass';
    personMass.innerHTML = `Mass: ${person.mass}`;
    // add the number of films to the person
    const personFilms = document.createElement('p');
    personFilms.className = 'personFilms';
    personFilms.innerHTML = `Films: ${person.films.length}`;
    // add the number of vehicles to the person
    const personVehicles = document.createElement('p');
    personVehicles.className = 'personVehicles';
    personVehicles.innerHTML = `Vehicles: ${person.vehicles.length}`;
    // add the number of starships to the person
    const personStarships = document.createElement('p');
    personStarships.className = 'personStarships';
    personStarships.innerHTML = `Starships: ${person.starships.length}`;
    // Add person element to the page
    const personInfo = document.createElement('div');
    personInfo.classList.add('personInfo');
    personInfo.appendChild(personName);
    personInfo.appendChild(personHeight);
    personInfo.appendChild(personMass);
    personInfo.appendChild(personFilms);
    personInfo.appendChild(personVehicles);
    personInfo.appendChild(personStarships);
    personElement.appendChild(personInfo);

    const { films } = person;
    films.forEach((film) => {
      const filmElement = document.createElement('div');
      filmElement.classList.add('film');
      // fetch films of the  carachter
      fetch(film)
        .then((res) => res.json())
        .then((data) => {
          filmElement.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.release_date}</p>
                    <p>${data.director}</p>
                    <p>${data.producer}</p>
                    `;
          // Add view film button to the page
          const viewFilm = document.createElement('button');
          viewFilm.classList.add('viewFilm');
          viewFilm.innerHTML = 'View Film';
          filmElement.appendChild(viewFilm);
          // add view film logic to the page
          viewFilm.addEventListener('click', () => {
            // open the film in a new model
            // fetch the film
            fetch(film)
              .then((res) => res.json())
              .then((data) => {
                // open the film in a new model
                // add loading animation to the film  model
                const loading = document.createElement('div');
                loading.classList.add('loading');
                loading.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
                filmElement.appendChild(loading);
                // add loading logic to the film  model
                setTimeout(() => {
                  loading.remove();
                }, 1000);
                // add the film to the film  model
                const filmModal = document.createElement('div');
                filmModal.classList.add('filmModal');
                filmModal.innerHTML = `
                        <div class="filmModalContent">
                        <h2 class="filmTitle">${data.title}</h2>
                        <p class="filmYear">${data.release_date}</p>
                        <p>${data.director}</p>
                        <p>${data.producer}</p>
                        <p>${data.opening_crawl}</p>
                        </div>
                        <div class="filmModalClose">
                        <button class="close">Close</button>
                        </div>
                    `;
                document.body.appendChild(filmModal);
                // add close button to the page
                const close = document.querySelector('.close');
                close.addEventListener('click', () => {
                  filmModal.remove();
                });
              });
          });
          // add see more films button to the page
          personElement.appendChild(filmElement);
        });
    });
  });
};

export default RenderApi;
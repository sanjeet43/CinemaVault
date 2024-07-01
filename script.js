const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to Fetch Movie Details using OMDB API
const getMovieInfo= async (movie) => {
    try {
        const myAPIKey = "5cc9e76f";
        const url= `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Unable to Fetch Movie Data.");
        }

        const data = await response.json();

        showMovieData(data);
    }
    catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
}

// Function to show Movie Data on Screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    // Use Destructuring Assignment to extract properties from data objects
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                            <p><strong>Duration: </strong>${Runtime}</p>
                            <p><strong>Cast: </strong>${Actors}</p>
                            <p><strong>Plot: </strong>${Plot}</p>`;

    // Creating a div for Movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// Function to display error message
const showErrorMessage = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
    movieContainer.classList.add('noBackground');
}

// Function to handle Form Submission
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== ''){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter Movie Name to get Movie Information");
    }
}

// Adding Event Listener to Search Form
searchForm.addEventListener('submit', handleFormSubmission);
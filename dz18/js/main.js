$(document).ready(function () {
   $('.search-form').on('submit', function (e) {
      e.preventDefault();
      let searchinput = $('#search-input').val();
      geyMovies(searchinput);
   });
});
function geyMovies(searchinput) {
   axios.get('http://www.omdbapi.com/?s=' + searchinput + '&apikey=2d62067').then((response) => 
   //axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=2d62067').then((response) =>
   {
      console.log(response);
      let movies = response.data.Search;
      console.log(movies);
      let output = '';
      $.each(movies, (index, movie) => {
         output += `
         <div class = "col-md-3">
         <div class = "well text-center">
         <img src = "${movie.Poster}">
         <h4>${movie.Title}</h4> 
        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Детальна інформація про фільм</a>
        </div>
         </div>
         `;
      });
      $('#movies').html(output);
   }).catch((err) => {
      console.log(err);
  });
}
function movieSelected(id) {
   console.log('OK');
   sessionStorage.setItem('movieID', id);
   window.location = 'movie.html';
   return false;
};
function getMovie() {
   let movieID = sessionStorage.getItem('movieID');
   axios.get('http://www.omdbapi.com/?i=' + movieID + '&apikey=2d62067').then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
         <div class = "row">
         <div class = "col-md-4">
         <img src = "${movie.Poster}" class="thumbnail">
         </div>
         <div class="col-md-8">
         <h2>${movie.Title}</h2> 
         <ul class="">
            <li class=" list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Жанр:</strong>${movie.Genre}</li>
            <li class="list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Реліз:</strong>${movie.Released}</li>
            <li class="list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Режисер:</strong>${movie.Directow}</li>
            <li class="list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Письменник:</strong>${movie.Writer}</li>
            <li class="list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Час:</strong>${movie.Runtime}</li>
            <li class="list-groupe-item d-flex justify-content-between align-items-center  text-info"><strong>Актори:</strong>${movie.Actors}</li>
         </ul>
        </div>
      </div >
      <div class="row">
      <div class="well">
      <h3>Сюжет</h3>
      <section class="text-info">${movie.Plot}</section>
      <hr>
      <a href="https://www.imdb.com/title/${movieID}" target="_blank" class="btn btn-outline-primary mb-3">Показати на imdb.com</a>
      </div>
      </div>
      `;
      $('#movie').html(output);
   }).catch((err) => {
      console.log(err);
  });
}

import React from "react";
import RecipeReviewCard from "./Card";
import axios from "axios";
import "./../App.css";
import Grid from "@material-ui/core/Grid";

const Mmovies = () => {
  const [movies, setState] = React.useState([]);
  React.useEffect(async () => {
    // Update the document title using the browser API
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a748adf1e91c666693b3a7ec038cce7d&language=en-US&page=%24%7B1`
    );
    let data = resp.data;
    setState({
      movies: [...data.results],
    });
  });
  return movies.movies == undefined || movies.movies.length == 0 ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <Grid
      container
      spacing={2}
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {movies.movies.map((obj) => (
        <>
          <Grid item xs={12} sm={3}>
            <div className="movie-list">
              <RecipeReviewCard
                title={obj.title}
                imglink={obj.backdrop_path}
                rating={obj.vote_average}
                movie = {obj}
              />
            </div>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default Mmovies;

//     <Item>xs=8</Item>
//   </Grid>
//   <Grid item xs={4}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={4}>
//     <Item>xs=4</Item>
//   </Grid>
//   <Grid item xs={8}>
//     <Item>xs=8</Item>
//   </Grid>
// </Grid>

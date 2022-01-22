import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./../App.css";
import Grid from "@material-ui/core/Grid";
import { SignalCellularNullSharp } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";

export default function RecipeReviewCard(props) {
  var oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
  var oldId = JSON.parse(localStorage.getItem("movies-id") || "[]");
  const [favourites, setFavourites] = React.useState(oldData);
  const [favid, setFavID] = React.useState(oldId);
  const movie = props.movie;
  const handleFavourites = (movie) => {
    console.log(favourites, movie);
    console.log(favid);
    // if(favid != null  && favid.includes(movie.id))
    // if(Object.keys(favourites).includes(movie.id)){
    //     console.log("inside if",movie.title);
    // oldData = oldData.filter((m)=>m.id!=movie.id)
    for (let i = 0; i <= favourites.length; i++) {
      if (
        (favourites.length != 0 && favourites[i].id != movie.id) ||
        favourites.length == 0
      ) {
        console.log("inside else");
        oldData.push(movie);
        oldId.push(movie.id);
        setFavID([...oldId]);
        handleFavouritesState();
        localStorage.setItem("movies-app", JSON.stringify(oldData));
        localStorage.setItem("movies-id", JSON.stringify(oldId));
      }
      break;
    }

  };
  const handleFavouritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie) => movie.id);
    console.log("me data hu", temp, [...temp]);
    setFavourites({
      favourites: [...temp],
    });
    // setFavID({
    //   favid:[...movie.id]
    // })
  };

  return (
    <Card>
      <CardHeader
        style={{
          fontSize: "1.2rem !important",
          fontWeight: "bold",
          overflow: "hidden !important",
          whiteSpace: "nowrap !important",
          textOverflow: "ellipsis !important",
        }}
        title={props.title}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image={props.imglink}
        alt="Paella dish"
      /> */}
      <CardContent>
        <img
          className="movies-img"
          src={`https://image.tmdb.org/t/p/original${props.imglink}`}
          alt=""
          srcset=""
        />
      </CardContent>
      <CardActions disableSpacing>
        <Grid
          container
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={2}>
            <IconButton aria-label="add to favorites">
              {/*  */}
              {/* {console.log(favourites.length!==0 && favourites.includes(movie.id))} */}
              {/* color={favid.length!= 0 && favid.includes(movie.id)?"primary":"secondary"} */}
              <FavoriteIcon
                onClick={() => handleFavourites(movie)}
                color={
                  oldId.length != 0 && oldId.includes(movie.id)
                    ? "secondary"
                    : "action"
                }
              />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <div>IMDB: {props.rating}</div>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

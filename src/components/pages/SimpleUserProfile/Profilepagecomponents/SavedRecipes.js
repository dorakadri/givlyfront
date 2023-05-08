import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function SavedRecipes() {
   
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [expanded, setExpanded] = useState({});
    const store = useSelector((state) => state?.users);
    const id = store.userAuth._id;

    const handleExpandClick = (recipeId) => {
      setExpanded((prevExpanded) => ({
        ...prevExpanded,
        [recipeId]: !prevExpanded[recipeId],
      }));
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
              const { data } = await axios.get('https://givly-api.onrender.com/api/recette/'+id);
              setSavedRecipes(data);
              setExpanded(data.reduce((obj, recipe) => ({...obj, [recipe._id]: false}), {}));
            } catch (error) {
              console.log(error);
            }
          };
          fetchRecipes();
    }, []);

    return (
        <div>
            <Grid container sx={{padding:"1rem  1rem",m:"0px"}}>
            {savedRecipes.map((recipe) => (
                <Grid key={recipe._id} item xs={12} md={4} xl={4} style={{padding:"1rem  1rem"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader title={<Typography>{recipe.title}</Typography>} />
                        <CardMedia component="img" height="194" image={recipe.image} alt="Paella dish" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {recipe.instructions}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <ExpandMore
                                expand={expanded[recipe._id]}
                                onClick={() => handleExpandClick(recipe._id)}
                                aria-expanded={expanded[recipe._id]}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded[recipe._id]} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Ingredients:</Typography>
                                <Typography variant="body1" py="2rem">
                                  
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                   
                                </Typography>
                                <Typography paragraph>Instructions:</Typography>
                                <Typography paragraph>{recipe.instructions}</Typography>
                                <Typography>Enjoy</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </div>
    );
}


export default SavedRecipes;

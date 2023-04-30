import React, { useState } from "react";



import { ArrowBack } from "@material-ui/icons";
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Favorite } from "@material-ui/icons";

const ingredients = [
  {
    name: "flour",
    imageUrl:
      "https://www.aldi.us/fileadmin/_processed_/6/7/csm_product-detail-3041-all-purpose-flour_d6950de9c1.jpg",
  },
  {
    name: "sugar",
    imageUrl:
      "https://www.bda.uk.com/uploads/assets/70418ecd-06b4-4db2-9c665a93618c7a8c/sugar.jpg",
  },
  {
    name: "eggs",
    imageUrl:
      "https://img.taste.com.au/F0W1xU4i/taste/2018/02/cls0318eggss_eggs-135792-1.jpg",
  },
  {
    name: "milk",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg",
  },
  {
    name: "butter",
    imageUrl:
      "https://images.unsplash.com/photo-1603596310923-dbb12732f9c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpg",
  },
  {
    name: "pepper",
    imageUrl:
      "https://images.unsplash.com/photo-1526346698789-22fd84314424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpg",
  },
  {
    name: "salt",
    imageUrl:
      "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80.jpg",
  },
  {
    name: "garlic",
    imageUrl:
      "https://images.unsplash.com/photo-1559454473-27bc85c67728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80.jpg",
  },
  {
    name: "onions",
    imageUrl:
      "https://images.unsplash.com/photo-1507633698035-8e4bd1573e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80.jpg",
  },
  {
    name: "tomatoes",
    imageUrl:
      "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpg",
  },
  {
    name: "potatoes",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80.jpg",
  },
  {
    name: "carrots",
    imageUrl:
      "https://images.unsplash.com/photo-1633380110125-f6e685676160?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80.jpg",
  },

  /*
    'lettuce',
    'spinach',
    'chicken',
    'beef',
    'fish',
    'shrimp',
    'rice',
    'pasta',
    'bread',
    'cheese',
    'yogurt',
    'avocado',
    'lemon',
    'lime',
    'orange',
    'apple',
    'banana',
    'berries',
    'nuts',
    'seeds',
    'chocolate',
    'honey',
    'vinegar',
    'oil',*/
];

const generateRecipe = async (selectedIngredients) => {
  /*
        const apiKey = '7b3451f3f4fe4456a56e8027052142ee';
    */
  /*
    const apiKey = 'effc308437ef49d1b1d6a8a3374872f7';
*/
  const apiKey = "16b0d3c4373e49b9ab1709c8322243b9";
  const ingredientsString = selectedIngredients.join(",");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsString}&number=3&ranking=2&ignorePantry=true&diet=low-fat&health=vegetarian`;

  try {
    const response = await fetch(url);
    const recipes = await response.json();

    if (recipes.length === 0) {
      throw new Error("No recipes found.");
    }

    const recipePromises = recipes.map(async (recipe) => {
      const recipeUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}&includeNutrition=true&addRecipeInformation=true`;
      const recipeResponse = await fetch(recipeUrl);
      const recipeData = await recipeResponse.json();
      return {
        title: recipeData.title,
        ingredients: recipeData.extendedIngredients.map(
          (ingredient) => ingredient.original
        ),
        instructions: recipeData.instructions.replace(/<[^>]*>/g, ""),
        calories: recipeData.nutrition.nutrients.find(
          (nutrient) => nutrient.name === "Calories"
        ).amount,
        image: recipeData.image,
      };
    });
    const recipeData = await Promise.all(recipePromises);
    return recipeData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const KitchenSink = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const handleBackClick = () => {
    setRecipe(null);
  };
  const handleCheckboxChange = (event) => {
    const { value } = event.target;

    if (selectedIngredients.includes(value)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== value));
    } else {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };

  const handleGenerateClick = async () => {
    const recipeData = await generateRecipe(selectedIngredients);
    setRecipe(recipeData);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        opacity: 0.9,
      }}
    >
      <Grid container spacing={2} >
        {!recipe && (
          <div>
            <Grid item xs={12} >
              <Typography variant="h3"  pb={"1rem"}       textAlign= 'center'  >
                Select ingredients
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {ingredients.map((ingredient) => (
                  <div key={ingredient.name} style={{ margin: "10px" }}>
                    <FormControlLabel
                      key={ingredient.name}
                      control={
                        <Checkbox
                          checked={selectedIngredients.includes(
                            ingredient.name
                          )}
                          onChange={handleCheckboxChange}
                          value={ingredient.name}
                        />
                      }
                      label={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={ingredient.imageUrl}
                            alt={ingredient.name}
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "contain",
                              marginBottom: "10px",
                            }}
                          />
                          <Typography variant="body1">
                            {ingredient.name}
                          </Typography>
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}  pt={"1rem"}       textAlign= 'center'  >
              <Button
         
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
              >
                Generate Recipe
              </Button>
            </Grid>
          </div>
        )}
        <Grid item xs={12}>
          {recipe && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage:
                  "url('https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                justifyContent: "center",
                padding: 20,
                opacity: 0.9,
              }}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  backgroundColor: "white",
                  zIndex: 10,
                }}
                onClick={handleBackClick}
              >
                <ArrowBack />
              </IconButton>
              <Grid
                container
                spacing={2}
                style={{
                  backgroundColor: "rgba(245, 245, 245, 0.0)",
                  padding: "20px",
                }}
              >
                {recipe.map((r, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={r.title}
                    style={{ backgroundColor: "rgba(245, 245, 245, 0.6)" }}
                  >
                    <Paper
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(245, 245, 245, 0.6)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <div>
                          <Typography
                            variant="h4"
                            style={{ margin: "10px" }}
                          >{`Recipe ${index + 1}`}</Typography>
                          <Typography variant="h5" style={{ margin: "10px" }}>
                            {r.title}
                          </Typography>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography
                              variant="h6"
                              style={{
                                marginRight: "10px",
                                marginLeft: "14px",
                              }}
                            >
                              Calories:
                            </Typography>
                            <div>
                              <Typography
                                variant="body1"
                                style={{ margin: "10px 0" }}
                              >
                                <span style={{ marginRight: "5px" }}>
                                  {r.calories}
                                </span>
                                <Typography
                                  variant="body1"
                                  style={{ display: "inline" }}
                                >
                                  calories
                                </Typography>
                              </Typography>
                            </div>
                          </div>
                          <Typography
                            variant="h6"
                            style={{ marginRight: "71%" }}
                          >
                            Ingredients:
                          </Typography>
                          <div>
                            <Typography
                              align="right"
                              variant="body1"
                              style={{ margin: "10px 0", display: "inline" }}
                            >
                              <span style={{ marginRight: "5px" }}>
                                {r.ingredients}
                              </span>
                            </Typography>
                          </div>
                          <Typography
                            variant="h6"
                            style={{ marginRight: "71%" }}
                          >
                            Instructions:
                          </Typography>
                          <div>
                            <Typography
                              align="right"
                              variant="body1"
                              style={{ margin: "10px 0", display: "inline" }}
                            >
                              <span style={{ marginRight: "5px" }}>
                                {r.instructions}
                              </span>
                            </Typography>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            height: "100%",
                          }}
                        >
                          <img
                            src={r.image}
                            alt={r.title}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                      {/*<Button variant="contained" color="primary" style={{ margin: '10px' }}>Save Recipe</Button>*/}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default KitchenSink;

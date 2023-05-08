import React, { Component, useState } from "react";
import ImageLinkForm from "./ImageLinkForm";
import KitchenSink from "./Recipe";
import { Box, Grid, Typography } from "@mui/material";

const Ingred = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(true);

  const setVisibility = (value) => {
    setVisible(value);
  };
  const onFileChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  };

  const onChangeEvent = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        fetch(
          "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
          {
            method: "POST",
            headers: {
              Authorization: `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: [
                {
                  data: {
                    image: {
                      base64: reader.result.split(",")[1],
                    },
                  },
                },
              ],
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (
              data &&
              data.outputs &&
              data.outputs[0].data &&
              data.outputs[0].data.concepts
            ) {
              setFoods(data.outputs[0].data.concepts);
            }
          })
          .catch((err) => {
            setError("Sorry! Please upload a valid image");
          });
      };
    } else {
      fetch(
        "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
        {
          method: "POST",
          headers: {
            Authorization: `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: [
              {
                data: {
                  image: {
                    url: input,
                  },
                },
              },
            ],
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            data &&
            data.outputs &&
            data.outputs[0].data &&
            data.outputs[0].data.concepts
          ) {
            setFoods(data.outputs[0].data.concepts);
          }
        })
        .catch((err) => {
          setError("Sorry! Please enter a valid url");
        });
      setInput("");
    }
  };

  return (
    <div
      style={{
        width: "100%",
     
      }}
    >
      {visible && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"2rem"}
        >
          <Typography variant="h2" align="center">
            What's in your fridge?
          </Typography>

          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={"2rem"}
            alignItems={"center"}
          >
            <ImageLinkForm
              input={input}
              imageUrl={imageUrl}
              error={error}
              onFileChange={onFileChange}
              onChangeEvent={onChangeEvent}
              onSubmit={onSubmit}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="fdf"
                style={{ width: "300px", height: "300px" }}
              />
            )}
          </Box>
        </Box>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <KitchenSink foods={foods} setVisibility={setVisibility}  />
        </Grid>
      </Grid>
    </div>
  );
};
export default Ingred;

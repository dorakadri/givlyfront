import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';

const API = 'AIzaSyDRtE2Ucd-rYjUs1JLJ1lbC6Bjos9-SY2s';
const PLAYLIST_ID = 'PL95XJdXMnRSCHRwtYDL0wrGPqHlY-6Ovo';
const RESULT_COUNT = 20;

class Youtube extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchVideos();
    }

    fetchVideos = () => {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${RESULT_COUNT}&playlistId=${PLAYLIST_ID}&key=${API}`;

        this.setState({ isLoading: true });

        fetch(url)
            .then((response) => response.json()  )

            .then((data) => {
                this.setState({ videos: data.items, isLoading: false });
            })
            .catch((error) => {
                this.setState({ error: error, isLoading: false });
            });

           
    };

    render() {
        const { isLoading, videos, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }
   
        return (
            <Grid container spacing={3} p={"3rem"} >
            {videos.map((video, index) => (
              <Grid item key={video.id} xs={12} sm={4} md={4} lg={3} xl={4}>
                <Box sx={{ width: '100%',textAlign: 'center' }} >
                  <Box sx={{ pr: 2 }}>
                    <a       href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}  target="_blank" rel="noopener noreferrer">
                    <img
                      style={{ width: '100%', height: 'auto' }}
                      alt={video.snippet.title}
                      src={video.snippet.thumbnails.medium.url}
                 
                    />
                    </a>
                    <Typography gutterBottom py={2} >
                      {video.snippet.title}
                    </Typography>
                    <Typography display="block" variant="caption" color="text.secondary">
                      {video.snippet.description}
                    </Typography>
           
                      <Button
                        href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '5px',
                          alignSelf:"center"
                        }}
                      >
                        Watch on YouTube
                      </Button>
             
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          

      
        );
    }
}

export default Youtube;


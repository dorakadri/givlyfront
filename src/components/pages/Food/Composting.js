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
            .then((response) => response.json())
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
          

                <div style={{
                    backgroundImage: "url('https://rethinkwastenl.ca/wp-content/uploads/2022/01/5437-MMSB-ReThink_Web-Banners_Food-Waste_Desktop-copy-scaled.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
              width:"100%",
       


                }}>
                <h1>How to make homemade compost from your food waste</h1>
                <div className="video-list">
                    {videos.map((video) => (
                        <div key={video.id} className="video-item" style={{ display: 'inline-block', margin: '10px', width: '300px', height: '400px', boxShadow: '0px 0px 5px #888', overflow: 'hidden' }}>
                            <div className="video-thumbnail" style={{border : '2px solid #eee', borderRadius:'4px', overflow:'hidden' , opacity:'5' , cursor:'pointer'}}>
                                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            </div>
                            <div className="video-details" style={{ padding: '10px' }}>
                                <h2 style={{ margin: '0', fontSize: '18px', fontWeight : 'bold' , marginBottom : '0.5rem' , color : '333' }}>{video.snippet.title}</h2>
                                <p style={{ margin: '10px 0', fontSize: '14px' }}>{video.snippet.description}</p>
                                <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px', backgroundColor: '#f44336', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                                    Watch on YouTube
                                </a>
                            </div>

                        </div>

                    ))}
                </div>
            </div>
      
        );
    }
}

export default Youtube;



export const themeSettingsall = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
            //dark
            primary: {
                main: '#5d483f',
                contrastText: '#fff',
              },
              secondary: {
                main: '#c95d3d',
              },
              background: {
                default: '#f0f2f5',
                paper: '#fff',
              },
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)',
              },
              divider: 'rgba(0, 0, 0, 0.12)',
              action: {
                disabled: '#757575', 
              },
            }
          : {
            primary: {
                main: '#01a28f',
                contrastText:'#fff',
              },
              secondary: {
           main: '#329c9c',
             
              
              },
              background: {
                default: '#f0f2f5',
                paper: '#fff',
              },
            
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
              }
            
            }),
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: '#757575',
              },
              '&:hover fieldset': {
                borderColor: '#c95d3d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5d483f',
              },
            },
          },
        },
        MuiStandardInput: {
          styleOverrides: {
            root: {
              '& fieldset': {
                borderColor: '#757575',
              },
              '&:hover fieldset': {
                borderColor: '#c95d3d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5d483f',
              },
            },
          },
        },
      },
      
   
      typography:{
        fontFamily: [
          'Montserrat', 
          'sans-serif'
        ].join(','),
        body1: {
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 0.95,
        },h5: {
          fontSize: 11,
          fontWeight: 500,
        
          
          
        },
        h6: {
          fontSize: 16,

        },
        overline: {
          fontSize: "0.9rem",

        },
        caption: {
          fontWeight: 500,
          lineHeight: "18px",
          fontSize: 15,
        },h3: {
          fontSize: 22,
          fontWeight: 500,
  
        },subtitle1:{
          fontWeight: 400,
          fontSize: 16,
  
        },subtitle2:{
          fontWeight: 300,
          fontSize: "13px",
  
        },
        h4:{
          fontWeight: 600,
          fontSize: "20px",
    
          
        },
        text: {
          primary: "#000000",
  
          
        }
      
      },
      
    };
  };
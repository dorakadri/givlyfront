
export const tokensDark = {
    grey: {
      0: "#ffffff", 
      10: "#f6f6f6", 
      50: "#f0f0f0", 
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", 
    },

  

    primary: {
  
      100: "#d3d4de",
      200: "#a6a9be",
      300: "#7a7f9d",
      400: "#4d547d",
      500: "#21295c",
      600: "#191F45", 
      700: "#141937",
      800: "#0d1025",
      900: "#070812",
    },
    secondary: {
    
      50: "#3992ee",
      100: "#3992ee",
      200: "#3992ee",
      300: "#3992ee",
      400: "#3992ee",
      500: "#3992ee",
      600: "#3992ee",
      700: "#3992ee",
      800: "#3992ee",
      900: "#00000",
    },
  };
  

  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  

  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
             
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
                Text:"white"
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
                Text:tokensDark.grey[0],
                Title:"White"
                
              },
              neutral: {
                ...tokensDark.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default: "#161719",
                alt: "#1f2022",
                nav: "#1f2022",
              },
            }
          : {
              
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
                Text:"black"
              },
              secondary: {
                ...tokensLight.secondary,
                Text:tokensDark.grey[1000],
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
                Title:"grey"
              },
              neutral: {
                ...tokensLight.grey,
                main: tokensDark.grey[500],
              },
              background: {
                default:"rgba(245, 245, 245, 1)",
                alt:"linear-gradient(to top, #ece9e6, #ffffff)",
                nav: "linear-gradient(to top, #ece9e6, #ffffff)",
              },
            }),
      },
      typography: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 12,
        
        h1: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 40,
     
        },
        h2: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 32,
      
        },
        h3: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 40,
      
        },
        h4: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 20,
          fontWeight: 700
          
        },
        h5: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 16,
       
        },
        h6: {
          fontFamily: ["Roboto", "sans-serif"].join(","),
          fontSize: 14,
          
        },
      },
    };
  };
import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html::-webkit-scrollbar {
  width: 10px;
}

/* Track */
html::-webkit-scrollbar-track {
  background: #f1f1f1;
  box-shadow: inset 0 0 2px grey;
}

/* Handle */
html::-webkit-scrollbar-thumb {
  background: hsl(0deg 0% 10% / 20%);
  border-radius: 0.3rem;
}

/* Handle on hover */
html::-webkit-scrollbar-thumb:hover {
  background: hsl(0deg 0% 10% / 40%);
}
body {
  height: 100vh;
  user-select: none;
}

#root {
  height: 100%;
}

ul {
  list-style: none;
}

`;

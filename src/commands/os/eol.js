import os from 'os';

export const eol = () => {
  const eolSymbol = JSON.stringify(os.EOL); 
  console.log(eolSymbol);
};

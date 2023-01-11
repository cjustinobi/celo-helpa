export const pascalToWord = pascal => {
  const result = pascal.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);

}
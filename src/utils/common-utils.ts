export const upperCaseFirstChart = (text: string) => {
  const textLowerCase = text.toLowerCase();
  return textLowerCase.charAt(0).toUpperCase() + textLowerCase.slice(1);
};

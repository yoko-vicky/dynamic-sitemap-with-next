export const generateExcerpt = (text: string, maxLength = 80) => {
  const excerptText = text.slice(0, maxLength);
  return excerptText + '...';
};

export const getCopyright = (
  year: number = new Date().getFullYear(),
): string => {
  return `\u00A9 ${year}. Все права защищены.`;
};

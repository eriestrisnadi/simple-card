export function formatCurrency(num: number, separator: string = ",") {
  if (Number.isNaN(+num)) num = 0;

  const re = /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g;
  const result = `${num}`.replace(re, function (_, group1, group2) {
    return group2 || `${group1}${separator}`;
  });

  return result;
}

export default formatCurrency;

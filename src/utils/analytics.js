export const sumMetric = (arr = []) =>
    arr.reduce((total, item) => total + (item.y || 0), 0);

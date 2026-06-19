export const buildLinePath = (
  points: number[],
  xStart: number,
  xStep: number,
  yBase: number,
  yRange: number,
  min: number,
  max: number,
) => {
  const scaleY = (value: number) => yBase - ((value - min) / (max - min)) * yRange;

  return points
    .map((value, i) => {
      const x = xStart + i * xStep;
      const y = scaleY(value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

export const getChartPointY = (
  value: number,
  yBase: number,
  yRange: number,
  min: number,
  max: number,
) => yBase - ((value - min) / (max - min)) * yRange;

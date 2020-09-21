export const getSectionHeights = (
  viewPortHeight: number,
  sectionsCount: number,
  offset = 0
): number[] => {
  const heights = new Array(sectionsCount).fill(0);

  let remainingHeight = viewPortHeight - offset;
  let index = 0;
  while (remainingHeight > 0) {
    heights[index % sectionsCount] += 1;
    remainingHeight -= 1;
    index += 1;
  }

  return heights;
};

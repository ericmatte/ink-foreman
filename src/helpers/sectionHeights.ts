export const getSectionHeights = (
  viewPortHeight: number,
  sectionsCount: number,
  offset = 0,
  expandedSection: null | number
): number[] => {
  const heights = new Array(sectionsCount).fill(0);

  let remainingHeight = viewPortHeight - offset;
  let index = 0;
  while (
    remainingHeight > 0 &&
    (!expandedSection || heights[index % sectionsCount] <= 1)
  ) {
    heights[index % sectionsCount] += 1;
    remainingHeight -= 1;
    index += 1;
  }

  if (expandedSection) {
    heights[expandedSection] += remainingHeight;
  }

  return heights;
};

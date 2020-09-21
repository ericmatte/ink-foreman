export const getSectionHeights = (
  viewPortHeight: number,
  sectionsCount: number,
  offset = 0,
  expandedSectionIndex: null | number = null,
  collapsedSections: boolean[] = []
): number[] => {
  const heights = new Array(sectionsCount).fill(0);

  let remainingHeight = viewPortHeight - offset;
  let index = 0;
  while (remainingHeight > 0) {
    const i = index % sectionsCount;

    if (heights[i] > 1) {
      if (expandedSectionIndex !== null) {
        break;
      } else if (collapsedSections[i] === true) {
        index += 1;
        continue;
      }
    }

    heights[i] += 1;
    remainingHeight -= 1;
    index += 1;
  }

  if (expandedSectionIndex !== null) {
    heights[expandedSectionIndex] += remainingHeight;
  }

  return heights;
};

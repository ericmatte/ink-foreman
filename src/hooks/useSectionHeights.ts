import { useState, useEffect } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";

import { getSectionHeights } from "../helpers/sectionHeights";

export const useSectionHeights = (sectionsCount) => {
  const [heights, setHeights] = useState<number[]>([]);

  const [, rows] = useStdoutDimensions();
  useEffect(() => {
    setHeights(getSectionHeights(rows, sectionsCount, 1));
  }, [sectionsCount, rows]);

  return { heights };
};

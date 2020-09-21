import { useState, useEffect } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { useInput } from "ink";

import { getSectionHeights } from "../helpers/sectionHeights";

export const useHeights = (sectionsCount: number, focusedSection: number) => {
  const [heights, setHeights] = useState<number[]>([]);
  const [expandedSection, setExpandedSection] = useState<null | number>(null);

  const [, rows] = useStdoutDimensions();
  useEffect(() => {
    setHeights(getSectionHeights(rows, sectionsCount, 1, expandedSection));
  }, [sectionsCount, rows, expandedSection]);

  useInput((input, key) => {
    if (input === " ") {
      setExpandedSection((lastSection) =>
        lastSection === focusedSection ? null : focusedSection
      );
    } else if (key.return) {
      // Collapse
    }
  });

  return { heights };
};

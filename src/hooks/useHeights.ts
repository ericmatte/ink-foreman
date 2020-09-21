import { useState, useEffect } from "react";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { useInput } from "ink";

import { getSectionHeights } from "../helpers/sectionHeights";

export const useHeights = (sectionsCount: number, focusedSection: number) => {
  const [heights, setHeights] = useState<number[]>([]);
  const [expandedSection, setExpandedSection] = useState<null | number>(null);
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>(
    Array(sectionsCount).fill(false)
  );

  useEffect(() => {
    setCollapsedSections(Array(sectionsCount).fill(false));
  }, [sectionsCount]);

  const [, rows] = useStdoutDimensions();
  useEffect(() => {
    setHeights(
      getSectionHeights(
        rows,
        sectionsCount,
        1,
        expandedSection,
        collapsedSections
      )
    );
  }, [sectionsCount, rows, expandedSection, collapsedSections]);

  useInput((input, key) => {
    if (input === " ") {
      setExpandedSection((lastSection) =>
        lastSection === focusedSection ? null : focusedSection
      );
    } else if (key.return) {
      // Collapse
      setCollapsedSections((sections) => {
        sections[focusedSection] = !sections[focusedSection];
        if (sections.every((s) => s === true)) {
          // Revert actions; cannot collapse all sections
          sections[focusedSection] = false;
        }

        return [...sections];
      });
    }
  });

  return { heights };
};

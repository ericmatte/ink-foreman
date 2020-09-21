import test from "ava";

import { getSectionHeights } from "../src/helpers/sectionHeights";
type Input = { viewPort: number; sections: number };
type ExpectedOutput = number[];

const TEST_DATA: [Input, ExpectedOutput][] = [
  [{ viewPort: 5, sections: 5 }, [1, 1, 1, 1, 1]],
  [{ viewPort: 15, sections: 5 }, [3, 3, 3, 3, 3]],
  [{ viewPort: 7, sections: 5 }, [2, 2, 1, 1, 1]],
  [{ viewPort: 20, sections: 3 }, [7, 7, 6]],
  [{ viewPort: 100, sections: 1 }, [100]],
];

TEST_DATA.forEach(([input, expectedOutput]) => {
  test(`heights for ${input.sections} sections from viewPort of ${input.viewPort}`, (t) => {
    t.deepEqual(
      getSectionHeights(input.viewPort, input.sections),
      expectedOutput
    );
  });
});

import { describe, expect, it } from "vitest";
import sum from "./sum";

describe("this is temp test", () => {
  it("check correct sum", () => {
    expect(sum(2, 2)).toBe(4);
  });

  it("check uncorrect sum", () => {
    expect(sum(2, 2)).not.toBe(5);
  });
});

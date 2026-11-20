import { describe, expect, it } from "vitest";

import * as validation from "./index";

describe("validation", () => {
  it("charge le module partagé", () => {
    expect(validation).toBeTypeOf("object");
  });
});

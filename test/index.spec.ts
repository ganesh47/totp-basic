import {describe, it, expect} from "vitest";
import {hello} from "../src";

describe("test", async () => {
    it("should work", async () => {
        expect(hello()).toBe("Hello World!")
    })
})
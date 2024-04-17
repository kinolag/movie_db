import { loader } from "../routes/_index";

describe("Index Loader", () => {
  it("should return a response", async () => {
    const response = await loader({
      request: new Request("http://localhost:5173"),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
  });
});
import { defineTool } from "@lovable.dev/mcp-js";
import { TRACKS } from "../data";

export default defineTool({
  name: "list_tracks",
  title: "List hackathon tracks",
  description:
    "List the public problem-statement tracks / themes teams can build for at AVISHKAAR Season 4.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: TRACKS.map((t, i) => `${i + 1}. ${t}`).join("\n") }],
    structuredContent: { tracks: TRACKS },
  }),
});

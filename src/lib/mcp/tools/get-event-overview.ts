import { defineTool } from "@lovable.dev/mcp-js";
import { EVENT } from "../data";

export default defineTool({
  name: "get_event_overview",
  title: "Get event overview",
  description:
    "Get the public overview of the AVISHKAAR Season 4 hackathon: format, eligibility, team size, fee, prizes and the registration link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EVENT, null, 2) }],
    structuredContent: { event: EVENT },
  }),
});

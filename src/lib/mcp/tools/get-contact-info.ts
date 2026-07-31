import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACTS } from "../data";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Get the public contact details for the AVISHKAAR Season 4 organizing team: email, phone and venue.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACTS, null, 2) }],
    structuredContent: { contact: CONTACTS },
  }),
});

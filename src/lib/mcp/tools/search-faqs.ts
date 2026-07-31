import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { FAQS } from "../data";

export default defineTool({
  name: "search_faqs",
  title: "Search FAQs",
  description:
    "Search the public AVISHKAAR Season 4 FAQ. Omit the query to get every question and answer.",
  inputSchema: {
    query: z
      .string()
      .trim()
      .optional()
      .describe("Optional keyword to filter FAQ questions and answers."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.toLowerCase();
    const results = q
      ? FAQS.filter(
          (f) =>
            f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
        )
      : FAQS;
    const text = results.length
      ? results.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
      : `No FAQ entry matched "${query}".`;
    return { content: [{ type: "text", text }], structuredContent: { faqs: results } };
  },
});

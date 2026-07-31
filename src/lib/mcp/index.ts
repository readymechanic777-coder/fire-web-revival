import { defineMcp } from "@lovable.dev/mcp-js";
import getEventOverview from "./tools/get-event-overview";
import listTracks from "./tools/list-tracks";
import searchFaqs from "./tools/search-faqs";
import getContactInfo from "./tools/get-contact-info";

export default defineMcp({
  name: "fire-web-revival",
  title: "Fire Web Revival",
  version: "0.1.0",
  instructions:
    "Public tools for the AVISHKAAR Season 4 hackathon site. Use `get_event_overview` for dates, format, eligibility and registration, `list_tracks` for the problem-statement themes, `search_faqs` for participant questions, and `get_contact_info` for organizer contact details.",
  tools: [getEventOverview, listTracks, searchFaqs, getContactInfo],
});

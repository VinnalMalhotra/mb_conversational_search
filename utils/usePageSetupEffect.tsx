import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useChatActions, useChatState } from "@yext/chat-headless-react";
import { config } from "../pages";

export const usePageSetupEffect = (verticalKey?: string) => {
  const location = useRouter();
  const searchActions = useSearchActions();
  const chatActions = useChatActions();
  const totalMessages = useChatState(
    (state) => state.conversation.messages.length
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("query");
    if (verticalKey) {
      searchActions.setVertical(config.verticalKey);
      searchActions.setQuery(query || "");
      searchActions.executeVerticalQuery();
      if (query && totalMessages === 0) {
        chatActions.addMessage({
          source: "USER",
          text: query,
        });
      } else {
        searchActions.setUniversal();
        searchActions.setQuery(query || "");
        searchActions.executeUniversalQuery();
        if (query && totalMessages === 0) {
          chatActions.addMessage({
            source: "USER",
            text: query,
          });
        }
      }
    }
  }, [location, searchActions]);
};

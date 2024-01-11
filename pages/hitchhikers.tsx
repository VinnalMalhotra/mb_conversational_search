import { SearchBar, SpellCheck, onSearchFunc } from '@yext/search-ui-react';
import React, { useState } from 'react';
import {
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
  useSearchActions,
  useSearchState,
} from '@yext/search-headless-react';
import { fetchAnswer } from '../utils/fetchAnswer';
import { PageContextProvider } from '../utils/usePageContext';
import { testResults } from '../utils/testResults';
import { testAnswer } from '../utils/testAnswer';
import { usePageSetupEffect } from '../utils/usePageSetupEffect';
import ScrollToTopButton from '../components/ScrollButton';
import { AnimatePresence, motion } from 'framer-motion';
import { Bars } from 'react-loading-icons';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { BsArrowLeft } from 'react-icons/bs';
import { ChatPanel } from '@yext/chat-ui-react';
import {
  ChatConfig,
  ChatHeadlessProvider,
  useChatActions,
  useChatState,
} from '@yext/chat-headless-react';
import GenerativeAnswerWrapperHH from '../components/hitchhikers/GenerativeAnswerWrapperHH';
import SearchResultsHH from '../components/hitchhikers/SearchResultsHH';

const config: HeadlessConfig = {
  apiKey: '01db1d1e5ebbaa7ea2e6807ad2196ab3',
  experienceKey: 'yext-help-hitchhikers-vector-search',
  locale: 'en',
  verticalKey: 'content',
};

const chatConfig: ChatConfig = {
  apiKey: '3f787a8ed5b5092b61932982f6837316',
  botId: 'hitchhikers-chat',
};

export default function Hitchhikers(): JSX.Element {
  const searcher = provideHeadless(config);
  return (
    <ChatHeadlessProvider config={chatConfig}>
      <SearchHeadlessProvider searcher={searcher}>
        <Inner />
      </SearchHeadlessProvider>
    </ChatHeadlessProvider>
  );
}

function Inner(): JSX.Element {
  const searchActions = useSearchActions();
  const verticalResults = useSearchState((state) => state.vertical.results);
  const currentQuery = useSearchState((state) => state.query.mostRecentSearch);
  // const verticalResults = testResults;
  // const currentQuery = 'Who is Albus Dumbledore?';
  const [generatingAnswer, setGeneratingAnswer] = React.useState(false);
  const [answer, setAnswer] = React.useState();
  const [selectedCitation, setSelectedCitation] = React.useState(null);
  const [chatMode, setChatMode] = useState(false);
  const chatActions = useChatActions();
  const totalMessages = useChatState(
    (state) => state.conversation.messages.length
  );
  usePageSetupEffect();

  const handleSearch: onSearchFunc = (searchEventData) => {
    setAnswer(undefined);
    chatActions.restartConversation();
    const { query } = searchEventData;
    searchActions.setQuery(query);
    searchActions.executeVerticalQuery();
    if (totalMessages === 0) {
      chatActions.addMessage({
        source: 'USER',
        text: query,
      });
    }
    const queryParams = new URLSearchParams(window.location.search);

    if (query) {
      queryParams.set('query', query);
    } else {
      queryParams.delete('query');
    }
    history.pushState(null, '', '?' + queryParams.toString());
  };

  React.useEffect(() => {
    if (
      verticalResults &&
      verticalResults.length > 0 &&
      generatingAnswer === false
    ) {
      const generateAnswer = async () => {
        setGeneratingAnswer(true);
        const generatedAnswer = await fetchAnswer(
          currentQuery,
          verticalResults
        );
        setAnswer(generatedAnswer);
        chatActions.addMessage({
          source: 'BOT',
          text: generatedAnswer,
        });
        setGeneratingAnswer(false);
      };
      generateAnswer().catch((error) => console.log('error', error));
    }
  }, [verticalResults]);

  return (
    <PageContextProvider
      value={{
        selectedCitation,
        setSelectedCitation,
        generatingAnswer,
        setGeneratingAnswer,
        chatMode,
        setChatMode,
      }}
    >
      <AnimatePresence>
        {!chatMode && (
          <>
            <motion.div
              key="search-ui"
              // initial={{ y: '-100vh' }}
              // animate={{ y: 0 }}
              exit={{ y: '-100vh' }}
              transition={{ duration: 0.3 }}
              className="flex justify-center py-6"
            >
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col">
                  <SearchBar
                    onSearch={handleSearch}
                    placeholder="Ask a question about Yext..."
                  />
                  <SpellCheck />
                </div>
                {currentQuery && (
                  <motion.div
                    layout
                    className="w-full flex flex-col bg-[#e3eefc] items-center"
                  >
                    <div className="max-w-3xl py-10 w-full">
                      {answer && !generatingAnswer && (
                        <GenerativeAnswerWrapperHH
                          results={verticalResults}
                          answer={answer}
                        />
                      )}
                      {generatingAnswer && (
                        <>
                          <div className="flex items-center gap-2 text-lg text-[#0a3366]">
                            <Bars
                              className="h-5 w-5"
                              fill="#0a3366"
                              speed={0.5}
                            />
                            <p>Generating Answer...</p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
                <div className="w-full flex flex-col max-w-3xl">
                  {/* {currentQuery && answer && !generatingAnswer && <Divider />} */}
                  <section className="flex flex-col">
                    {verticalResults &&
                      verticalResults.length > 0 &&
                      currentQuery && (
                        <>
                          <div className="mt-8 mb-0 py-0 flex gap-2 items-center">
                            <DocumentDuplicateIcon className="w-6 h-6" />
                            <h3 className="text-lg">Search Results</h3>
                          </div>
                          <SearchResultsHH results={verticalResults} />
                        </>
                      )}
                  </section>
                </div>
              </div>
            </motion.div>
            <ScrollToTopButton />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {chatMode && (
          <motion.div
            key="chat-panel"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.3 }}
            className="flex w-3/4 h-full absolute top-0 right-0 object-cover bg-white"
          >
            <div className="w-full h-full shrink-0 relative">
              <button
                className="z-50 absolute top-0 left-8 mt-4 mr-4 text-[#0a3366] bg-white shadow rounded-full px-4 py-2"
                onClick={() => {
                  setChatMode(false);
                }}
              >
                <BsArrowLeft className="inline-block w-4 h-4 mr-2 my-auto mx-auto text-[#0a3366]" />
                Back to Search
              </button>
              <ChatPanel
                customCssClasses={{
                  container: 'shadow-none my-0 w-full p-6',
                  messageBubbleCssClasses: {
                    bubble__user: 'bg-none bg-[#0a3366] py-0 px-4',
                    bubble__bot: 'bg-none bg-[#e3eefc] py-0',
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContextProvider>
  );
}

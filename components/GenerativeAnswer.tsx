import React from 'react';
import Markdown from 'markdown-to-jsx';
import { extractCitations } from '../utils/citations/extractCitations';
import { AnswerCitation } from './AnswerCitation';

const markDownCitations = (summary: string) => {
  const citations = extractCitations(summary);
  return citations
    .reduce((accum, { text, references }) => {
      if (references) {
        accum.push(text);

        const marginBefore = text ? text[text.length - 1] !== ' ' : false;
        if (marginBefore) {
          accum.push(' ');
        }

        references.forEach((reference, referenceIndex) => {
          if (referenceIndex > 0) {
            accum.push(' ');
          }

          accum.push(`<AnswerCitation reference={${reference}} />`);
        });
      } else {
        accum.push(text);
      }

      return accum;
    }, [] as string[])
    .join('');
};

type Props = {
  answer: string;
};

export default function GenerativeAnswer({ answer }: Props) {
  const markdown = markDownCitations(answer);

  return (
    <div dir="auto" className="markdown-reverts">
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            AnswerCitation: {
              component: AnswerCitation,
            },
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

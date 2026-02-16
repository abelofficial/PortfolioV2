import { StructuredText } from 'react-datocms/structured-text';
import { renderNodeRule } from 'react-datocms';
import {
  isCode,
  isHeading,
  isParagraph,
  isRoot,
} from 'datocms-structured-text-utils';
import CodeBlock from '@components/codeBlock';
import { LedgerContent as Content } from '@/types';

export interface LedgerContentProps {
  content: Content;
}
const LedgerContent = ({ content }: LedgerContentProps) => {
  return (
    <div className="flex min-h-[calc(100lvh-18rem)] flex-col gap-4 px-5 py-4">
      <article>
        <StructuredText
          data={content}
          customNodeRules={[
            renderNodeRule(isCode, ({ node, key }) => {
              return (
                <CodeBlock
                  key={key}
                  code={node.code}
                  language={node.language!}
                />
              );
            }),
            renderNodeRule(isParagraph, ({ children, key, ancestors }) => {
              if (isRoot(ancestors[0])) {
                return (
                  <p key={key} className="my-2 text-sm">
                    {children}
                  </p>
                );
              } else {
                return (
                  <p key={key} className="my-1 text-sm">
                    {children}
                  </p>
                );
              }
            }),
            renderNodeRule(isHeading, ({ node, children, key }) => {
              switch (node.level) {
                case 1:
                  return (
                    <h1 key={key} className="my-4 text-2xl font-bold">
                      {children}
                    </h1>
                  );
                case 2:
                  return (
                    <h2 key={key} className="my-3 text-xl font-bold">
                      {children}
                    </h2>
                  );
                case 3:
                  return (
                    <h3 key={key} className="my-2 text-lg font-semibold">
                      {children}
                    </h3>
                  );
                default:
                  return (
                    <p key={key} className="text-sm font-bold">
                      {children}
                    </p>
                  );
              }
            }),
          ]}
        />
      </article>
    </div>
  );
};
export default LedgerContent;

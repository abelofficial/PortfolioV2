import { ChatBoxInfo, FullChatBoxData } from '@/types';

/**
 * Derives the appropriate ChatBoxInfo based on the current pathname.
 * This function determines which set of questions to show in the chat
 * based on whether the user is on a specific ledger/summary page,
 * a list page, or the home page.
 */
export const getChatBoxInfoFromPath = (
  pathname: string,
  chatBoxData: FullChatBoxData
): ChatBoxInfo => {
  const {
    homePage,
    allTechnicalLedgers,
    technicalLedgersPage,
    bookSummaryPage,
    allBookSummaries,
  } = chatBoxData;

  // Base info from homePage.chatBox (hint, openButtonLabel, chatTitle, etc.)
  const baseInfo: ChatBoxInfo = {
    hint: homePage.chatBox.hint,
    openButtonLabel: homePage.chatBox.openButtonLabel,
    chatTitle: homePage.chatBox.chatTitle,
    chatInputPlaceholder: homePage.chatBox.chatInputPlaceholder,
    suggestionLabel: homePage.chatBox.suggestionLabel,
    questions: homePage.chatBox.questions,
  };

  // Path pattern: /{locale}/page-type/{slugId}
  const pathSegments = pathname.split('/').filter(Boolean);

  // Check for technical ledgers routes
  if (pathSegments.length >= 2 && pathSegments[1] === 'technical-ledgers') {
    // Specific technical ledger page (e.g., /en/technical-ledgers/my-slug)
    if (pathSegments.length >= 3) {
      const slugId = pathSegments[2];
      const ledger = allTechnicalLedgers.find((l) => l.slugId === slugId);
      if (ledger?.chatBox?.questions) {
        return {
          ...baseInfo,
          questions: ledger.chatBox.questions,
        };
      }
    }

    // Technical ledgers list page (e.g., /en/technical-ledgers)
    if (pathSegments.length === 2 && technicalLedgersPage?.chatBox?.questions) {
      return {
        ...baseInfo,
        questions: technicalLedgersPage.chatBox.questions,
      };
    }
  }

  // Check for book summaries routes
  if (pathSegments.length >= 2 && pathSegments[1] === 'book-summaries') {
    // Specific book summary page (e.g., /en/book-summaries/my-slug)
    if (pathSegments.length >= 3) {
      const slugId = pathSegments[2];
      const summary = allBookSummaries?.find((s) => s.slugId === slugId);
      if (summary?.chatBox?.questions) {
        return {
          ...baseInfo,
          questions: summary.chatBox.questions,
        };
      }
    }

    // Book summaries list page (e.g., /en/book-summaries)
    if (pathSegments.length === 2 && bookSummaryPage?.chatBox?.questions) {
      return {
        ...baseInfo,
        questions: bookSummaryPage.chatBox.questions,
      };
    }
  }

  // Default: home page questions
  return baseInfo;
};

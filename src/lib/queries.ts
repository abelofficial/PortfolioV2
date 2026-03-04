export const getCombinedQueryWithSlug = (queryBlocks: string[]) => `
    query GeneralQuery($locale: SiteLocale, $slug: String){
        ${queryBlocks.join('\n')}
    }
`;

export const getCombinedQuery = (queryBlocks: string[]) => `
    query GeneralQuery($locale: SiteLocale){
        ${queryBlocks.join('\n')}
    }
`;

export const getCombinedQueryWithoutLocalization = (queryBlocks: string[]) => `
    query GeneralQuery {
        ${queryBlocks.join('\n')}
    }
`;

export const siteMetaTagsQuery = `
    _site {
        faviconMetaTags {
            tag
            attributes
            content
        }
    }
`;

export const promptQuery = `
    prompt(locale: $locale) {
        coreRule
        safetyLimitations
        toneAndStyle
        formattingAndStructure
        contextualKnowledge
        rateLimitMessage
        rateLimitIpWhitelist
  }
`;

export const contactsQuery = `
    allContacts(locale: $locale) {
        title
        id
        address
        icon {
            url
            title
            responsiveImage(imgixParams: { fit: crop, w: 15, h: 15, auto: format }) {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
            }
        } 
    }
`;

export const fullChatBoxQuery = `
    homePage(locale: $locale) {
        chatBox{
            hint
            openButtonLabel
            chatTitle
            chatInputPlaceholder
            suggestionLabel
            questions{
                singleQuestion
            }
        }
    }
    allTechnicalLedgers(locale: $locale) {
        slugId
        chatBox{
            questions{
                singleQuestion
            }
        }
    }
    technicalLedgersPage(locale: $locale) {
        chatBox{
            questions{
                singleQuestion
            }
        }
    }
    bookSummaryPage(locale: $locale) {
        chatBox{
            questions{
                singleQuestion
            }
        }
    }
    allBookSummaries(locale: $locale) {
        slugId
        chatBox{
            questions{
                singleQuestion
            }
        }
        chapters{
            slugId
            chatBox{
                questions{
                    singleQuestion
                }
            }
        }
    }
`;

export const homePageQuery = `
    homePage(locale: $locale) {
        id
        name
        intro
        jobTitle
        workPlace
        connect
        workExperience
        education
        at
        totalContributionLabel
        openAiChatButton
        aiChatTitle
        suggestionLabel
        aiTypingIndicator
        techStackTitle
        footer
        footerTagline
        footerConnectLabel
        footerBuiltWithLabel
        chatInputPlaceholder
        avatar {
            url
            title
            responsiveImage(imgixParams: { fit: crop, w: 150, h: 150, auto: format }) {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
            }
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
    }     
`;

export const testimonialsQuery = `
    allTestimonials(locale: $locale) {
        id
        name
        text(markdown: false)
        workPlace
        workPosition
    }     
`;

export const footerQuery = `
    homePage(locale: $locale) {
        name
        footer
        footerTagline
        footerConnectLabel
        footerBuiltWithLabel
    }
`;

export const workExperienceQuery = `
    allWorks(locale: $locale) {
        id
        order
        content
        startDate
        endDate
        place
        title
        logo {
            responsiveImage(imgixParams: { fit: crop, w: 50, h: 50, auto: format }) {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
            }
        }
    }
`;

export const educationExperienceQuery = `
    allEducations(locale: $locale) {
        id
        order
        content
        startDate
        endDate
        place
        title
        logo {
            responsiveImage(imgixParams: { fit: crop, w: 50, h: 50, auto: format }) {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                src
                srcSet
                title
                webpSrcSet
                width
            }
        }
    }
`;

export const techStacksQuery = `
    allTechstacks(locale: $locale) {
        id
        icon {
            url
        }
        title
        name
    }
`;

export const allTechnicalLedgersQuery = `
    allTechnicalLedgers(locale: $locale) {
        id
        slugId
        title
        excerpt
        date
        category
        readMinutes
        tags {
            id
            tag
        }
        fullNote {
            value
        }
        promptNotes {
            id
            contextTitle
            contextContent
        }
        chatBox{
            hint
            openButtonLabel
            chatTitle
            chatInputPlaceholder
            suggestionLabel
            questions{
                singleQuestion
            }
        }
    }
`;

export const technicalLedgersQuery = `
     technicalLedger(locale: $locale, filter: {slugId: {eq: $slug}}) {
        id
        slugId
        title
        excerpt
        date
        category
        readMinutes
        tags {
          id
          tag
        }
        fullNote {
          value
        }
        chatBox{
            hint
            openButtonLabel
            chatTitle
            chatInputPlaceholder
            suggestionLabel
            questions{
                singleQuestion
            }
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
    }
`;

export const technicalLedgerPageQuery = `
    technicalLedgersPage(locale: $locale) {
        id
        title
        description
        explanation
        all
        selected
        results
        minRead
        backButtonLabel
        chatBox{
            hint
            openButtonLabel
            chatTitle
            chatInputPlaceholder
            suggestionLabel
            questions{
                singleQuestion
            }
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
    }
`;

export const bookSummariesPageQuery = `
    bookSummaryPage(locale: $locale) {
        id
        title
        description
        all
        backButtonLabel
        selected
        results
        inProgress
        finished
        notStarted
        chapters
        next
        intro
        previous
        of
        chatBox{
            hint
            openButtonLabel
            chatTitle
            chatInputPlaceholder
            suggestionLabel
            questions{
                singleQuestion
            }
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
    }
`;

export const allBookSummaries = `
    allBookSummaries(locale: $locale) {
        id
        slugId
        title
        author
        bookImage {
          responsiveImage(imgixParams: { fit: crop, w: 112, h: 200, auto: format }) {
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            src
            srcSet
            title
            webpSrcSet
            width
          }
        }
        category
        excerpt
        tags{
          id
          tag
        }
        chatBox{
          questions{
                    singleQuestion
                }
        }
        introduction{
          value
        }
        chapters{
          title
          slugId
          chapter
          isPublished
          content
        }
     }
`;

export const bookSummaryQuery = `
    bookSummary(locale: $locale, filter: {slugId: {eq: $slug}}) {
        id
        slugId
        title
        author
        bookImage {
          responsiveImage(imgixParams: { fit: crop, w: 200, h: 300, auto: format }) {
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            src
            srcSet
            title
            webpSrcSet
            width
          }
        }
        category
        excerpt
        tags{
          id
          tag
        }
        chatBox{
          questions{
            singleQuestion
          }
        }
        introduction{
          value
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
         chapters{
            title
            slugId
            chapter
            isPublished
            chatBox{
              questions{
                singleQuestion
              }
            }
            content
            _seoMetaTags {
              tag
              attributes
              content
            }
          }
    }
`;

export const landingPageQuery = `
    landingPage(locale: $locale) {
        id
        welcomeTitle
        welcomeSubtitle
        currentlyReadingTitle
        currentlyReadingDescription
        latestFindingsTitle
        latestFindingsDescription
        currentlyWorkingOnTitle
        currentlyWorkingOnDescription
        viewAllLabel
        viewProjectLabel
        chaptersLabel
        starsLabel
        forksLabel
        updatedLabel
        hiddenPublicRepositories
        languageColors{
          language
          color{
            hex
          }
        }
        _seoMetaTags {
            tag
            attributes
            content
        }
    }
`;

export const latestTechnicalLedgersQuery = `
    allTechnicalLedgers(locale: $locale, first: 3, orderBy: date_DESC) {
        id
        slugId
        title
        excerpt
        date
        category
        readMinutes
    }
`;

export const currentlyReadingBooksQuery = `
    allBookSummaries(locale: $locale) {
        id
        slugId
        title
        author
        bookImage {
          responsiveImage(imgixParams: { fit: crop, w: 80, h: 120, auto: format }) {
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            src
            srcSet
            title
            webpSrcSet
            width
          }
        }
        category
        chapters {
          isPublished
        }
    }
`;

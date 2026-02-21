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

export const promptQuery = `
    prompt(locale: $locale) {
        coreRule
        safetyLimitations
        toneAndStyle
        formattingAndStructure
        contextualKnowledge
        rateLimitMessage
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
            responsiveImage {
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
        chatInputPlaceholder
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
        avatar {
            url
            title
            responsiveImage {
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
        seo{
          title
          description
          twitterCard
          image{
            responsiveImage{
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
            responsiveImage {
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
            responsiveImage {
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
        seo{
          title
          description
          twitterCard
          image{
            responsiveImage{
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
    }
`;

export const technicalLedgerPageQuery = `
    technicalLedgersPage(locale: $locale) {
        title
        description
        explanation
        all
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
        seo{
          title
          description
          twitterCard
          image{
            responsiveImage{
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
    }
`;

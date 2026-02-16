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
    prompt {
        coreRule
        safetyLimitations
        toneAndStyle
        formattingAndStructure
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
        jobTitle
        workPlace
        workExperience
        education
        at
        months
        totalContributionLabel
        openAiChatButton
        aiChatTitle
        suggestionLabel
        aiTypingIndicator
        techStackTitle
        footer
        chatInputPlaceholder
        suggestedQuestions{
            singleQuestion
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
        title
        excerpt
        date
        category
        tags {
            id
            tag
        }
        fullNote {
            value
        }
    }
`;

export const getCombinedQuery = (queryBlocks: string[]) => `
    query GeneralQuery($locale: SiteLocale){
        ${queryBlocks.join('\n')}
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

export const projectsQuery = `
    allProjects(locale: $locale) {
        url
        title
        name
        id
        githubLink
        description
        techstack
        medias {
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

export const specialtyQuery = `
    allSpecialties(locale: $locale) {
        icon {
            url
        }
        title
        content
    }
`;

export const sectionsQuery = `
    allSections(locale: $locale) {
        id
        icon {
            urltechStacksQuery
          }
        subtitle
        title
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

export const blogQuery = `
    allBlogs(locale: $locale) {
        id
        position
        title
        coverImage {
            responsiveImage(imgixParams: {w: "400", h: "160"}) {
                title
                width
                src
                height
            }
        }
        description
        content
        readArticle
        topics
    }
`;

export const blogCTAQuery = `
    allBlogsCtas(locale: $locale) {
        id
        blog {
            id
        }
        sortIndex
        title
    }
`;
export const singleBlogQuery = (id: string) => `
    allBlogs(filter: {id: {eq: "${id}"}}, locale: $locale) {
        id
        position
        title
        coverImage {
        url
        title
        }
        description
        content
    }
`;

import {Maybe} from "graphql/jsutils/Maybe";

export interface EducationExperienceList {
    allEducations: EducationExperience[];
}

export interface EducationExperience {
    order: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    place: string;
    logo:{
        responsiveImage: ResponsiveImageType;
    }
}

export interface WorkExperienceList {
    allWorks: WorkExperience[];
}

export interface WorkExperience {
    order: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    place: string;
    logo:{
        responsiveImage: ResponsiveImageType;
    }
}

export declare type ResponsiveImageType = {
    aspectRatio: number;
    base64?: Maybe<string>;
    height?: Maybe<number>;
    width: number;
    sizes?: Maybe<string>;
    src: string;
    srcSet?: Maybe<string>;
    webpSrcSet?: Maybe<string>;
    bgColor?: Maybe<string>;
    alt?: Maybe<string>;
    title?: Maybe<string>;
};

export interface TestimonialsList {
    allTestimonials: Testimonial[];
}

export interface Testimonial {
    id: string;
    name: string;
    text: string;
    workPlace: string;
    workPosition: string;
}

export interface TechStackList {
    allTechstacks: TechStack[];
}

export interface TechStack {
    id: string;
    title: string;
    name: string;
    icon: {
        url: string;
    };
}

export interface IGithubProfile {
    name: string;
    avatar_url: string;
    followers: string;
    following: string;
    orgs: string;
    public_repos: string;
    total_private_repos: string;
    company: string;
    bio: string;
}

export interface IGithubOrgs {
    avatar_url: string;
    description: string;
    events_url: string;
    hooks_url: string;
    id: number;
    issues_url: string;
    login: string;
    members_url: string;
    node_id: string;
    public_members_url: string;
    repos_url: string;
    url: string;
}

export type ContributionLevel =
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";

export interface GithubGraphQLResponse {
    data: {
        viewer: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: {
                        contributionDays: {
                            contributionCount: number;
                            date: string; // YYYY-MM-DD
                            contributionLevel: ContributionLevel;
                        }[];
                    }[];
                };
            };
        };
    };
}

export interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}
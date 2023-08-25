export interface Store {
    generators: GeneratorItem[]
}

export interface GeneratorItem {
    link?: string;
    title: string;
    desc: string;
    icon: string;
    active: boolean;
    new?: boolean;
}


export const generatorsStore = reactive<Store>({
    // Data
    generators: [
        {
            title: 'SEO: Title, Description & Keywords Improver',
            icon: 'search',
            link: '/generators/seo-title-description-improver',
            desc: `Improve your title, meta description & keywords for SEO. Give us your link and prefered keywords and we are proposing you three better titles and meta descriptions.`,
            new: true,
            active: true,
        },
        {
            title: 'Summary',
            icon: 'summary',
            link: '/generators/summarize',
            desc: 'Generate a summary based on the content of a website.',
            new: false,
            active: true
        },
        {
            title: 'Social Media',
            icon: 'share',
            link: '/generators/social-media',
            desc: 'Generate a social media messages based on the content of a website, or on your instructions.',
            new: false,
            active: true
        },
    ]
});
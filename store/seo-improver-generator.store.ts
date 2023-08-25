

interface UrlContent {
    title: string
    description: string
    url: string
    image: string
}


interface TabsStore {
    urlContent: UrlContent | null
    requestUrl: string
    content: string
    keywords: string

    validatedUrl: boolean

    showContentForm: boolean

    output: {
        content: string;
        cost: number
        oldTitle: string
        oldDescription?: string
        url: string
    }

    selected: {
        platform: string
        audience: string
    }
    setUrlContent(urlContent: UrlContent): void
    resetTabStore(): void
}

export const seoImproverTabsStore = reactive<TabsStore>({
    // Data
    urlContent: null,
    requestUrl: '',
    content: '',
    keywords: '',

    validatedUrl: false,

    showContentForm: true,

    // Options
    selected: {
        platform: '',
        audience: '',
    },

    output: {
        content: '',
        cost: 1,
        oldTitle: '',
        oldDescription: '',
        url: '',
    },

    // Methods
    setUrlContent(urlContent) {
        this.urlContent = urlContent;
    },
    resetTabStore() {
        this.urlContent = null
        this.requestUrl = ''
        this.content = ''
        this.keywords = ''
        this.showContentForm = true
        this.selected.platform = ''
        this.selected.audience = ''
        this.output.content = ''
        this.output.cost = 1
    }
});
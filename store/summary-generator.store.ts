

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
    tweetLink: string

    showContentForm: boolean

    output: {
        content: string;
        cost: number
    }

    selected: {
        platform: string
        audience: string
    }
    setUrlContent(urlContent: UrlContent): void
    resetTabStore(): void
}

export const summaryTabsStore = reactive<TabsStore>({
    // Data
    urlContent: null,
    requestUrl: '',
    content: '',
    tweetLink: '',

    showContentForm: true,

    // Options
    selected: {
        platform: '',
        audience: '',
    },

    output: {
        content: '',
        cost: 1
    },

    // Methods
    setUrlContent(urlContent) {
        this.urlContent = urlContent;
    },
    resetTabStore() {
        this.urlContent = null
        this.requestUrl = ''
        this.content = ''
        this.tweetLink = ''
        this.showContentForm = true
        this.selected.platform = ''
        this.selected.audience = ''
        this.output.content = ''
        this.output.cost = 1

	    summaryTabsStore.changeTab(TabType.URL)
    }
});
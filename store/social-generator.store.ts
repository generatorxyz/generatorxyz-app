export enum TabType {
    URL = 'url',
    CONTENT = 'content'
}
interface TabItem {
    key: TabType
    label: string
}

interface UrlContent {
    title: string
    description: string
    url: string
    image: string
}

const tabs = reactive<TabItem[]>([
    { key: TabType.URL, label: 'URL' },
    { key: TabType.CONTENT, label: 'Content' },
])

interface TabsStore {
    tabs: TabItem[]
    currentTab: TabType
    urlContent: UrlContent | null
    requestUrl: string
    content: string
    tweetLink: string
    linkedInLink: string

    showContentForm: boolean

    output: {
        content: string;
        cost: number
    }

    selected: {
        platform: string
        audience: string
    }
    changeTab(tab: TabType): void
    setUrlContent(urlContent: UrlContent): void
    resetTabStore(): void
}

export const tabsStore = reactive<TabsStore>({
    // Data
    tabs,
    currentTab: TabType.URL,
    urlContent: null,
    requestUrl: '',
    content: '',
    tweetLink: '',
    linkedInLink: '',

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
    changeTab(tab: TabType) {
        this.currentTab = tab;
    },
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

	    tabsStore.changeTab(TabType.URL)
    }
});
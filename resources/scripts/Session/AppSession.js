class AppSession {

    #sessionQueryKey; #sessionPageKey; #sessionQueryEntriesKey; #sessionQueryEntriesAmountKey;
    #sessionPickedEntryKey; #sessionKeyPhraseKey;
    localStorageLink;
    constructor() {
        this.localStorageLink = "DEFAULT";

        this.#sessionQueryKey = "Query";
        this.#sessionPageKey = "Page";
        this.#sessionQueryEntriesKey = "Query-Entries";
        this.#sessionQueryEntriesAmountKey = "Query-Entries-Amount";
        this.#sessionPickedEntryKey = "Picked-Entry";
        this.#sessionKeyPhraseKey = "Key-Phrase";

        if(window.sessionStorage.getItem(this.#sessionPageKey) === null) {
            window.sessionStorage.setItem(this.#sessionPageKey, "1");
            window.sessionStorage.setItem(this.#sessionQueryEntriesKey, this.localStorageLink);
            window.sessionStorage.setItem(this.#sessionQueryEntriesAmountKey, this.localStorageLink);
            window.sessionStorage.setItem(this.#sessionQueryKey, "");
            window.sessionStorage.setItem(this.#sessionKeyPhraseKey, "");
        }
    }

    setKeyPhrase(phrase) {
        window.sessionStorage.setItem(this.#sessionKeyPhraseKey, phrase);
    }
    setPage(page) {
        window.sessionStorage.setItem(this.#sessionPageKey, page.toString());
    }

    setQuery(query) {
        window.sessionStorage.setItem(this.#sessionQueryKey, query);
    }

    setQueryEntries(entries) {
        let json = (entries === this.localStorageLink) ? this.localStorageLink : JSON.stringify(entries);
        window.sessionStorage.setItem(this.#sessionQueryEntriesKey, json);
    }

    setQueryEntriesAmount(amount) {
        let json = (amount === this.localStorageLink) ? this.localStorageLink : amount.toString();
        window.sessionStorage.setItem(this.#sessionQueryEntriesAmountKey, json);
    }

    getKeyPhrase() {
        return window.sessionStorage.getItem(this.#sessionKeyPhraseKey);
    }

    getPage() {
        return Number(window.sessionStorage.getItem(this.#sessionPageKey));
    }

    getQueryEntries() {
        let entriesItem = window.sessionStorage.getItem(this.#sessionQueryEntriesKey);
        if(entriesItem !== this.localStorageLink)
            return JSON.parse(entriesItem);
        else
            return EntryStorage.findByQuery("");
    }

    getQueryEntriesAmount() {
        let amountItem = window.sessionStorage.getItem(this.#sessionQueryEntriesAmountKey);
        if(amountItem !== this.localStorageLink)
            return Number(amountItem);
        else
            return EntryStorage.count();
    }

    getQuery() {
        return window.sessionStorage.getItem(this.#sessionQueryKey);
    }

    setPickedEntry(entry) {
        let json = JSON.stringify(Entry.getObjectFromEntry(entry));
        window.sessionStorage.setItem(this.#sessionPickedEntryKey, json)
    }

    getPickedEntry() {
        return JSON.parse(window.sessionStorage.getItem(this.#sessionPickedEntryKey));
    }

    unpickEntry() {
        window.sessionStorage.removeItem(this.#sessionPickedEntryKey);
    }
}
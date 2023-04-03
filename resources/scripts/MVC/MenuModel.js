class MenuModel {
    onEntriesUpdate;
    session;


    onPageEntriesUpdate; displayQuery; displayKeyPhrase;
    constructor() {
        this.session = new AppSession();

        this.onPageEntriesUpdate = (entries) => {};
        this.onEntriesUpdate = () => {};
        this.displayQuery = (query) => {};
        this.displayKeyPhrase = (phrase) => {};
    }

    bindMenuUpdate(handler) {
        this.onMenuUpdate = handler;
    }

    bindDisplayQuery(handler) {
        this.displayQuery = handler;
    }

    bindDisplayKeyPhrase(handler) {
        this.displayKeyPhrase = handler;
    }


    reloadMenu() {
        let query = this.session.getQuery();
        if(query !== "") {
            let array = EntryStorage.findByQuery(query);
            this.session.setQueryEntries(array);
            this.session.setQueryEntriesAmount(array.length);
        } else {
            this.session.setQueryEntries(this.session.localStorageLink);
            this.session.setQueryEntriesAmount(this.session.localStorageLink);
        }
        this.loadMenuPage(this.session.getPage());
        this.displayQuery(query);
        this.displayKeyPhrase(this.session.getKeyPhrase());
    }

    changeQuery(query) {
        this.session.setQuery(query);
        if(query !== "") {
            let array = EntryStorage.findByQuery(query);
            this.session.setQueryEntries(array);
            this.session.setQueryEntriesAmount(array.length);
        } else {
            this.session.setQueryEntries(this.session.localStorageLink);
            this.session.setQueryEntriesAmount(this.session.localStorageLink);
        }
        this.loadMenuPage(1);
    }

    loadMenuPage(page) {
        const ElementsPageAmount = 5;
        const pagesAmount = Math.max(1, Math.ceil(this.session.getQueryEntriesAmount()/5));
        if(page > pagesAmount)
            page = pagesAmount;
        else if(page < 1)
            page = 1;

        this.session.setPage(page);
        const array = this.session.getQueryEntries()
            .slice(ElementsPageAmount * (page - 1), ElementsPageAmount * page);
        array.forEach((entry) => {
            if(entry.password != null)
                entry.password = Encryption.decrypt(entry.password, this.session.getKeyPhrase());
            if(entry.key != null)
                entry.key = Encryption.decrypt(entry.key, this.session.getKeyPhrase());
        })
        this.onMenuUpdate(array, page, pagesAmount);
    }

    deleteElement(id) {
        EntryStorage.remove(id);
        this.reloadMenu()
    }

    setPickedElement(entry) {
        this.session.setPickedEntry(Entry.getObjectFromEntry(entry));
    }

    inputKeyPhrase(phrase) {
        this.session.setKeyPhrase(phrase);
        this.reloadMenu();
    }
}
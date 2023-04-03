class EntryStorage {
    static #entriesArrayKey;
    static #lastIdKey;
    static #entriesAmountKey;

    static {
       this.#entriesArrayKey = "Entries-Array";
       this.#lastIdKey = "Entries-Last-Id";
       this.#entriesAmountKey = "Entries-Amount";

       if(window.localStorage.getItem(this.#entriesArrayKey) === null) {
           window.localStorage.setItem(this.#entriesArrayKey, "[]");
           window.localStorage.setItem(this.#lastIdKey, "0");
           window.localStorage.setItem(this.#entriesAmountKey, "0");
       }
    }

    static #getLastId() {
        return Number(window.localStorage.getItem(this.#lastIdKey));
    }

    static #getEntriesArray() {
        return JSON.parse(window.localStorage.getItem(this.#entriesArrayKey));
    }

    /* add(entry : class Entry) - method for adding new entry to storage.
    *  If entry has id field - this field will be ignored. */
    static add(entry) {
        let entriesArray = this.#getEntriesArray();

        let entryObject = Entry.getObjectFromEntry(entry);
        entryObject.id = this.#getLastId() + 1;
        entriesArray.push(entryObject);

        let jsonNewEntriesArray = JSON.stringify(entriesArray);
        window.localStorage.setItem(this.#entriesArrayKey, jsonNewEntriesArray);
        window.localStorage.setItem(this.#entriesAmountKey, (this.count() + 1).toString());
        window.localStorage.setItem(this.#lastIdKey, (this.#getLastId() + 1).toString());
    }

    /* update(entry : class Entry) - method for updating entry from storage.
    * It uses id field to find entry to update.
    * If id is null, or there are no entry with such id - nothing will happen. */
    static update(entry) {
        let entriesArray = this.#getEntriesArray();
        let entryIndex = entriesArray.findIndex(e => e.id === entry.id);
        if(entryIndex === -1)
            return;

        entriesArray[entryIndex] = Entry.getObjectFromEntry(entry);
        let jsonNewEntriesArray = JSON.stringify(entriesArray);
        window.localStorage.setItem(this.#entriesArrayKey, jsonNewEntriesArray);
    }

    /* remove(id : Number) - method for deleting entry from storage by id.
    *  If entry with mentioned id does not exist - it will do nothing. */
    static remove(id) {
        let entriesArray = this.#getEntriesArray();
        entriesArray = entriesArray.filter(entry => entry.id !== id);

        let jsonNewEntriesArray = JSON.stringify(entriesArray);
        window.localStorage.setItem(this.#entriesArrayKey, jsonNewEntriesArray);
        window.localStorage.setItem(this.#entriesAmountKey, (this.count() - 1).toString());
    }

    /* findByQuery(query : String) : Array<Entry> - method that returns all entries in storage that match query.
    *  If nothing is found it returns empty array. */
    static findByQuery(query) {
        let entriesArray = this.#getEntriesArray();
        return entriesArray.filter((entry) => {
            if(entry.label.toLowerCase().startsWith(query.toLowerCase()))
                return true;
            return entry.searchTags.findIndex(tag => tag.toLowerCase().startsWith(query.toLowerCase())) !== -1;
        });
    }

    /* count() : Number - method returns current entries amount in storage. */
    static count() {
        return Number(window.localStorage.getItem(this.#entriesAmountKey));
    }
}
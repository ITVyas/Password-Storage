class EntryBuilder {
    #instance;
    #id;
    #login; #password; #name; #surname; #email; #phone; #entryType; #key; #info; #label;
    #searchTags;

    static Fields = {
        Name : "#name",
        Surname : "#surname",
        Login : "#login",
        Password : "#password",
        Email : "#email",
        Phone : "#phone",
        Id : "#id",
        EntryType : "#entryType",
        Key : "#key",
        Info : "#info",
        Label : "#label"
    };

    constructor() {
        this.#instance = null;
        this.#id = null;
        this.#login = null;
        this.#password = null;
        this.#name = null;
        this.#surname = null;
        this.#email = null;
        this.#phone = null;
        this.#entryType = null;
        this.#key = null;
        this.#info = null;
        this.#label = null;
        this.#searchTags = [];
    }

    field(field, value) {
        if(field !== "#searchTags" && field !== "#instance")
            eval(`this.${field} = value;`);
    }

    addSearchTag(tag) {
        this.#searchTags.push(tag);
    }

    build() {
        let entry = new Entry(this.#id, this.#login, this.#password, this.#name, this.#surname,
            this.#email, this.#phone, this.#entryType, this.#info, this.#key, this.#label);
        for(let tag of this.#searchTags)
            entry.addSearchTag(tag);
        return entry;
    }
}
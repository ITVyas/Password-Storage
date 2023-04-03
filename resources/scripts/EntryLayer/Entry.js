class Entry {
    #id;
    login;
    password;
    name;
    surname;
    email;
    phone;
    entryType;
    info;
    label;
    #searchTags;
    key;

    #initFields(id, login, password, name, surname, email, phone, entryType, info, key, label) {
        this.#id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.entryType = entryType;
        this.info = info;
        this.key = key;
        this.label = label;
        this.#searchTags = []
    }

    constructor(id, login, password, name, surname, email, phone, entryType, info, key, label) {
        this.#initFields(id, login, password, name, surname, email, phone, entryType, info, key, label);
    }

    get id() {
        return this.#id;
    }

    addSearchTag(tag) {
        this.#searchTags.push(tag);
    }

    removeSearchTag(tag) {
        this.#searchTags = this.#searchTags.filter(item => item !== tag);
    }

    get searchTags() {
        let copy = [];
        for(let el of this.#searchTags)
            copy.push(el);
        return copy;
    }
    static getObjectFromEntry(entry) {
        return {
            id: entry.id,
            login: entry.login,
            password: entry.password,
            name: entry.name,
            surname: entry.surname,
            email: entry.email,
            phone: entry.phone,
            info: entry.info,
            key: entry.key,
            label: entry.label,
            searchTags: entry.searchTags,
            entryType: entry.entryType
        };
    }

    static getElementLabelFromEntry(entry) {
        let secondPart = "";
        let thirdPart = "";
        if(entry.key == null) {
            if(entry.login != null)
                secondPart = ` | Login: ${entry.login}`;
            else if(entry.email != null)
                secondPart = ` | Email: ${entry.email}`;
        }
        if(entry.key != null)
            thirdPart = ` | Key: ${entry.key}`;
        else if(entry.password != null)
            thirdPart = ` | Password: ${entry.password}`;

        return entry.label + secondPart + thirdPart;
    }
}
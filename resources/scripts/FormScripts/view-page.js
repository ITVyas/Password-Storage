const QueryFieldMap = new Map();
initQueryFieldMap();
fillPage();

function fillPage() {

    document.querySelector("#back-button").addEventListener("click", (event) => {
        window.location.href = "./index.html";
    })

    let session = new AppSession();
    let pickedEntry = session.getPickedEntry();
    if(pickedEntry == null)
        window.location.href = "./index.html";

    document.querySelector(QueryFieldMap.get(EntryBuilder.Fields.Label)).value = pickedEntry.label;
    document.querySelector(QueryFieldMap.get(EntryBuilder.Fields.EntryType)).value = pickedEntry.entryType;
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Login, pickedEntry.login);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Password, pickedEntry.password);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Email, pickedEntry.email);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Phone, pickedEntry.phone);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Name, pickedEntry.name);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Surname, pickedEntry.surname);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Info, pickedEntry.info);
    fillFieldOrRemoveIfEmpty(EntryBuilder.Fields.Key, pickedEntry.key);

    let tags = pickedEntry.searchTags;
    let container = document.querySelector("#search-tags-list");
    if(tags.length === 0) {
        container.previousElementSibling.remove();
        container.remove();
    } else {
        for(let tag of tags)
            container.append(createSearchTagElement(tag));
    }
}

function fillFieldOrRemoveIfEmpty(field, value) {
    let input = document.querySelector(QueryFieldMap.get(field));
    if(value == null) {
        input.previousElementSibling.remove()
        input.remove();
    } else {
        input.value = value;
    }
}
function initQueryFieldMap() {
    QueryFieldMap.set(EntryBuilder.Fields.EntryType, "#entry-type");
    QueryFieldMap.set(EntryBuilder.Fields.Label, "#entry-label");
    QueryFieldMap.set(EntryBuilder.Fields.Login, "#entry-login");
    QueryFieldMap.set(EntryBuilder.Fields.Password, "#entry-password");
    QueryFieldMap.set(EntryBuilder.Fields.Email, "#entry-email");
    QueryFieldMap.set(EntryBuilder.Fields.Phone, "#entry-phone");
    QueryFieldMap.set(EntryBuilder.Fields.Name, "#entry-name");
    QueryFieldMap.set(EntryBuilder.Fields.Surname, "#entry-surname");
    QueryFieldMap.set(EntryBuilder.Fields.Key, "#entry-key");
    QueryFieldMap.set(EntryBuilder.Fields.Info, "#info");
}

function createSearchTagElement(value) {
    let span = document.createElement("span");
    span.classList.add("search-tag");
    let name = document.createElement("span");
    name.innerHTML = value;
    span.append(name);
    return span;
}
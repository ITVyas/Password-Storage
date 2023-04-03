const QueryFieldMap = new Map();
formView();

function formView() {
    let closeButtons = document.querySelectorAll(".form-button");
    for(let button of closeButtons)
        button.onclick = closeInputField;

    let addSearchTagButton = document.querySelector("#add-tag-button");
    addSearchTagButton.onclick = addSearchTag;

    document.querySelector("#form").onkeypress = (event) => {
        let key = event.charCode || event.keyCode || 0;
        if (key == 13)
            event.preventDefault();
    }

    document.querySelector("#search-tag-input").onkeypress = (event) => {
        let key = event.charCode || event.keyCode || 0;
        if (key == 13)
            addSearchTag(event);
    }

    document.querySelector("#back-button").addEventListener("click", (event) => {
        window.location.href = "./index.html";
    })

    initQueryFieldMap();

    let keyPhraseInput = document.querySelector("#key-phrase");
    keyPhraseInput.value = (new AppSession()).getKeyPhrase();
    keyPhraseInput.addEventListener("input", (event) => {
        (new AppSession()).setKeyPhrase(event.target.value);
    })
}

function closeInputField(event) {
    let input = event.target.previousElementSibling;
    input.style.display = "none";
    input.removeAttribute("required");
    input.value = "";
    event.target.onclick = openInputField;

    event.target.classList.remove("delete");
    event.target.classList.add("add");
    event.target.innerHTML = "✚";
}

function openInputField(event) {
    let input = event.target.previousElementSibling;
    input.style.display = "inline-block";
    input.setAttribute("required", "");
    event.target.onclick = closeInputField;

    event.target.classList.add("delete");
    event.target.classList.remove("add");
    event.target.innerHTML = "✖";
}

function addSearchTag(event) {
    let input = document.querySelector("#search-tag-input");
    if(input.value !== "" && !searchTagsContain(input.value)) {
        let tagsContainer = event.target.parentElement.nextElementSibling;
        tagsContainer.append(createSearchTagElement(input.value));
        input.value = "";
    }
}

function createSearchTagElement(value) {
    let span = document.createElement("span");
    span.classList.add("search-tag");
    let name = document.createElement("span");
    name.innerHTML = value;
    let cross = document.createElement("span");
    cross.classList.add("remove-tag-cross");
    cross.innerHTML = "🞩";
    cross.onclick = removeTag;

    span.append(name);
    span.append(cross);
    return span;
}

function removeTag(event) {
    event.target.parentElement.remove();
}

function searchTagsContain(value) {
    let tagsContainer = document.querySelector("#search-tags-list");
    for(let i = 0; i < tagsContainer.children.length; i++)
        if(tagsContainer.children[i].firstElementChild.innerHTML === value)
            return true;
    return false;
}

function initQueryFieldMap() {
    QueryFieldMap.set(EntryBuilder.Fields.EntryType, "#select-entry-type");
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

function getSearchTagsCollection() {
    let tagsContainer = document.querySelector("#search-tags-list");
    let tagsCollection = [];
    for(let tagEl of tagsContainer.children)
        tagsCollection.push(tagEl.children[0].innerHTML);
    return tagsCollection;
}

function getEntryFromForm() {
    let entryBuilder = new EntryBuilder();
    for(let field in EntryBuilder.Fields)
        if(EntryBuilder.Fields[field] !== EntryBuilder.Fields.Id &&
            document.querySelector(QueryFieldMap.get(EntryBuilder.Fields[field])).style.display !== "none")
            entryBuilder.field(EntryBuilder.Fields[field],
                document.querySelector(QueryFieldMap.get(EntryBuilder.Fields[field])).value);

    let tags = getSearchTagsCollection();
    for(let tag of tags)
        entryBuilder.addSearchTag(tag);

    let pickedEntry = (new AppSession()).getPickedEntry();
    if(pickedEntry != null)
        entryBuilder.field(EntryBuilder.Fields.Id, pickedEntry.id);
    return entryBuilder.build();
}
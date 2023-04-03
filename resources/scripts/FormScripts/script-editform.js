fillFormWithPickedEntry();

document.querySelector("#form").addEventListener("submit", (event) => {
    let entry = getEntryFromForm();
    if(entry.password != null)
        entry.password = Encryption.encrypt(entry.password, (new AppSession()).getKeyPhrase());
    if(entry.key != null)
        entry.key = Encryption.encrypt(entry.key, (new AppSession()).getKeyPhrase());
    EntryStorage.update(entry);
    (new AppSession()).unpickEntry();
});

function fillFormWithPickedEntry() {
    let session = new AppSession();
    let pickedEntry = session.getPickedEntry();
    if(pickedEntry == null)
        window.location.href = "./index.html";

    document.querySelector(QueryFieldMap.get(EntryBuilder.Fields.Label)).value = pickedEntry.label;
    document.querySelector(QueryFieldMap.get(EntryBuilder.Fields.EntryType)).value = pickedEntry.entryType;
    fillFormFieldAndSetButton(EntryBuilder.Fields.Login, pickedEntry.login);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Password, pickedEntry.password);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Email, pickedEntry.email);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Phone, pickedEntry.phone);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Name, pickedEntry.name);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Surname, pickedEntry.surname);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Info, pickedEntry.info);
    fillFormFieldAndSetButton(EntryBuilder.Fields.Key, pickedEntry.key);

    let tags = pickedEntry.searchTags;
    let container = document.querySelector("#search-tags-list");
    for(let tag of tags)
        container.append(createSearchTagElement(tag));
}

function fillFormFieldAndSetButton(field, value) {
    let input = document.querySelector(QueryFieldMap.get(field));
    input.value = value ?? "";
    if(value == null)
        input.nextElementSibling.click();
}
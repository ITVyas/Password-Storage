document.querySelector("#form").addEventListener("submit", (event) => {
    let entry = getEntryFromForm();
    if(entry.password != null)
        entry.password = Encryption.encrypt(entry.password, (new AppSession()).getKeyPhrase());
    if(entry.key != null)
        entry.key = Encryption.encrypt(entry.key, (new AppSession()).getKeyPhrase());
    EntryStorage.add(entry);
});
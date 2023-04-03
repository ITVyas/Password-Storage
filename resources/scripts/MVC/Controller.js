class Controller {
    #model; #view;
    constructor(model, view) {
        this.#view = view;
        this.#model = model;

        this.#model.bindMenuUpdate(this.onMenuUpdate);
        this.#model.bindDisplayQuery(this.displayQueryModel);
        this.#model.bindDisplayKeyPhrase(this.displayKeyPhrase);

        this.#view.bindSearchQueryUpdate(this.onQueryChange);
        this.#view.bindPageLoad(this.onPageLoad);
        this.#view.bindNextPage(this.onNextPage);
        this.#view.bindPreviousPage(this.onPreviousPage);
        this.#view.bindSwitchDeleteMode(this.onSwitchDeleteMode);
        this.#view.bindSwitchEditMode(this.onSwitchEditMode);
        this.#view.bindDeleteElement(this.onDeleteElement);
        this.#view.bindEditElement(this.onEditElement);
        this.#view.bindViewElement(this.onViewElement);
        this.#view.bindKeyPhraseChange(this.onKeyPhraseInput);
    }

    onPageLoad = () => {
        if (window.history.replaceState )
            window.history.replaceState( null, null, window.location.href );
        this.#model.reloadMenu();
        this.#model.session.unpickEntry();
    }

    onMenuUpdate = (elements, page, pagesAmount) => {
        this.#view.displayElements(elements);
        this.#view.displayPageNotation(page, pagesAmount);
        this.#view.disablePrevPageButton(page === 1);
        this.#view.disableNextPageButton(page === pagesAmount);
    }

    onQueryChange = (query) => {
       this.#model.changeQuery(query);
    }

    onNextPage = () => {
        this.#model.loadMenuPage(this.#model.session.getPage() + 1);
    }

    onPreviousPage = () => {
        this.#model.loadMenuPage(this.#model.session.getPage() - 1);
    }

    onSwitchDeleteMode = () => {
        this.#model.loadMenuPage(this.#model.session.getPage());
    }

    onSwitchEditMode = () => {
        this.#model.loadMenuPage(this.#model.session.getPage());
    }

    onDeleteElement = (id) => {
        this.#model.deleteElement(id);
    }

    displayQueryModel = (query) => {
        this.#view.displayQuery(query);
    }

    onEditElement = (entry) => {
        this.#model.setPickedElement(entry);
        this.#view.goEditForm();
    }

    onViewElement = (entry) => {
        this.#model.setPickedElement(entry);
        this.#view.goViewPage();
    }

    onKeyPhraseInput = (phrase) => {
        this.#model.inputKeyPhrase(phrase);
    }

    displayKeyPhrase = (phrase) => {
        this.#view.displayKeyPhrase(phrase);
    }

}
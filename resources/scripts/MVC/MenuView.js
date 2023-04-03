class MenuView {
    #contentContainerSelector; #addButtonSelector; #pageNumberSelector;
    #searchInputSelector; #nextPageSelector; #prevPageSelector;
    #deleteButtonSelector; #editButtonSelector; #keyPhraseInputSelector;
    #deleteMode; #editMode;
    onDeleteElement; onEditElement; onViewElement;
    constructor() {
        this.onDeleteElement = (id) => {};
        this.onEditElement = (entry) => {};
        this.onViewElement = (entry) => {};

        this.#deleteMode = false;
        this.#editMode = false;

        this.#contentContainerSelector = ".content-container";
        this.#addButtonSelector = "#add-button";
        this.#deleteButtonSelector = "#delete-button";
        this.#editButtonSelector = "#edit-button";
        this.#pageNumberSelector = "footer";
        this.#searchInputSelector = "#header-search-input";
        this.#nextPageSelector = ".right-button";
        this.#prevPageSelector = ".left-button";
        this.#keyPhraseInputSelector = "#key-phrase";
    }

    #getElementBySelector(selector) {
        return document.querySelector(selector);
    }

    #decorateDeleteMode(element, entry) {
        element.classList.add("delete-mode");
        element.addEventListener("mouseenter", (event) => {
            event.target.innerHTML = "<div></div>";
        })
        element.addEventListener("mouseleave", (event) => {
            event.target.innerHTML = "";
            let divContent = document.createElement("div");
            divContent.innerText = Entry.getElementLabelFromEntry(entry);
            event.target.append(divContent);

            let viewButton = document.createElement("button");
            viewButton.addEventListener("click", (event) => {
                this.onViewElement(entry);
            });

            event.target.append(viewButton);
        })
        element.addEventListener("click", (event) => {
            this.onDeleteElement(entry.id);
        })
    }

    #decorateEditMode(element, entry) {
        element.classList.add("edit-mode");
        element.addEventListener("mouseenter", (event) => {
            event.target.innerHTML = "<div></div>";
        })
        element.addEventListener("mouseleave", (event) => {
            event.target.innerHTML = "";
            let divContent = document.createElement("div");
            divContent.innerText = Entry.getElementLabelFromEntry(entry);
            event.target.append(divContent);

            let viewButton = document.createElement("button");
            viewButton.addEventListener("click", (event) => {
                this.onViewElement(entry);
            });

            event.target.append(viewButton);
        })
        element.addEventListener("click", (event) => {
            this.onEditElement(entry);
        })
    }

    displayElements = (entries) => {
        let container = this.#getElementBySelector(this.#contentContainerSelector);
        container.innerHTML = "";
        for(let entry of entries) {
            let el = document.createElement("div");
            el.classList.add("content-element");
            let divContent = document.createElement("div");
            divContent.innerText = Entry.getElementLabelFromEntry(entry);
            el.append(divContent);

            let viewButton = document.createElement("button");
            viewButton.addEventListener("click", (event) => {
                this.onViewElement(entry);
            })

            el.append(viewButton);

            if(this.#deleteMode)
                this.#decorateDeleteMode(el, entry);
            else if(this.#editMode)
                this.#decorateEditMode(el, entry);

            container.append(el);
        }
    }

    goEditForm() {
        window.location.href = "./edit-form.html";
    }

    goViewPage() {
        window.location.href = "./view-page.html";
    }


    displayPageNotation(page, pagesAmount) {
        document.querySelector(this.#pageNumberSelector).innerHTML = `${page}/${pagesAmount}`;
    }

    displayQuery(query) {
        document.querySelector(this.#searchInputSelector).value = query;
    }

    bindSearchQueryUpdate(handler) {
       this.#getElementBySelector(this.#searchInputSelector).addEventListener("input", (event) => {
           handler(event.target.value);
       })
    }

    disablePrevPageButton(isDisabled) {
        this.#getElementBySelector(this.#prevPageSelector).disabled = isDisabled;
    }

    disableNextPageButton(isDisabled) {
        this.#getElementBySelector(this.#nextPageSelector).disabled = isDisabled;
    }

    setStyleDeleteButton() {
        let button = this.#getElementBySelector(this.#deleteButtonSelector);
        if(button.classList.contains("active") && this.#deleteMode == false)
            button.classList.remove("active");
        else if(button.classList.contains("active") == false && this.#deleteMode)
            button.classList.add("active");
    }

    setStyleEditButton() {
        let button = this.#getElementBySelector(this.#editButtonSelector);
        if(button.classList.contains("active") && this.#editMode == false)
            button.classList.remove("active");
        else if(button.classList.contains("active") == false && this.#editMode)
            button.classList.add("active");
    }

    displayKeyPhrase(phrase) {
        this.#getElementBySelector(this.#keyPhraseInputSelector).value = phrase;
    }

    bindPageLoad(handler) {
        document.addEventListener('DOMContentLoaded', () => {
            handler();
        }, false);
    }

    bindNextPage(handler) {
        this.#getElementBySelector(this.#nextPageSelector).addEventListener("click", () => {
            handler();
        })
    }
    bindPreviousPage(handler) {
        this.#getElementBySelector(this.#prevPageSelector).addEventListener("click", () => {
            handler();
        })
    }

    bindSwitchDeleteMode(handler) {
        this.#getElementBySelector(this.#deleteButtonSelector).addEventListener("click", () => {
            this.#editMode = false;
            this.#deleteMode = !this.#deleteMode;
            this.setStyleDeleteButton();
            this.setStyleEditButton();
            handler();
        })
    }

    bindSwitchEditMode(handler) {
        this.#getElementBySelector(this.#editButtonSelector).addEventListener("click", () => {
            this.#deleteMode = false;
            this.#editMode = !this.#editMode;
            this.setStyleDeleteButton();
            this.setStyleEditButton();
            handler();
        })
    }

    bindDeleteElement(handler) {
        this.onDeleteElement = handler;
    }

    bindEditElement(handler) {
        this.onEditElement = handler;
    }

    bindViewElement(handler) {
        this.onViewElement = handler;
    }

    bindKeyPhraseChange(handlerInput) {
        this.#getElementBySelector(this.#keyPhraseInputSelector).addEventListener("input", (event) => {
            handlerInput(event.target.value);
        })
    }
}
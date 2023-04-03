class Encryption {
    static encrypt(msg, phrase) {
        if(msg.length > 62)
            throw "Encryption works for strings not greater than 62.";

        let completedMsg = this.#completeMsg(msg, 64);
        let completePhrase = this.#completePhrase(phrase, completedMsg.length);
        return this.#applyPhrase(completedMsg, completePhrase);
    }

    static decrypt(msg, phrase) {
        if(msg.length > 64)
            throw "Decryption works for strings not greater than 64.";

        let completePhrase = this.#completePhrase(phrase, 64);
        let phase1 = this.#unapplyPhrase(msg, completePhrase);
        return this.#incompleteMsg(phase1);
    }

    static #completeMsg(msg, outLen) {
        let compPhrase = msg.slice();
        let count = 1;
        let amount =  0;
        let mode = false;
        compPhrase += "1";
        while(compPhrase.length < outLen-2) {
            if(mode === false)
                compPhrase += "0";
            else
                compPhrase += msg[amount];
            amount += 1;
            if(amount === msg.length) {
                mode = !mode;
                amount = 0;
                count += 1;
            }
        }
        compPhrase += (count < 10) ? "0" + count.toString() : count.toString();
        return compPhrase;
    }

    static #incompleteMsg(msg) {
        let count = parseInt(msg.slice(-2));
        if(isNaN(count))
            count = 0;

        let index = msg.length - 3;
        while(count > 0) {
            if(count % 2 === 1) {
                while(index >= 0 && msg[index] === "0")
                    index--;
                count -= 1;
            } else {
                while(index >= 0 && msg[index] !== "0")
                    index--;
                count -= 1;
            }
        }

        return msg.slice(0, index);
    }

    static #completePhrase(phrase, outLen) {
        if(phrase == null || phrase.length === 0)
            phrase = "  ";
        else if(phrase.length === 1)
            phrase += phrase;

        let newMsg = phrase.slice();
        while(newMsg.length < outLen) {
            let currentLen = newMsg.length;
            let diff = outLen - currentLen;
            let iterations = Math.min(currentLen-1, diff);
            for(let i = 0; i < iterations; i++) {
                newMsg = this.#insertAtIndex(newMsg, this.#f(newMsg[2*i], newMsg[2*i+1], phrase) ,2*i+1);
            }
        }
        return newMsg;
    }

    static #f(letter1, letter2, startMsg) {
        let sum = 0;
        for(let i = 0; i < startMsg.length; i++) {
            let sign = (i % 2 === 0) ? +1 : -1;
            sum += sign*startMsg[i].charCodeAt(0);
        }


        let codeLetter1 = letter1.charCodeAt(0);
        let codeLetter2 = letter2.charCodeAt(0);
        let x = Math.ceil(1/(Math.pow(Math.abs(codeLetter1-codeLetter2 + sum)/(4000*(startMsg.length)), 2))) % 96 + 32;
        return String.fromCharCode(x);
    }

    static #applyPhrase(msg, phrase) {
        let len = msg.length;
        let coded = "";
        for(let i = 0; i < len; i++)
            coded += String.fromCharCode((msg[i].charCodeAt(0) + phrase[i].charCodeAt(0) - 62) % 96 + 32);
        return coded;
    }

    static #unapplyPhrase(msg, phrase) {
        let len = msg.length;
        let coded = "";
        for(let i = 0; i < len; i++) {
            let x = msg[i].charCodeAt(0) + 30 - phrase[i].charCodeAt(0);
            x = x % 96;
            if(x < 32)
                x += 96;

            coded += String.fromCharCode(x);
        }

        return coded;
    }

    static #insertAtIndex(str, substring, index) {
        return str.slice(0, index) + substring + str.slice(index);
    }
}



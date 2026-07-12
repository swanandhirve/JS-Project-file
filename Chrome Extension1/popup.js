/* global chrome, document, window */

class NoteTaker {
    #noteInput;
    #savedNote;
    #clearBtn;
    #saveBtn;

    #previousNote;
    constructor() {
        this.#clearBtn = document.getElementById('clearButton');
        this.#saveBtn = document.getElementById('saveButton');
    }

    init() {
        let _this = this;

        this.#clearBtn.addEventListener('click', () => {
            this.#noteInput.value = '';
        });

        this.#initNoteInput();
        let saveBtn = this.#saveBtn;
        saveBtn.addEventListener('click', () => {
            _this.#saveNote();
        });
    }

    async #getPreviousNote() {
        let currentTabId = await this.#getActiveTabId();
        let key = currentTabId.toString();

        return new Promise((resolve, /*reject*/) => {
            chrome.storage.local.get(key, (result) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                }
                let raw = result[key];
                let noteInfo = raw ? JSON.parse(raw) : null;
                this.#previousNote = noteInfo ? noteInfo.text : '';
                // this.#noteInput.value = this.#previousNote;
                return resolve(this.#previousNote);
            });
        }
        );
    }

    async #saveNote() {
        let note = this.#noteInput.value;
        let currentTabId = await this.#getActiveTabId();
        let key = currentTabId.toString(); 
 
        let noteInfo = { id: currentTabId, text: note };

        try {
            await chrome.storage.local.set({ [key]: JSON.stringify(noteInfo) });
            this.#previousNote = note;
            window.alert("Note Saved.");    
        } 
        catch (e) {
            console.error(e);
        }
    }

    async #getActiveTabId() {
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);

        if (tabs.length > 0) {
            console.log("Current Tab ID: ", tabs[0].id);
            return tabs[0].id;
        }
    }

    async #initNoteInput() {
        let noteInputArea = document.getElementById('noteInput');
        let tabId = await this.#getActiveTabId();
        let previousNote = await this.#getPreviousNote();

        let input = document.createElement('textarea');
        input.id = `noteInput-${tabId}`;
        input.placeholder = 'Write your notes here...';
        input.value = previousNote || '';
        this.#noteInput = input;
        noteInputArea.appendChild(input);
    }
}

let noteTaker = new NoteTaker();
noteTaker.init();

const fs = require("fs");
const chalk = require("chalk");

/*
* Helper functions below
*/

/*
* Loads notes from json storage file and returns array of notes.
*
* @return {Array}   Collections of notes
*/
const loadNotes = () => {
    try {
        // Read JSON file
        const dataBuffer = fs.readFileSync("notes.json");

        // Convert buffer to JSON string
        const dataJSON = dataBuffer.toString();

        // Parse JSON string and return notes array
        return JSON.parse(dataJSON);
    } catch(e) {
        console.log(chalk.yellow.inverse("WARNING") + " - File Contains No Data");
        return [];
    }
};

/*
* Stringifies notes in array and writes them to JSON file
*
* @param {Array}    Collection of notes that have been added to JSON storage file
*/
const saveNotes = (notes) => fs.writeFileSync("notes.json", JSON.stringify(notes));

/*
* Adds notes to json storage file.
* 
* @param {String} title     Title of note being added.
* @param {String} body      Body of note being added.
*/
const addNote = (title, body) => {
    const notes = loadNotes();

    debugger
    const duplicateNote = notes.find((note) => note.title === title);
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("SUCCESS") + " - Note Added");
    } else {
        console.log(chalk.red.inverse("ERROR") + " - Note Already Exists");
    }
};

/*
* Removes a note from the JSON storage file.
*
* @param {String} title     Title of note to be removed.
*/
const removeNote = (title) => {
    // Load notes from JSON storage file
    const notes = loadNotes();

    // Filter notes array to find all notes NOT having the same title and return to notesToKeep array
    const notesToKeep = notes.filter((note) => note.title !== title);

    // If length of two arrays differ then note was successfully removed
    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("SUCCESS") + " - Removed Note With Title '" + title + "'");
    } else {
        console.log(chalk.red.inverse("ERROR") + " - Note Not Found");
    }
};

/*
* Loads all notes from JSON storage file and displays in console.
*/
const listNotes = () => {
    console.log(chalk.inverse("Dair Azuaje's Notes\n"));
    const notes = loadNotes();

    notes.forEach((note) => console.log(note.title));
}

/*
* Reads a note from JSON storage file.
*
* @param {String} title     Title of note to be read.
*/
const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {
        console.log(chalk.green.inverse("SUCCESS") + " - Note Found");
        console.log(chalk.blue.inverse(noteToRead.title));
        console.log(noteToRead.body);
    } else {
        console.log(chalk.red.inverse("ERROR") + " - Note Does Not Exist");
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};


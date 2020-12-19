const notes = require("./notes");
const yargs = require("yargs");


// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demand: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demand: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
});

// Create remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
        title: {
            describe: "Note title",
            demand: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    } 
});

// Create a read command
yargs.command({
    command: "read",
    descibe: "Read a note",
    builder: {
        title: {
            describe: "Note title",
            demand: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

// Create a list command
yargs.command({
    command: "list",
    describe: "List a note",
    handler() {
        notes.listNotes();
    }
});

yargs.parse();
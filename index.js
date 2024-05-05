import { addContact, getContactById, listContacts, removeContact, } from "./contacts.js";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
console.log("Yargs", yargs);

console.log("tema 1");
// listContacts();
// getContactById("92122944-323b-4141-b4b1-684dd69bd640");
removeContact("92122944-323b-4141-b4b1-684dd69bd640");
// addContact("Ioana", "exemple@exemple.ro", "0741299545");
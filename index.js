import { addContact, getContactById, listContacts, removeContact, } from "./contacts.js";
import { Command } from 'commander';

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// node index.js --action list
// node index.js --action get --id 5
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// node index.js --action remove --id=3

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        listContacts();
        break;
  
      case "get":
        getContactById(id);
        break;
  
      case "add":
        addContact(name, email, phone);
        break;
  
      case "remove":
        removeContact(id);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  
  invokeAction(argv);



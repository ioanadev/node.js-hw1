import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import * as path from 'node:path'; 
import { fileURLToPath } from 'node:url';
import colors from "colors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


console.log("dirname:", __dirname);
const contactsPath = `${__dirname}\\db\\contacts.json`;


// %%%%%%%% Lista de contacte %%%%%%%%%%%%%%%%%%%%%%%%%%
export async function listContacts() {
   try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
    const contacts = JSON.parse(data)
    console.table(contacts);
    if (contacts.length === 0) {
      console.log("Nu există contacte.".red);
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
// listContacts()
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
// ########### Selectarea contactului dupa id #########
export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
    const contacts = JSON.parse(data);
    const searchContact = contacts.find(contact=>contact.id === contactId);
    if(searchContact){
      console.log(searchContact);
    } else{
      console.log("Contact not found!".red)
    }
  } catch (err) {
    console.log(err);
  }
}
// getContactById()
//#####################################################  

// @@@@@@@@@@@@@@@ Stergerea contactelor @@@@@@@@@@@@@@@
export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(contact=>contact.id === contactId);

    if(contactIndex === -1){
      console.log("Contact not found!");
      return;
    }

    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
     console.log("The contact has been removed!".bgMagenta);

  } 
  catch (err) {
    console.log(err);
  }
}
  

//^^^^^^^^^^^^ Adaugarea de noi contacte ^^^^^^^^^^^^^^^^^^^^^^^^
export async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
        const contacts = JSON.parse(data);

       //######verifica existenta contactului##########################
        const existingName = contacts.find(contact=>contact.name === name);
        const existingEmail = contacts.find(contact=>contact.email === email);
        const existingPhone = contacts.find(contact=>contact.phone ===phone);

        if(existingName && existingEmail && existingPhone){
          console.log("This contact already exists.".bgBrightYellow);
          return;
        }else if(existingEmail && existingPhone) {
          console.log("This email and phone already exists. Choose anothers!".bgBrightYellow);
          return;
        }else if(existingName && existingPhone) {
          console.log("This name and phone already exists. Choose anothers!".bgBrightYellow);
          return;
        }else if(existingName && existingEmail) {
          console.log("This name and email already exists. Choose anothers!".bgBrightYellow);
          return;
        }else if(existingName) {
          console.log("This name already exists. Choose another!".bgBrightYellow);
          return;
        }else if(existingEmail) {
          console.log("This email already exists. Choose another!".bgBrightYellow);
          return;
        }else if(existingPhone) {
          console.log("This phone already exists. Choose another!".bgBrightYellow);
          return;
        }
  //     //########################################################################################

         if(name && email && phone){
          // creiaza un id
            const newContactId = randomUUID();
          //creem un nou obiect cu datele din consola
             const newContacts ={
               id:newContactId,
               name,
               email,
               phone
             }
           //scriem noul obiect in contacts  
           contacts.push(newContacts);
           //scriem obiectul contacts in fisierul contacts.json
           await fs.writeFile(contactsPath, JSON.stringify(contacts), { encoding: 'utf8' } );
           console.log("The contact has ben created!".bgBrightGreen);
           console.log(`${newContactId}, ${name}, ${email}, ${phone}`);
          } else{
            console.log("The contact dose not have all required parameters!".bgBrightRed);
            }
          
    } catch (err) {
     console.log(err);
    }
  }
   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6
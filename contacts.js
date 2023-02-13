const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId.toString());
  if (!contact) {
    return null;
  }
  console.log(contact);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((item) => item.id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}

async function addContact(name, email, phone) {
  const id = v4();
  const contacts = await listContacts();
  const newContacts = { id, name, email, phone };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };

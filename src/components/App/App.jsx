import {
  parseDataFromLS,
  saveContactsToLS,
} from 'components/LocalStorageService/LocalStorageService';
import { useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Contacts, Container, NoContactsMessage, Title } from './App.styled';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(parseDataFromLS(STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (parseDataFromLS(STORAGE_KEY).length > contacts.length) return;
    saveContactsToLS(STORAGE_KEY, contacts);
  }, [contacts]);

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewContact = newContact => {
    const sameContact = contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (sameContact !== undefined) {
      return alert(`${sameContact.name} is already in contacts!`);
    }
    setContacts([...contacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
    setFilter('');
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm submitHandler={addNewContact} />
      <Contacts>Contacts</Contacts>
      {contacts.length !== 0 ? (
        <>
          <Filter inputHandler={value => setFilter(value)} filter={filter} />
          {filteredContacts.length !== 0 ? (
            <ContactList
              contacts={filteredContacts}
              deleteContact={deleteContact}
            />
          ) : (
            <NoContactsMessage>No matches found</NoContactsMessage>
          )}
        </>
      ) : (
        <NoContactsMessage>
          There are no contacts yet. Please fill the form to add a new one!
        </NoContactsMessage>
      )}
    </Container>
  );
};

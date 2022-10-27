import {
  parseDataFromLS,
  saveContactsToLS,
} from 'components/LocalStorageService/LocalStorageService';
import { useState, useEffect, useRef } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Contacts, Container, NoContactsMessage, Title } from './App.styled';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isContactsParsedFromLS = useRef(true);
  const isContactDeleted = useRef(false);

  useEffect(() => {
    if (isContactsParsedFromLS.current) {
      setContacts(parseDataFromLS(STORAGE_KEY));
      isContactsParsedFromLS.current = false;
      return;
    }
    if (isContactDeleted.current) {
      isContactDeleted.current = false;
      return;
    }
    saveContactsToLS(STORAGE_KEY, contacts);
  }, [contacts]);

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewContact = newContact => {
    const sameContact = contacts.find(({ name }) => {
      return name.toLowerCase() === newContact.name.toLowerCase();
    });
    if (sameContact !== undefined) {
      return alert(`${sameContact.name} is already in contacts!`);
    }
    setContacts([...contacts, newContact]);
  };

  const filterInputHandler = value => setFilter(value);

  const deleteContact = contactId => {
    const newArray = contacts.filter(({ id }) => id !== contactId);
    setContacts(newArray);
    filterInputHandler('');
    isContactDeleted.current = true;
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm submitHandler={addNewContact} />
      <Contacts>Contacts</Contacts>
      {contacts.length !== 0 ? (
        <>
          <Filter inputHandler={filterInputHandler} filter={filter} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <NoContactsMessage>
          There are no contacts yet. Please fill the form to add a new one!
        </NoContactsMessage>
      )}
    </Container>
  );
};

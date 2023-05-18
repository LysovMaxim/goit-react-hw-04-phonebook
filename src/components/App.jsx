import { useState, useEffect } from 'react';
import { Contacts } from './Contacts';
import { Filter } from './Filter';
import { Forma } from './Forma';
import { nanoid } from 'nanoid';
import { ContainerForm } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(pravState => [contact, ...pravState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visiblContacts = getVisibleContacts();

  return (
    <ContainerForm>
      <h1>Phonebook</h1>
      <Forma onSubmit={addContacts} arr={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={visiblContacts} onDeleteContacts={deleteContact} />
    </ContainerForm>
  );
};

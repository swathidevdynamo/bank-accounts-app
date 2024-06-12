import React from 'react';
import { List, ListItem, DeleteIcon, Text } from './StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListComponent = ({ accounts, onDelete }) => (

  <List>
    {accounts?.map((account, index) => (
      <ListItem key={index}>
          <Text>{account?.iban}</Text>
          <DeleteIcon onClick={() => onDelete(account)}>
            <FontAwesomeIcon icon={faTrash} />
          </DeleteIcon>
      </ListItem>
    ))}
  </List>
);

export default ListComponent;

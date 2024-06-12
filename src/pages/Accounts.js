// Accounts.js
import React, { useEffect, useCallback } from 'react';
import FormComponent from '../components/FormComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { saveBankAccounts, fetchInitialAccounts, deleteBankAccounts, setTheme } from '../redux/actions';
import { generateBankCode, generateBankAccountNumber, generateTheme } from '../utils/helpers';
import ListView from '../components/ListComponent';
import { Container, LoadingSpinner, ListHeader, ListContainer } from '../components/StyledComponents';


const initialValues = {
  country: '',
};

const validationSchema = Yup.object({
  country: Yup.string().required('Required'),
});

const Accounts = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.accounts);


  const fetchData = useCallback(() => {
    dispatch(fetchInitialAccounts());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (values) => {
    const bankcode = generateBankCode();
    const accountNo = generateBankAccountNumber();
    const account = { ...values, bankcode, accountNo };
    try {
      await dispatch(saveBankAccounts(account));
      fetchData();
      const theme = generateTheme(account.country); 
      dispatch(setTheme(theme));
    } catch (error) {
      console.error('Error adding account', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBankAccounts(id));
      fetchData();
    } catch (error) {
      console.error('Error deleting account', error);
    }
  };

  const fields = [
    { name: 'country', type: 'select', api: 'https://openiban.com/countries' },
  ];

  return (
    <Container>
      {/* <Button onClick={() => changeTheme('bankA')}>Bank A Theme</Button>
      <Button onClick={() => changeTheme('bankB')}>Bank B Theme</Button> */}
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        fields={fields}
      />
      <ListContainer>
      <ListHeader>Bank Account List</ListHeader>
      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}
      {!loading && data?.length > 0 && (
        <ListView accounts={data} onDelete={handleDelete} />
      )}
      </ListContainer>
    </Container>
  );
};

export default Accounts;

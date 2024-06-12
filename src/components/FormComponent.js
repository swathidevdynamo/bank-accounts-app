import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  StyledForm,
  StyledField,
  Label,
  Select,
  Button,
  ErrorMessage as ErrorText
} from './StyledComponents';

const FormComponent = ({ initialValues, validationSchema, onSubmit, fields }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const optionsData = await Promise.all(fields.map(async field => {
          if (field.type === 'select' && field.api) {
            const response = await fetch(field.api);
            const data = await response.json();
            return Object.entries(data).map(([key, value]) => ({ key, value }));
          }
          return [];
        }));
        setOptions(optionsData);
      } catch (error) {
        console.error('Error fetching options', error);
      } finally {
        setOptionsLoading(false);
      }
    };
    fetchOptions();
  }, [fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      setIsSubmitting(true);
      await onSubmit(formValues);
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        {fields.map(({ name, type }, index) => (
          <StyledField key={name}>
            <Label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Label>
            {type === 'select' && (
              <Select
                name={name}
                id={name}
                value={formValues[name]}
                onChange={handleChange}
                disabled={optionsLoading}
              >
                <option value="">Select {name}</option>
                {!optionsLoading && options[index]?.map(option => (
                  <option key={option.value} value={option.value}>{option.key}</option>
                ))}
              </Select>
            )}
            {formErrors[name] && <ErrorText>{formErrors[name]}</ErrorText>}
          </StyledField>
        ))}
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default FormComponent;

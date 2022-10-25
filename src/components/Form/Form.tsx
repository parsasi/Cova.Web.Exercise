import { forwardRef , useImperativeHandle } from 'react'
import { Input } from "@chakra-ui/input";
import { FormControl , FormErrorMessage } from '@chakra-ui/react';
import { Container } from "@chakra-ui/layout";
import { useFormik } from "formik";
import { pokemonSearchSchema } from "../../validation/pokemon";
import { PokemonSearchForm } from '../../interfaces/pokemon';

interface FormProps {
  setCurrentPokemonSearching: React.Dispatch<React.SetStateAction<string>>;
}

export const Form = forwardRef(({ setCurrentPokemonSearching}: FormProps , pokemonFormRef) => {
    // You must use all properties below
  const { values, errors, handleSubmit, handleBlur , handleChange } = useFormik<PokemonSearchForm>({
    initialValues: {
      searchValue: "",
    },
    validationSchema: pokemonSearchSchema,
    onSubmit: (values : PokemonSearchForm) => {
      setCurrentPokemonSearching(values.searchValue);
    },
  });

  useImperativeHandle(pokemonFormRef, () => ({
    submitSearch: handleSubmit
  }))


  return (
    <Container bg="white">
        <FormControl isInvalid={Boolean(errors.searchValue)} >
          <Input placeholder="Type to search"  textColor="black" isInvalid={Boolean(errors.searchValue)} name="searchValue" onChange={handleChange} value={values.searchValue}/>
          {errors.searchValue ? <FormErrorMessage>{errors.searchValue}</FormErrorMessage> : <></>}
        </FormControl>
    </Container>
  );
});

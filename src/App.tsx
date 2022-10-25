import { useState , useRef } from "react";
import {
  Button,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Highlight,
  Image,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import useSWR from "swr";
import { Form  } from "./components";
import type { PokemonFormRef } from './components'
import { getPokemonAbilities } from "./services/pokemon";
import { PokemonAbility } from './interfaces/pokemon'


const Title = ({ title, query }: { title: string; query: string }) => (
  <Center>
    <Heading padding={3}>
      <Highlight
        query={query}
        styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
      >
        {title}
      </Highlight>
    </Heading>
  </Center>
);

function App() {
  const toast = useToast();
  const [currentPokemonSearching, setCurrentPokemonSearching] = useState("");
  const { data: pokemonAbilities , isValidating } = useSWR(
    [currentPokemonSearching, "PokemonAbilities"],
    getPokemonAbilities,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data?.length) {
          toast({
            title: "Abilities Found",
            description: "We have found some abilities for your pokemon",
            status: "success",
          });
        }
      },
      onError(err) {
        toast({
          title: "Pokemon Not Found",
          description: "We could not find a Pokemon with that name",
          status: "warning",
        });
      },
    }
  );

  const pokemonFormRef = useRef<PokemonFormRef>();

  const title = currentPokemonSearching
    ? `You are currently searching for ${currentPokemonSearching}`
    : "Please search for a pokemon and pick some abilities.";

  const handleOnSubmitForm = () => {
    if(pokemonFormRef.current){
      pokemonFormRef.current.submitSearch();
    }
  };

  return (
    <ChakraProvider>
      <Title title={title} query={currentPokemonSearching} />
      <Center>
        <Flex color="white" gap="16px" padding="2">
          <Center>
            <Form setCurrentPokemonSearching={setCurrentPokemonSearching} ref={pokemonFormRef} />
          </Center>
          <Center>
            <UnorderedList>
              {(pokemonAbilities ?? []).map(({ name, url, image } : PokemonAbility) => (
                <ListItem color="teal.500" key={url}>
                  {name}
                  {image ? <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={image}
                    alt={name}
                  /> : <></>}
                </ListItem>
              ))}
            </UnorderedList>
          </Center>
        </Flex>
      </Center>
      <Center>
        <Button onClick={handleOnSubmitForm} colorScheme="teal" size="md" disabled={isValidating}>
          Search Pokemon
        </Button>
      </Center>
    </ChakraProvider>
  );
}

export default App;

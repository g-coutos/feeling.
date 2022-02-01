import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { PhraseCard } from "../../components/Card/PhraseCard";
import { CommentsList } from "../../components/Card/CommentsList";
import { Header } from "../../components/Header";

import jumping from "../../assets/jumping.svg";
import { MdDataSaverOn } from "react-icons/md";
import { useComments } from "../../provider/CommentsContext";
import { usePhrases } from "../../provider/PhrasesContext";
import { useState } from "react";

export const FellasComments = ({ onOpen }) => {
  const { fraseComments } = useComments();
  const { phrases } = usePhrases();
  const [selection, setSelection] = useState({});
  const otraFrase = (id) => {
    const selected = phrases.find((item) => item.id === id);
    setSelection(selected);
  };

  return (
    <>
      <Header />
      <Flex flexDirection="column" alignItems="center">
        <Flex
          w={["300px", "320px", "600px", "750px"]}
          h={["150px", "150px", "150px", "200px"]}
          justifyContent={["flex-start"]}
          alignItems={["center"]}
        >
          <Flex
            w={["300px", "320px", "100%", "100%"]}
            fontSize={["3xl", "3xl", "4xl", "5xl"]}
            fontWeight="medium"
            justifyContent={["space-between"]}
            alignItems={["center"]}
          >
            <Flex
              w={["300px", "320px", "450px", "450px"]}
              fontSize={["3xl"]}
              fontWeight="medium"
              flexWrap={["wrap"]}
              justifyContent={["flex-start"]}
              alignItems={["center"]}
            >
              <Text pr={["7px"]} color="orange.500">
                Comentários
              </Text>
              <Text>da Galera</Text>
              <Text color="orange.500">!</Text>
            </Flex>
            <Box
              as="button"
              color="yellow.500"
              fontSize={["40px", "40px", "50px", "60px"]}
              onClick={onOpen}
            >
              <MdDataSaverOn />
            </Box>
          </Flex>
        </Flex>
        <Flex
          w={["0", "0", "600px", "750px"]}
          justify={["center", "center", "flex-end", "flex-end"]}
          pos="relative"
        >
          <Flex
            display={["none", "none", "flex", "flex"]}
            pos="absolute"
            top="0"
            left="0"
            zIndex={1}
          >
            <Image
              src={jumping}
              alt="jumping"
              h="auto"
              w={["0", "0", "400px", "450px"]}
            />
          </Flex>
          <Box>
            <PhraseCard
              //   frase="Suba o primeiro degrau com fé. Não é necessário que você veja a
              // escada toda. Apenas dê o primeiro passo."
              author="Martin Luther King"
              frase={selection.phraseText}
              pos="absolute"
              top={0}
              right="0"
              zIndex={0}
            />
          </Box>
        </Flex>

        <CommentsList array={fraseComments} />
      </Flex>
    </>
  );
};

/* eslint-disable prettier/prettier */
import { Flex, VStack, Spacer, Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";

const Files: NextPage = () => {
  const handleDownload = () => {
    // TODO: needs backend func - https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  };

  return (
    <Flex flex="1" flexDirection="row" border="0px" padding="5px" pb="47px">
      <VStack p="5px">
        <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">1. MUTANTV2.GLTF</a>
        </Text>
        <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">2. MUTANTV2.GLB</a>
        </Text>
        <Text fontFamily="body_regular" fontWeight="400" fontSize="9px" lineHeight="10px">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/bankless-shirt.png">3. MUTANTV2.PNG</a>
        </Text>
      </VStack>
      <Spacer />
      <Box p="5px" pr="10px">
        <Box onClick={handleDownload} border="1px solid #000000" boxShadow="0px 1px 4px 1px rgba(0, 0, 0, 0.6)" py="5px" px="11px">
          <Text fontFamily="body_regular" fontWeight="400" fontSize="9px">
            DOWNLOAD ALL
          </Text>
        </Box>
      </Box>
    </Flex>
  )
};

export default Files;

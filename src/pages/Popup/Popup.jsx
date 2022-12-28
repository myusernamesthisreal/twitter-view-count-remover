import { Box, Flex, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [globalEnable, setGlobalEnable] = useState(false);

  const handleGlobalEnable = async () => {
    try {
      await chrome.storage.sync.set({ globalEnable: !globalEnable });
      setGlobalEnable(!globalEnable);
    } catch (error) {
      console.log(error);
    }
  }

  const onLoad = async () => {
    try {
      const { globalEnable } = await chrome.storage.sync.get('globalEnable');
      console.log(globalEnable);
      setGlobalEnable(globalEnable);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onLoad();
  }, [])

  return (
    <Box bgColor="gray.800" h="100vh" overflow="hidden">
      <Box bgColor="blue.900" h="3rem" w="100%">
        <Text textColor="white" fontSize="xl" ms="1rem" pt="0.5rem" textAlign="center">Twitter Views Remover</Text>
      </Box>
      <Flex mt="0.5rem">
        <Switch colorScheme="cyan" ms="1rem" mt="0.5rem" onChange={handleGlobalEnable} isChecked={globalEnable} />
        <Text textColor="white" fontSize="md" ms="1rem" mt="4px" >Enabled</Text>
      </Flex>
      <Text mt="2rem" textAlign="center" fontSize="sm" textColor="white" >A refresh is required to see any changes!</Text>
    </Box>
  );
};

export default Popup;

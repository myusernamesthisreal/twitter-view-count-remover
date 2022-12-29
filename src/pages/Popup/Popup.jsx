import { Box, Button, Flex, Input, Switch, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [globalEnable, setGlobalEnable] = useState(false);
  const [moveViews, setMoveViews] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [newUsername, setNewUsername] = useState("");

  const handleGlobalEnable = async () => {
    try {
      await chrome.storage.sync.set({ globalEnable: !globalEnable });
      setGlobalEnable(!globalEnable);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMoveViews = async () => {
    try {
      await chrome.storage.sync.set({ moveViews: !moveViews });
      setMoveViews(!moveViews);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUsernameAdd = async () => {
    try {
      if (newUsername === "") return;
      if (usernames.includes(newUsername)) return;
      const newArr = [...usernames, newUsername];
      await chrome.storage.sync.set({ usernames: newArr });
      setUsernames(newArr);
      setNewUsername("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleUsernameRemove = async (username) => {
    try {
      const newArr = usernames.filter((item) => item !== username);
      await chrome.storage.sync.set({ usernames: newArr });
      setUsernames(newArr);
    } catch (error) {
      console.log(error);
    }
  }

  const onLoad = async () => {
    try {
      const { globalEnable } = await chrome.storage.sync.get('globalEnable');
      setGlobalEnable(globalEnable ?? false);
      const { usernames } = await chrome.storage.sync.get('usernames');
      setUsernames(usernames ?? []);
      const { moveViews } = await chrome.storage.sync.get('moveViews');
      setMoveViews(moveViews ?? false);
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
        <Text textColor="white" fontSize="md" ms="1rem" mt="4px" >{globalEnable ? "Enabled" : "Disabled"}</Text>
      </Flex>

      {globalEnable && <Flex mt="0.5rem">
        <Switch colorScheme="cyan" ms="1rem" mt="0.5rem" onChange={handleMoveViews} isChecked={moveViews} />
        <Text textColor="white" fontSize="md" ms="1rem" mt="4px" >Move Views After Likes</Text>
      </Flex>}

      {globalEnable && !moveViews && <Box mt="1rem" mx="1rem">
        <Text textColor="white" fontSize="md" mt="4px" >Whitelisted Usernames:</Text>
        <Box maxH="6rem" mt="0.5rem" overflowY="scroll">
          {usernames?.map((username, index) => {
            return <Tag key={index} size="sm" ms="0.5rem" mb="0.5rem" bgColor="cyan.600" textColor="white">
              <TagLabel>{username}</TagLabel>
              <TagCloseButton onClick={() => handleUsernameRemove(username)} />
            </Tag>
          })}
        </Box>

        <Flex mt="1rem">
          <Input placeholder="Enter username" textColor="white" size="sm" value={newUsername} onChange={((e) => setNewUsername(e.target.value))} onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUsernameAdd();
            }
          }} />
          <Button colorScheme="cyan" textColor="white" size="sm" ms="0.5rem" onClick={handleUsernameAdd}>Add</Button>
        </Flex></Box>}

      <Text mt="1rem" textAlign="center" fontSize="sm" textColor="white" >A refresh is required to see any changes!</Text>
    </Box >
  );
};

export default Popup;

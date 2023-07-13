/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from './chat-room.module.css';
import close from './image/close.svg';
import { closeChatRoom } from '../../../redux/reducers/chat-reducer';
import { createMessage, changeMessageStatus } from '../../../http/messageAPI';
import { saveCountUnreadMessages, saveCountUnreadDialogs } from '../../../redux/reducers/unread-reducer';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from "axios";

const socketIO = io('http://178.172.173.84:5030');

export function ChatRoom({ username }) {
  const dialogId = useSelector(state => state.chatIsOpen.chatRoomId);
  const chatRoomUserName = useSelector(state => state.chatIsOpen.chatRoomUserName);
  const chatRoomUserId = useSelector(state => state.chatIsOpen.chatRoomUserId);
  const userData = useSelector(state => state.userData.userData);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [messagesArch, setMessagesArch] = useState([]);
  const [inputValue, setInputValue] = useState('');

  async function changeMessageStatusToRead() {
    let message = await changeMessageStatus({ dialogId, partnerId: userData.id });
    await getNewMessages()
  }

  let userId = userData.id;
  async function getNewMessages() {
    try {
      const unreadMessages = await axios.get(`http://178.172.173.84:5000/api/message/unread/${userId}`)
      dispatch(saveCountUnreadMessages(unreadMessages.data.length));
      if (unreadMessages.data.length > 0) {
        let newMessagesData = [];
        unreadMessages.data.forEach(el => {
          newMessagesData.push(el.dialogId)
        })
        const res = newMessagesData.reduce((acc, i) => {
          if (acc.hasOwnProperty(i)) {
            acc[i] += 1;
          } else {
            acc[i] = 1;
          }
          return acc;
        }, {})
        let countOfDialogs = res;
        dispatch(saveCountUnreadDialogs(countOfDialogs));
      }
      dispatch(saveCountUnreadDialogs({}));
    }
    catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  useEffect(() => {
    socketIO.on('response', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socketIO.off('response');
    };
  }, [])

  useEffect(() => {
    getAllMessages()
    changeMessageStatusToRead()
    getNewMessages()

  }, []);




  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'instant' });
      });
    }
  }, [])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '' && username) {
      const newMessage = {
        text: inputValue,
        sender: username,
        socketId: socketIO.id,
        partner: chatRoomUserId,

      };
      setInputValue('');
      let createdMessage = await createMessage({ ...newMessage, senderId: userData.id, dialogId, partnerId: chatRoomUserId })
      socketIO.emit('response', newMessage);
    }
  };

  async function getAllMessages() {
    const response = await axios.get(`http://178.172.173.84:5000/api/message/dialog/${dialogId}`)
    setMessagesArch(response.data);
  }

  return (
    <div className={styles.chat} ref={messageEl} id="chat">
      <div className={styles.chat_header}>
        {chatRoomUserName}
        <img className={styles.chat_header_close} src={close} alt="close" onClick={() => dispatch(closeChatRoom())} />
      </div>
      <div className={styles.chatbody}  >
        {messagesArch.length > 0 && messagesArch.map((message, index) => (
          <div key={index} className={styles.chat_message_text}>
            <strong>{message.senderId === userData.id ? userData.name : chatRoomUserName}:</strong> {message.text}
          </div>
        ))}
        {messages.map((message, index) => (
          <div key={index} className={styles.chat_message_text}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className={styles.chat_message_block}>
        <input className={styles.chat_input} type="text" placeholder="Введите сообщение" value={inputValue} onChange={handleInputChange} onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSendMessage();
          }
        }} />
        <button className={styles.chat_button} type="submit" onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default ChatRoom;

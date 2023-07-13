import styles from './chat.module.css';
import dots from './image/dots.svg';
import close from './image/close.svg';
import user from './image/user.svg';
import search from './image/search.svg';
import { openChat, openChatRoom } from '../../../redux/reducers/chat-reducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDialog } from '../../../http/dialogAPI';
import { ChatRoom } from '../chat-room';
import axios from "axios";

export function Chat({ username }) {

  const myDialogs = useSelector(state => state.myDialogs.myDialogs);
  const chatRoom = useSelector(state => state.chatIsOpen.chatRoomIsOpen);
  const countUnreadMessages = useSelector(state => state.unreadMessages.unreadDialogs);
  const [newChatIsOpen, setnewChatIsOpen] = useState(false);
  const [searchIsOpen, setsearchIsOpen] = useState(false);
  const [name, setSearchValue] = useState("");
  const [foundNameUser, setFoundNameUser] = useState("");
  const userData = useSelector(state => state.userData.userData);
  const dispatch = useDispatch();

  async function searchUser() {
    try {
      if (name === "") {
        return
      } else {
        const foundUser = await axios.get(`http://178.172.173.84:5000/api/user/getuser/${name}`)
        if (foundUser.data === null) {
          setFoundNameUser(null)
        } else {
          setFoundNameUser(foundUser.data)
        }
      }
    }
    catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async function chekDialog() {

    if (myDialogs.length > 0) {

      for (let dialog of myDialogs) {
        if (dialog.author === userData.id && dialog.partner === foundNameUser.id) {
          dispatch(openChatRoom({ chatRoomId: dialog.id, chatRoomUserName: dialog.dataValues.name, chatRoomUserId: foundNameUser.id }))
        } else {
          let createdDialog = await createDialog({ author: userData.id, partner: foundNameUser.id })
          dispatch(openChatRoom({ chatRoomId: createdDialog.data[0].id, chatRoomUserName: foundNameUser.name, chatRoomUserId: foundNameUser.id }))
        }
      }
    } else {
      let createdDialog = await createDialog({ author: userData.id, partner: foundNameUser.id })
      dispatch(openChatRoom({ chatRoomId: createdDialog.data[0].id, chatRoomUserName: foundNameUser.name, chatRoomUserId: foundNameUser.id }))
    }

  }

  return (
    <div className={styles.wrapper}>
      {chatRoom ? <ChatRoom username={userData.name} /> :
        <div className={styles.chat}>
          <div className={styles.chat_header}>
            {searchIsOpen ? "Новый чат" : "Сообщения"}
            <img className={styles.chat_header_dots} src={dots} alt="dots" onClick={() => setnewChatIsOpen(!newChatIsOpen)} />
            <img className={styles.chat_header_close} src={close} alt="close" onClick={() => dispatch(openChat())} />
            {newChatIsOpen &&
              <div className={styles.newchat_btn} onClick={() => { setsearchIsOpen(true); setnewChatIsOpen(false) }}>
                <img className={styles.newchat_icon} src={user} alt="user" />
                Новый чат
              </div>
            }
          </div>
          <div className={styles.chatbody}>
            {searchIsOpen ? <div>
              <div className={styles.search_input}>
                <input className={styles.header__search_input} type="text" name="search" id="search" placeholder='Введите пользователя' value={name} onChange={(event) => setSearchValue(event.target.value)} />
                <div className={styles.header__functional_item} onClick={() => { searchUser(); setSearchValue("") }} >
                  <img src={search} alt="search" />
                </div>
              </div>
              {foundNameUser &&
                <div className={styles.chat_user} onClick={() => { chekDialog() }}>
                  <strong> {foundNameUser.name}  {foundNameUser.surname} </strong>
                </div>
              }
              {foundNameUser === null &&
                <div className={styles.chat_notuser}>Пользователь не найден</div>
              }
            </div> :
              <div>
                {myDialogs.map((dialog, index) => (
                  <div key={index} className={styles.chat_user} onClick={() => dispatch(openChatRoom({ chatRoomId: dialog.id, chatRoomUserName: dialog.dataValues.name, chatRoomUserId: dialog.dataValues.id }))}>
                    <strong> {dialog.dataValues.name}</strong>
                    {dialog.id in countUnreadMessages && <div className={styles.header__new_message}>
                      {countUnreadMessages[dialog.id]}
                    </div>}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      }
    </div >
  )
}

export default Chat;
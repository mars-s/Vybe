import { fb } from 'service';
import { createContext, useState, useEffect, useContext } from 'react';
import { newChat, deleteChat, leaveChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext()

export const ChatProvider = ({ children, authUser }) => {
    const [myChats, setMyChats] = useState()
    const [chatConfig, setChatConfig] = useState()
    const [selectedChat, setSelectedChat] = useState()

    const createChatClick = () => {
        newChat(chatConfig, { title: ''})
    }
    const deleteChatClick = chat => {
        const isAdmin = chat.admin ===  chatConfig.userName

        if (
            isAdmin &&
            window.confirm('Are you sure you want to delete this chat')
        ) {
            deleteChat(chatConfig, chat.id)
        } else if (window.confirm('Are you sure you want to leave this chat')) {
            leaveChat(chatConfig, chat.id, chatConfig.userName)
        }
    }
    const selectChatClick = chat => {
        getMessages(chatConfig, chat.id, messages => {
            setSelectedChat({
                ...chat,
                messages,
            })
        })
    }

    useEffect(() => {
        if (authUser) {
            fb.firestore
            .collection('ChatUsers')
            .doc(authUser.uid)
            .onSnapshot(snap => {
                setChatConfig({
                    userSecret: authUser.uid,
                    avatar: snap.data().avatar,
                    userName: snap.data().userName,
                    projectID: '0b5f4236-3960-4f8a-9f9d-b68443bfa95f'
                })
            })
        }
    }, [authUser])

    return (
        <ChatContext.Provider 
            value={{
                myChats,
                setMyChats,
                chatConfig,
                selectedChat,
                setChatConfig,
                setSelectedChat,
                selectChatClick,
                deleteChatClick,
                createChatClick,
            }}
        >
            {children}
        </ChatContext.Provider>
            
    )
}

export const useChat = () => {
    const {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
    } = useContext(ChatContext)

    return {
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
    }
}
import { useChat } from "components/context/ChatContext"
import { useEffect } from "react"

export const Chat = () => {
  const { chatConfig } = useChat()

  useEffect(() => {
    console.log(chatConfig)
  }, [chatConfig])

  return <>I am the chat</>
}
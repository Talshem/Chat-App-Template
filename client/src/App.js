import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'

function App() {
const [messages, setMessages] = useState([])
const [user, setUser] = useState('')
const [inputValue, setInputValue] = useState('')


useEffect(() => {
let randomNumber = Math.floor(Math.random() * 2000) + 1 
setUser(`Guest#${randomNumber}`) 
const loadMessages = async () => {
await axios.get('/messages').then((res) => setMessages(res.data))
}; loadMessages();
setInterval(loadMessages, 1000)
}, [])


const postMessage = async (e) => {
e.preventDefault()
await axios.post('/messages', {
user: user,
body: inputValue
})
setInputValue('')
}

  return (
    <div>
  <form onSubmit={postMessage}>
<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} id="messageInput" required/>  
<button id="sendButton" type="submit">Send</button> 
 </form>

<input id="changeUserInput" value={user} onChange={(event) => setUser(event.target.value)}/>

<div className='messagesContainer'>
{messages.map(message => {
return (
<div className={message.user === user ? 'msg my-msg' : 'msg other-msg'} key={messages.indexOf(message)}>
<strong>{message.user}:</strong>
<br/>
{message.body}
</div>
)})}
</div>

    </div>
  );
}

export default App;

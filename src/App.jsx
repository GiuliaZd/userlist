import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const [user, setUser] =useState({});
  const [userID, setUserID]=useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(resData => setUsers(resData.data))
  }, []);

  const fetchData =()=>{
    fetch('https://reqres.in/api/users/' + userID)
    .then(response=>{
      if (response.status ==!200) {
        throw new Error('response status not OK')
      }
      return response.json();})
    .then(resData=>setUser(resData.data))
    .catch(err=>console.error(err))
  }
  const inputChanged=(event)=>{
    setUserID(event.target.value);
  }

  return (
    <>
      <table>
        <tbody>
        {
          users.map((u) => 
           <tr key={u.id}>
             <td>{u.first_name}</td>
             <td>{u.last_name}</td>
             <td>{u.email}</td>
             <td><img alt="avatar" src={u.avatar} /></td>
           </tr>
          )
        }
        </tbody>
      </table>

      <input placeholder="User ID" value={userID} onChange={inputChanged}/>
      <button onClick={fetchData}>Fetch</button>
      <p>{user.first_name} {user.last_name} {user.email}</p>
     </>
  );
}

export default App;
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(resData => setUsers(resData.data))
  }, []);

  return (
    <>
      <table>
        <tbody>
        {
          users.map((user) => 
           <tr key={user.id}>
             <td>{user.first_name}</td>
             <td>{user.last_name}</td>
             <td>{user.email}</td>
           </tr>
          )
        }
        </tbody>
      </table>
     </>
  );
}

export default App;
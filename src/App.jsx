import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(resData => setUsers(resData.data))
  }, []);

  const [keyword, setKeyword]=useState('')
  const [repos, setRepos]=useState([]);
  const fetchRepos=()=>{
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(response=>response.json())
    .then((responseData)=>{setRepos(responseData.items)})
  };
  const iChanged =(event)=>{
    setKeyword(event.target.value)
  }


  const [user, setUser] =useState({});
  const [userID, setUserID]=useState('');
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

  const [question, setQuestion] = useState('');
  const fetchQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=1")
    .then(response => response.json())
    .then(data =>setQuestion(data.results[0].question)
    )
    .catch(err => console.error(err))
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
      <h2>Repositiories</h2>
      <input type="text" onChange={iChanged} value={keyword}/>
      <button onClick={fetchRepos}>Search</button>
      <table>
        <tbody>
           <tr><th>Name</th><th>URL</th></tr>
        {
          repos.map((r) => 
           <tr key={r.id}>
             <td>{r.full_name}</td>
             <td><a href={r.html_url}>{r.html_url}</a></td>
           </tr>
          )
        }
        </tbody>
      </table>  
       
      <input placeholder="User ID" value={userID} onChange={inputChanged}/>
      <button onClick={fetchData}>Fetch</button>
      <p>{user.first_name} {user.last_name} {user.email}</p>

      <p>{question}</p>
      <button onClick={fetchQuestion}>New Question</button>
    </>
  );
}

export default App;
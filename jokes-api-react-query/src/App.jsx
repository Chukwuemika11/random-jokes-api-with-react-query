import React, {useState} from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query';
// https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw
function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let baseURL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw"
  // const queryClient = useQueryClient();
 const {data, error, isLoading}= useQuery({
  queryKey: ['jokes'],
  queryFn: ()=>
  fetch(baseURL)
  .then(res => res.json()
  ),
 })

 if (error) return <div>There was an error</div>
 if (isLoading) return <div>Data is loading</div>

 function setUsersName(event) {
  setName(event.target.value);
 }

 function handleSubmit() {
  setSubmitted(true);
 }

  return (
    <>
    <p>type your name to get a ramdom joke</p>
    <div>
      <input type="text"
      value={name}
      onChange={setUsersName}
      />
      <button onClick={handleSubmit}>submit</button>
    </div>
        {submitted && data && (
         <div>
            <h4>ID: {data.id}</h4>
            <h4>jokes: {data.jokes}</h4>
            <h4>setup: {data.setup}</h4>
            <h4>delivery: {data.delivery}</h4>
         </div>
        )}
     </>
  )
}

export default App

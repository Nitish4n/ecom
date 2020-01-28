import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {

  const [news, setNews ] = useState([])
  const [searchQuery, setSearchQuery ] = useState('react')
  const [url, setUrl ] = useState(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)

  const [loading, setLoading ] = useState(false)
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), (setLoading(false))))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchNews()
  }, [url])

  const textChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const submitChangeHandler = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  return(
    <div>
      <h1>News Channel</h1>
      <form onSubmit={submitChangeHandler} >
        <input type="text" value={searchQuery} onChange={textChange} />
        <input type="submit" />
      </form>
      {loading ? <h2>Loading </h2> : news.map((n, i) => (
        <p key={i}>{n.title}</p>
      ))}
      
    </div>
  )



}



// class App extends Component 
// {

//   state = {
//     count : 0
//   }

  
//   increment = () => {
//     this.setState({
//       count : this.state.count + 1
//     })
//   }

//   componentDidMount(){
//     document.title = `Clicked ${this.state.count}`
//   }

//   componentDidUpdate(){
//     document.title = `Clicked ${this.state.count}`
//   }


//   render(){
//     return (
//       <div>
//         <h1>Counter App</h1>
//           <button onClick={this.increment}>Cicked {this.state.count} times</button>
//       </div>
//     )
//   }
// }

export default App;

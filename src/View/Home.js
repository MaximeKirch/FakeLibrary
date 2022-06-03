import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Book from '../components/Book'

export default function Home() {

    const [books, setBooks] = useState([])
    
    const fetchBooks = () => {
        axios.get('/books')
            .then((response) => {setBooks(response.data)})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchBooks()
        console.log('Fetch books')
    }, [])


    return (
       <div className="main">
        {   books &&
            books.map((element, index) => (
                <li key={index}>
                <Book id={element._id} title={element.title} author={element.author} gender={element.gender} picture={element.picture} />
                </li>
        ))}

        </div> 
    )
}

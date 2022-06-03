import React, { useState } from 'react'
import axios from 'axios'
import '../styles.css'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const navigation = useNavigate()
    const [title, setTitle] = useState("Titre")
    const [author, setAuthor] = useState('Auteur')
    const [gender, setGender] = useState("Genre")

    
    
    
    const handleSend = () => {
        axios
            .post('/books', {title: title, author: author, gender:gender})
            .then((response) => alert('Votre livre a bien été enregistré'))
            .catch(err => console.log(err))
            
        navigation('/')
    }
  return (
    <div className='main'>
        <h2>Vous souhaitez ajouter un nouveau livre ?</h2>

        <div className='containerForm'>
            <form className="createForm">
                <label> Titre : </label>
                <input type='text' value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                <label> Auteur : </label>
                <input type="text" value={author} name='author' onChange={(e) => setAuthor(e.target.value)} />
                <label> Genre : </label>
                <input type='text' value={gender} name='gender' onChange={(e) => setGender(e.target.value)} />

            </form>
                <button onClick={() => handleSend()}> Envoyer </button>
        </div>
    
    </div>
  )
}

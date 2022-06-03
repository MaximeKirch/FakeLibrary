import React, { useState } from 'react'
import axios from 'axios'
import '../styles.css'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    const navigation = useNavigate()
    const [title, setTitle] = useState("Titre")
    const [author, setAuthor] = useState('Auteur')
    const [gender, setGender] = useState("Genre")
    const [picture, setPicture] = useState("Votre image")

    
    
    
    const handleSend = () => {
        axios
            .post('/books', {title: title, author: author, gender:gender})
            .then((response) => alert('Votre livre a bien été enregistré'))
            .catch(err => console.log(err))
            
        navigation('/')
    }
  return (
      <div className="container">
    <div className='main'>
        <h2 style={{textAlign:"center"}}>Vous souhaitez ajouter un nouveau livre ?</h2>

{   title !== "Titre" && 
        <div className="bookPreview">
            <div>
                <img src={picture} style={{height:"200px", width:"150px"}} alt="PreviewPic" />
            </div>
            <div className="bookPreviewDesc">
                <h2>{title}</h2>
                <h3>{author}</h3>
                <p style={{fontStyle:"initial"}}>{gender}</p>
            </div>

        </div>
}

        <div className='editForm'>
            <form style={{display: 'flex', flexDirection:'column', width:'90%'}}>
                <label className='editLabel'> Titre  </label>
                <input className="inputEdit" type='text' value={title} name="title" onChange={(e) => setTitle(e.target.value)} />
                <label className="editLabel"> Auteur  </label>
                <input className="inputEdit" type="text" value={author} name='author' onChange={(e) => setAuthor(e.target.value)} />
                <label className="editLabel"> Genre  </label>
                <input className="inputEdit" type='text' value={gender} name='gender' onChange={(e) => setGender(e.target.value)} />
                <label className="editLabel"> image  </label>
                <input className="inputEdit" type='text' value={picture} name='picture' onChange={(e) => setPicture(e.target.value)} />

            </form>
                <button className="sendModifBtn" onClick={() => handleSend()}> Envoyer </button>
        </div>
    
    </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function BookDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [bookDetail, getBookDetail] = useState()
    const [bookTitle, setBookTitle] = useState()
    const [bookAuthor, setBookAuthor] = useState()
    const [bookGender, setBookGender] = useState()
    const [bookPicture, setBookPicture] = useState()

    useEffect(() => {
        axios
            .get(`/books/${params.id}`)
            .then((response) => getBookDetail(response.data))
            .catch(err => console.log(err))
    }, [])

    const updateInfos = () => {

        if(!bookTitle || !bookGender || !bookAuthor) {
        axios
            .patch(`/books/${params.id}`,  {title: bookTitle, author: bookAuthor, gender: bookGender, picture: bookPicture})
            .then((response) => { if(response.status===200) alert('Vos modifications ont bien été enregistrées'); console.log(response)})
            .then(navigate('/'))
            .catch(err => console.log(err))

        } else alert('Vous ne pouvez pas envoyer des champs vides !')
    }


  return (
    <div className='main'>
    { bookDetail !== undefined && 
    <div className="editContainer">
    <div className='detailInfo'>
        <img style={{height: "200px", width: "150px", marginBottom:"10px"}} src={bookDetail.picture !== undefined ? bookDetail.picture : bookPicture} alt='Book' />
        <h1>{bookDetail.title}</h1>
        <h3>{bookDetail.author}</h3>
        <h4>{bookDetail.gender}</h4>
    </div>
    
        <div style={{display :" flex", marginTop:"20px"}}>
            <p style={{fontStyle:"italic"}}> Des informations vous semblent erronnées ? Modifiez les ici !</p>
        </div>
        
        <div className='editForm'>
            <form style={{display: 'flex', flexDirection:'column', width:'90%'}}>
                <label className="editLabel">Titre </label>
                <input className="inputEdit"type='text'  value={bookTitle !== undefined ? bookTitle : bookDetail.title} onChange={(e) => setBookTitle(e.target.value)}/>
                <label className="editLabel">Auteur  </label>
                <input className="inputEdit" type='text' value={bookAuthor !== undefined ? bookAuthor : bookDetail.author} onChange={(e) => setBookAuthor(e.target.value)} />
                <label className="editLabel"> Genre  </label>
                <input className="inputEdit" type='text' value={bookGender !== undefined ? bookGender : bookDetail.gender} onChange={(e) => setBookGender(e.target.value)}/>
                <label className="editLabel"> Image </label>
                <input className="inputEdit" type='text' value={bookPicture !== undefined ? bookPicture : bookDetail.picture} onChange={(e) => setBookPicture(e.target.value)} placeholder="Lien vers l'image"/> 
            </form>
            <button className="sendModifBtn"  onClick={() => updateInfos()}>Envoyer les modifications</button>
        </div>
        </div>
    }
    </div>
  )
}

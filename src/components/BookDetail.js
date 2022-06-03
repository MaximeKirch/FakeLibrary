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

        if(bookTitle || bookGender || bookAuthor) {
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
    <>
    <div className='detailInfo'>
    <div>
        <img style={{height: "200px", width: "150px"}} src={bookDetail.picture !== undefined ? bookDetail.picture : bookPicture} alt='Book' />
    </div>
        <h1>{bookDetail.title}</h1>
        <h3>{bookDetail.author}</h3>
        <h4>{bookDetail.gender}</h4>
    </div>
        <div style={{display :" flex"}}>
            <p> Des informations vous semblent erronnées ? Modifiez les ici !</p>
        </div>
        
        <div className='editForm'>
            <form style={{display: 'flex', flexDirection:'column', marginLeft:'20px', width: '600px'}}>
                <label>Titre :</label>
                <input type='text' value={bookTitle} onChange={(e) => setBookTitle(e.target.value)}/>
                <label>Auteur : </label>
                <input type='text' value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} />
                <label> Genre : </label>
                <input type='text' value={bookGender} onChange={(e) => setBookGender(e.target.value)}/>
                <label> Image :</label>
                <input type='text' value={bookPicture} onChange={(e) => setBookPicture(e.target.value)} placeholder="Lien vers l'image"/> 
            </form>
            <button style={{width: "200px", height: "50px", backgroundColor:'peachpuff', color:"white", marginTop: "20px"}} onClick={() => updateInfos()}>Envoyer les modifications</button>
        </div>
        </>
    }
    </div>
  )
}

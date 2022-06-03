import React from 'react'
import '../styles.css'
import { Link } from 'react-router-dom'

export default function Book({title, author, gender, id, picture }) {
  
  return (
    <div className="BookComponent">
    { picture !== undefined &&
    <div>
            <img style={{height: "200px", width: "200px", maxWidth: "150px"}} src={picture} alt='Book' />
        </div>
    }
    <div className='bookDesc'>
      <h2 className='bookTitle'>{title}</h2>
      <h4 className='bookAuthor'>{author}</h4>
      <p className='bookGender'>{gender}</p>
      <Link style={{background: "black"}} to={`/detail/${id}`} key={id}><button  id="modifyBook"> Modifier les informations </button></Link>
      </div>
    </div>
  )
}

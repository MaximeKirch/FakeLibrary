import React from 'react'
import {
    BrowserRouter as Router,
   Link,
   Route,
   Routes
   } from 'react-router-dom'
import '../styles.css'
import Home from '../View/Home'
import Create from '../View/Create'
import BookDetail from './BookDetail'
import NotFound from './NotFound'

export default function Navbar() {
    return(
    <Router>
    <div style={{width : "100%"}} >
        <nav className='navBar'>
        <div>
        <h2 id="FakeLib">FAKELIB</h2>
        </div>
        <div className="navbarMenu">
            <ul style={{display: 'flex', alignItems:"center", flexDirection:"row"}}>
                <li>
                    <Link id="navHome" to='/'>Accueil</Link>
                </li>
                <li >
                    <Link to='/create'>
                    <button id='addBook' >Ajouter un livre</button>
                    </Link>
                </li>
            </ul>
            </div>

        </nav>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/detail/:id' element={<BookDetail/>}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
    </div>
</Router>
    )
}

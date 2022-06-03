const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Book = require('./model/Book')
const body = require('body-parser')
const path = require('path')
const PORT = 3000

mongoose.connect("mongodb+srv://root:azerty@cluster0.8mzpdbe.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser : true}).then(console.log("MongoDB Connected"))
app.use(express.json())
// Add Middlewares 
app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(express.static('public'))



// Book Routes
    // Get all books
app.get('/books', async(req, res) => {
    const books = await Book.find()
    res.status(200).json(books)
})

    // Get one book
app.get('/books/:id', async(req, res) => {
    const id = req.params.id
    const book = await Book.findOne({_id : id})
    res.status(200).json(book)
})

    // Register a new book 

app.post('/books', async (req,res) => {
    const {title} = req.body
    const {author} = req.body
    const {gender} = req.body
    const {picture} = req.body


    if(!title || !gender || !author) {
        res.status(400).send('Une information est manquante pour enregistrer votre livre.')
        return
    }

    const newBook = new Book({
        title: title,
        author: author,
        gender : gender,
        picture: picture
    })

    await newBook.save()
    res.status(201).json(newBook)
    return
})

    // Update a book 
app.patch('/books/:id', async (req,res) => {
    const id = req.params.id
    const book = await Book.findOne({_id: id})

    // Get values to update
    const title = req.body.title
    const author = req.body.author
    const gender = req.body.gender
    const picture = req.body.picture

    // Values are correct ? 

    if(title) book.title = title
    if(author) book.author = author
    if(gender) book.gender = gender
    if(picture) book.picture = picture

    await book.save()
    res.json(book)
})

    // Delete a book 

app.delete('/:id', async(req,res) => {
    const id = req.params.id
    const del = await Book.deleteOne({_id : id})
    res.status(200).json(del)
})


// Start listening on port 3000
app.listen(PORT, () => {
    console.log(`Listening on port`+ PORT ) 
})
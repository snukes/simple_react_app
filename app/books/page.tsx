'use client'

import React, {useEffect, useState} from "react";
import { getBooks, postBook } from "@/services/bookService";
import { Book } from "@/types";
import s from './books.module.css'
import { useLocalStorage } from "@/hooks/useStorage";

const Page = () => {

  const defaultBook: Book = {
    id: '',
    title: '',
    author: '',
    price: 0
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [formInputs, setFormInputs] = useState<Book>(defaultBook);
  const [value, setValue] = useLocalStorage('book', defaultBook)

  useEffect(() => {
    getBooks()
      .then((books: Book[]) => {
        console.log("useeffect books")
        console.log(books)
        setBooks(books);
      })
  }, [])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type} = event.target;

    setFormInputs(values => ({...values, [name]: type === 'number' ? parseFloat(value) : value}))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formInputs);
    postBook(formInputs)
      .then((book: Book) => {
        setBooks([...books, book])
        setValue(book)
      })
  }


  const listBooks = () => {
    return books.map((book: Book) => {
      return (
        <li className={s.bookRow} key={book.id}>
          <div><span>Title:</span>{book.title}</div>
          <div><span>Author:</span>{book.author}</div>
          <div><span>Price:</span>${book.price}</div>
        </li>
      )
    })
  }

  const lastBook = () => {
    if (value.id == '') return <></>
    return (
      <div>
        <p>Last Book Submitted:</p>
        <p>{value.title} by {value.author}</p>
      </div>
    )
  }

  return (
    <>
      <h1>Books page</h1>
      <h3 className={s.subHeading}>All the books in your library are listed here</h3>
      <ul className={s.bookList}>{listBooks()}</ul>

      <div className={s.formContainer}>
        <h3>Add a new book</h3>
        <form onSubmit={handleSubmit}>
          <label>Title: <input type="text" name="title" onChange={handleChange}/></label>
          <label>Author: <input type="text" name="author" onChange={handleChange}/></label>
          <label>Price: <input type="number" step=".01" name="price" onChange={handleChange}/></label>
          <input type="submit" />
        </form>

        {lastBook()}
      </div>
    </>
  )
}

export default Page;
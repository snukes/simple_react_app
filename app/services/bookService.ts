import { get, post } from './apiClient';
import { Book, User } from '@/types';

export type getBooksResponse = Book[];
export type postBookResponse = Book;
export type getUserResponse = User;


const isGetBooksResponse = (data: unknown): data is getBooksResponse => {
  return Array.isArray(data) && (data.length == 0 || data[1].title)
}

export const getBooks = async (): Promise<getBooksResponse> => {
  const resp = await get("books")
  if (isGetBooksResponse(resp)) {
    return resp;
  } else {
    throw new Error('[BookService] error parsing get response data from API')
  }
}

const isPostBookResponse = (data: unknown): data is postBookResponse => {
  return typeof data === 'object' && data != null && data.hasOwnProperty('title')
}

export const postBook = async (data: Book): Promise<postBookResponse> => {
  const resp = await post("books", {}, data)
  console.log(resp)
  if (isPostBookResponse(resp)) {
    return resp;
  } else {
    throw new Error('[BookService] error parsing post response data from API')
  }
}

const isUserResponse = (data: unknown): data is getUserResponse => {
  return typeof data === 'object' && data != null && data.hasOwnProperty('name')
}

export const getUser = async (): Promise<getUserResponse> => {
  const resp = await get("user")
  if (isUserResponse(resp)) {
    return resp;
  } else {
    throw new Error('[BookService] error parsing get user response data from API')
  }
}
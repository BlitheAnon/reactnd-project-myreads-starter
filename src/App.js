import React from 'react'
// 使用提供的api获取动态图书数据
import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     // 通过Route链接页面跳转
    books:[],
    searchResult:[]
  }

  // 添加生命周期事件，在组件插入 DOM 之后立即被调用
  componentDidMount() {
      // 异步数据请求所有数数据
      BooksAPI.getAll().then((books) => {
          this.setState({books: books})
          console.log('react声明周期getAll');
          console.log(books);
      })
  }

  // 更新移动图书后的图书数据到服务器
  updateBooks(book,shelf){
        BooksAPI.update(book,shelf).then(result=>{
            console.log('update');
            console.log(result);
                BooksAPI.getAll().then((books) => {
                    this.setState({books: books})
                    console.log('updateBooks getAll');
                    console.log(books);
                })

        })
    }

    // 选中option
handleChange(bookid,event) {
    // console.log(event.target.value);
    // console.log(bookid);
    // 更新书架图书
    this.updateBooks({
        id: bookid
    }, event.target.value)
}



// 输入后查询
handleSearch(event) {
    //判断输入为空时不操作
    if (event.target.value.trim()==='') {
        this.setState({searchResult: []})
        return
    }
    // 取得查询的图书数据
    BooksAPI.search(event.target.value).then((result) => {
        console.log('search');
         console.log(result);
        // 查询结果不存在时
        // console.log(Array.isArray(result));

        if (Array.isArray(result)) {
            this.setState({searchResult: result})
        }else {
            this.setState({searchResult: []})
        }
    })
}


  render() {
    //取得state内主页图书数据
    const showingBooks=this.state.books
    //搜索页图书数据
    const searchResult=this.state.searchResult

    return (
      <div className="app">

        <Route path='/search' render={({history})=>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
              <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearch.bind(this)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {searchResult.map((book)=>(
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value="none" onChange={this.handleChange.bind(this,book.id)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                  ))}
              </ol>
            </div>
          </div>
          )}/>

          <Route path='/' exact render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {showingBooks.filter( book => book.shelf === "currentlyReading" ).map((book)=>(
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={this.handleChange.bind(this,book.id)}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.filter( book => book.shelf === "wantToRead" ).map((book)=>(
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={this.handleChange.bind(this,book.id)}>
                                      <option value="move" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.filter( book => book.shelf === "read" ).map((book)=>(
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={this.handleChange.bind(this,book.id)}>
                                      <option value="move" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                              </div>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link to='/search' className="open-search">
              <button onClick={()=>{this.setState({searchResult:[]})}}>Add a book</button>
            </Link>
          </div>
          )}
          />

      </div>
    )
  }
}

export default BooksApp

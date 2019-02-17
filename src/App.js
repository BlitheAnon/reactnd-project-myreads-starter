import React from 'react'
// 使用提供的api获取动态图书数据
import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'

// 导入子组件
import BooksSearch from './BooksSearch'


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
handleChange(bookid,shelf) {
    // console.log(event.target.value);
    // console.log(bookid);
    // 更新书架图书
    this.updateBooks({
        id: bookid
    }, shelf)
}

// 输入后查询
handleSearch(data) {
    //判断输入为空时不操作
    if (data==='') {
        this.setState({searchResult: []})
        return
    }

    // 取得查询的图书数据
    BooksAPI.search(data).then((result) => {
        // console.log('search');
        //  console.log(result);
         let tempResult=result
         const showingBooks=this.state.books

        // 判断查询结果是否不存在
        if (Array.isArray(result)) {
            //当搜索到得图书已存在时，给搜索到的图书添加书架分类
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < showingBooks.length; j++) {
                    if (result[i].id===showingBooks[j].id) {
                        (tempResult[i])['shelf']=showingBooks[j].shelf
                        break
                    }else{
                        (tempResult[i])['shelf']='none'
                    }
                }
            }

            console.log('tempResult');
            console.log(tempResult);
            this.setState({searchResult: tempResult})

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
    //判断imageLink是否存在
    // const thumbnail = this.simageLinks ? imageLinks.thumbnail : "http://via.placeholder.com/128x192";

    return (
      <div className="app">

        <Route path='/search' render={({history})=>(
            <BooksSearch
                onHandleSearch={(input)=>{
                this.handleSearch(input)
                }}
                searchResult={this.state.searchResult}
                onHandleChange={(bookid,shelf)=>{
                    this.handleChange(bookid,shelf)
                }}
            />
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

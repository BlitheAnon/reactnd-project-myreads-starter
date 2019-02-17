// 导入react组件
import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class BooksSearch extends Component {
    // constructor() {
    //
    // }

    handleInput=(event)=>{
        // 取得输入对象
        const value= event.target.value.trim()
        // 将输入值传递给父组件
        if(this.props.onHandleSearch){
            this.props.onHandleSearch(value)
        }
    }

    handleChange=(bookid,event)=>{
        // 取得选中option
        const shelf= event.target.value.trim()
        // 将输入值传递给父组件
        if(this.props.onHandleChange){
            this.props.onHandleChange(bookid,shelf)
        }
    }

    render(){
        const searchResult=this.props.searchResult
        return(
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
                  <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {searchResult.map((book)=>(
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.smallThumbnail:"http://via.placeholder.com/128x192"})` }}></div>
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
        )
    }
}

//导出组件
export default BooksSearch

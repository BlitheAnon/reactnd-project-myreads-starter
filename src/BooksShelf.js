import React,{Component} from 'react'

class BooksShelf extends Component{
    // constructor() {
    //
    // }
    handleChange=(bookid,event)=>{
        // 取得选中option
        const shelf= event.target.value.trim()
        // 将输入值传递给父组件
        if(this.props.onHandleChange){
            this.props.onHandleChange(bookid,shelf)
        }
    }

    render(){
        const showingBooks=this.props.showingBooks
        const shelfTitle=this.props.shelfTitle
        const shelfType=this.props.shelfType
        return(
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {showingBooks.filter( book => book.shelf === shelfType ).map((book)=>(
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
        )
    }
}

//导出书架子组件
export default BooksShelf

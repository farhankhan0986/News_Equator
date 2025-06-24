import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <span class="badge rounded-pill bg-danger"style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}} >{source}
        </span>
          <img src={imageUrl ? imageUrl : "https://images.bild.de/6853c067d89474609437aaad/fa5bd2ae39a81a23f66d339fc95535fc,7286ea58?w=1280"} className="card-img-top"  alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text" style={{ color: 'white' }} ><small >By-{author ? author : "Unknown"} || {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
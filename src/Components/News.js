import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    category: 'general',
    size: 8
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    size: PropTypes.number
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalize(this.props.category)} - NewsEquator`;
  }

  updateNews = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8164f9b5c559433a94cf83f22dfe7f0c&page=${this.state.page}&pageSize=${this.props.size}`;
    this.setState({ loading: true });
    this.props.setProgress(30);

    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  onPrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  onNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchData = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8164f9b5c559433a94cf83f22dfe7f0c&page=${this.state.page}&pageSize=${this.props.size}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ loading: false });
        this.setState({
          articles: this.state.articles.concat(parsedData.articles || []),
          totalResults: parsedData.totalResults || 0,
          loading:false
        });
        
      }
    );
};


  render() {
    return (
      <>
      
        <h1 className='text-center' style={{ color: 'crimson', margin: '30px 0px' }}>
          {`NewsEquator - Top ${this.capitalize(this.props.category)} Headlines`}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}  
          next={this.fetchData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}>

            <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  />
              </div>
            );
          })}
        </div>
        </div>
        
          </InfiniteScroll>
      </>
    );
  }
}

export default News;

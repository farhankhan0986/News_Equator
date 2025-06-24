import React, { useState,useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8164f9b5c559433a94cf83f22dfe7f0c&page=${page}&pageSize=${props.size}`;
    setLoading(true);
    props.setProgress(30);

    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsEquator`;
    updateNews();
    //eslint-disable-next-line
  },[])
  

  // const onPrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // };

  // const onNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // };

  const fetchData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8164f9b5c559433a94cf83f22dfe7f0c&page=${page+1}&pageSize=${props.size}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(prev => prev.concat(parsedData.articles || []));
        setTotalResults(parsedData.totalResults || 0);
      }
    



    return (
      <>
      
        <h1 className='text-center' style={{ color: 'crimson', margin: '30px 0px' ,marginTop:"90px"}}>
          {`NewsEquator - Top ${capitalize(props.category)} Headlines`}
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}  
          next={fetchData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>

            <div className="container">
        <div className="row">
          { articles.map((element) => {
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

News.defaultProps = {
    country: 'us',
    category: 'general',
    size: 8
  };

 News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    size: PropTypes.number
  };





export default News;

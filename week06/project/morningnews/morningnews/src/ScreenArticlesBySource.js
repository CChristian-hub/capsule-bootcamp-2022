import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const { Meta } = Card;


function ScreenArticlesBySource(props) {

  const [articleList, setArticleList] = useState([])
  const { id } = useParams();
  const [modalInfo, setModalInfo] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      let apiKey = 'your api key'
      var url = 'https://newsapi.org/v2/top-headlines?sources=' + id + '&apiKey=' + apiKey + '&language=' + props.languageSelected
      var rawResponse = await fetch(url)
      var response = await rawResponse.json()
      for (const elem of response.articles) {
        setArticleList(prevState => [...prevState, elem])
      }
      console.log(response);
    }
    loadData();
  }, [id]);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  var handlerMoreDesc = (articleTitle, articleDescription, articleUrl, articleImg) => {
    setModalInfo({ title: articleTitle, description: articleDescription, url: articleUrl, img: articleImg })
    showModal()
  }

  console.log(cookies.get('token'))
  console.log(props.languageSelected)

  const addToWishList = async (article) => {
    let rawData = await fetch('/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userToken}&content=${article.content}&title=${article.title}&url=${article.url}&urlToImage=${article.urlToImage}&language=${props.languageSelected}`
    })
    let temp = await rawData.json()
    console.log(temp)
    // props.addToWishList(article)
  }

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleList.map((article, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              style={{ width: 300, margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <Icon type="read" key="ellipsis2" onClick={() => handlerMoreDesc(article.title, article.content, article.url, article.urlToImage)} />,
                <Icon type="like" key="ellipsis" onClick={() => addToWishList(article)} />
              ]}
            >
              <Meta title={article.title} description={article.content} />
            </Card>
          </div>
        ))}
        < Modal title={modalInfo.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <img style={{ width: 470, height: 200 }} src={modalInfo.img} alt="modalPicture" />
          <p>{modalInfo.description}</p>
          <a href={modalInfo.url}>Full article</a>
        </Modal>
      </div >
    </div >

  );
}

function mapStateToProps(state) {
  return { languageSelected: state.language, userToken: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: 'addArticle', article })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenArticlesBySource);


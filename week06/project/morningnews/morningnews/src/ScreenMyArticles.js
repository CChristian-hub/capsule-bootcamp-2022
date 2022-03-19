import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const { Meta } = Card;

function ScreenMyArticles(props) {

  console.log(cookies.get('token'))
  console.log(props.languageSelected)
  const [myArticles, setMyArticles] = useState([])
  const [modalInfo, setModalInfo] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function getMyArticles() {
      let rawData = await fetch('/getTest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.myToken}`
      })
      let temp = await rawData.json()
      let tab = []
      console.log(temp);
      console.log(temp.user)
      for (const elem of temp.user.articles) {
        tab.push(elem);
      }
      setMyArticles(tab);
    }
    getMyArticles();
  }, []);


  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);
  var handlerMoreDesc = (articleTitle, articleDescription, articleUrl, articleImg) => {
    setModalInfo({ title: articleTitle, description: articleDescription, url: articleUrl, img: articleImg })
    showModal()
  }

  const deleteArticle = async (title) => {
    console.log(title)
    let rawData = await fetch('/deleteArticle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.myToken}&title=${title}`
    })
    let temp = await rawData.json()
    let tab = []
    for (const elem of temp.user.articles) {
      tab.push(elem)
    }
    setMyArticles(tab);
  }

  let articles = myArticles.map((elem, i) => {
    if (elem.language === props.languageSelected) {
      return (
        <div div key={i} style={{ display: 'flex', justifyContent: 'center' }
        }>
          <Card
            style={{ width: 300, margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            cover={<img alt="example" src={elem.urlToImage} />}
            actions={[
              <Icon onClick={() => handlerMoreDesc(elem.title, elem.content, elem.url, elem.urlToImage)} type="read" key="ellipsis2" />,
              <Icon onClick={() => deleteArticle(elem.title)} type="delete" key="ellipsis" />
            ]}
          >
            <Meta
              title={elem.title}
              description={elem.content}
            />
          </Card>
        </div >
      )
    }
  })

  var msgStyle = {
    display: 'none'
  }

  if (articles.length === 0) {
    msgStyle = {}
  }

  return (
    <div>
      <Nav />
      <div className="Banner">
        <span>
          <img style={{ width: 70, borderRadius: '50%', cursor: 'pointer', margin: 10 }} onClick={() => props.setLanguage('fr')} src='/images/fr.svg' alt="frenchflag" />
          <img style={{ width: 70, borderRadius: '50%', cursor: 'pointer', margin: 10 }} onClick={() => props.setLanguage('en')} src='/images/gb.svg' alt="britainflag" />
        </span>
      </div>
      <div className="Card">
        <h1 style={msgStyle}>No articles</h1>
        {articles}
        < Modal title={modalInfo.title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <img style={{ width: 470, height: 200 }} src={modalInfo.img} alt="modalPicture" />
          <p>{modalInfo.description}</p>
          <a href={modalInfo.url}>Full article</a>
        </Modal>
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { articlesToDisplay: state.myArticles, myToken: state.token, languageSelected: state.language }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (title) {
      dispatch({ type: 'deleteArticle', title })
    },
    setLanguage: function (language) {
      dispatch({ type: 'setLanguage', language })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
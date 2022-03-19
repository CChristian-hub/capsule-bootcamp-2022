import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])

  useEffect(() => {
    async function reloadData() {
      let apiKey = 'your api key'
      var rawResponse = await fetch('https://newsapi.org/v2/top-headlines/sources/?language=' + props.languageSelected + '&apiKey=' + apiKey)
      var response = await rawResponse.json()
      setSourceList([])
      for (const elem of response.sources) {
        setSourceList(prevState => [...prevState, elem])
      }
    }
    reloadData();
  }, [props.languageSelected]);

  console.log(cookies.get('token'))
  console.log(props.languageSelected)


  return (
    <div>
      <Nav />
      <div className='Banner'>
        <span>
          <img style={{ width: 70, borderRadius: '50%', cursor: 'pointer', margin: 10 }} onClick={() => props.setLanguage('fr')} src='/images/fr.svg' alt="frenchflag" />
          <img style={{ width: 70, borderRadius: '50%', cursor: 'pointer', margin: 10 }} onClick={() => props.setLanguage('en')} src='/images/gb.svg' alt="britainflag" />
        </span>
      </div>
      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={'//logo.clearbit.com/' + item.url} />}
                title={
                  <Link to={"/screenarticlesbysource/" + item.id}>
                    {item.name}
                  </Link>
                }

                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}



function mapStateToProps(state) {
  return { languageSelected: state.language }
}

function mapDispatchToProps(dispatch) {
  return {
    setLanguage: function (language) {
      dispatch({ type: 'setLanguage', language })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);


import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, ButtonGroup, Button, Col, Card, CardBody, CardImg, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faVideo, faStar } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';


function Movie(props) {
	//! States
	const [watchMovies, setWatchMovies] = useState(0); // no clue
	const [countWatchMovie, setCountWatchMovie] = useState(0); // Number
	const [myMovieRating, setMyMovieRating] = useState(0); // Number of stars

	//! Handlers
	var handleClickLike = (movieName, movieImg) => props.handleClickAddMovieParent(movieName, props.isLiked, movieImg);

	var handleClickCamera = (movieName) => {
		setWatchMovies(true);
		setCountWatchMovie(countWatchMovie + 1);
	}
	var handleClickRatingMinus = () => {
		if (myMovieRating > 0) {
			setMyMovieRating(myMovieRating - 1)
		}
	}
	var handleClickRatingPlus = () => {
		if (myMovieRating < 10) {
			setMyMovieRating(myMovieRating + 1);
		}
	}

	//! Style for icons
	var likeStyle = { cursor: 'pointer' }
	if (props.isLiked) {
		likeStyle = { cursor: 'pointer', color: "#e74c3c" };
	}
	var colorWatch = {}
	if (watchMovies) {
		colorWatch = { color: '#e74c3c' }
	}

	//! Detection of the user's rating
	let AvgRating = props.globalRatingCount;
	if (myMovieRating) {
		AvgRating++;
	}
	//! Sum of Average Rating
	var rating = props.globalRating;
	if (myMovieRating !== 0) {
		rating = ((props.globalRating * props.globalRatingCount) + myMovieRating) / (props.globalRatingCount + 1);
	}
	rating = Math.round(rating);

	//! Star array filling
	var starListMe = [];
	var starListAverage = [];
	for (let i = 0; i < 10; i++) {
		var colorGlobal = {}
		var colorMe = {}
		if (i < rating) {
			colorGlobal = { color: '#f1c40f' }
		}
		if (i < myMovieRating) {
			colorMe = { color: '#f1c40f' }
		}
		starListAverage.push(<FontAwesomeIcon key={i} style={colorGlobal} icon={faStar} />)
		starListMe.push(<FontAwesomeIcon key={i} onClick={() => setMyMovieRating(i + 1)} style={colorMe} icon={faStar} />)
	}

	return (
		<Col xs="12" lg="6" xl="4">
			<Card style={{ 'margin': '10px', 'wordBreak': 'break-all' }}>
				<CardImg alt="Movie banner" src={props.movieImg} top width="100%" />
				<CardBody>
					<CardText>
						<p>Like <FontAwesomeIcon style={likeStyle} onClick={() => handleClickLike(props.movieName, props.movieImg)} className="heartIcon" icon={faHeart} /></p>
						<p>Nombre de vues <FontAwesomeIcon style={colorWatch} onClick={() => handleClickCamera(props.movieName)} icon={faVideo} /> <Badge> {countWatchMovie} </Badge></p>
						<span>Mon avis {starListMe}
							<ButtonGroup size="sm">
								<Button onClick={() => handleClickRatingMinus()}>-1</Button>
								<Button onClick={() => handleClickRatingPlus()}>+1</Button>
							</ButtonGroup>
						</span>
						<p>Moyenne {starListAverage} ({Math.round(AvgRating)})</p>
						<p>Titre: {props.movieName}</p>
						<p>{props.movieDesc.slice(0, 80)}...</p>
					</CardText>
				</CardBody>
			</Card>
		</Col >
	)
}

export { Movie }
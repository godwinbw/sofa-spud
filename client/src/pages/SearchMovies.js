import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  CardColumns,
  CardGroup,
} from "react-bootstrap";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { SAVE_SHOW } from "../utils/mutations";
import { SEARCH_FOR_TITLES } from "../utils/queries";

//import { searchMovieDatabase } from '../utils/API';
import { saveTitleIds, getSavedTitleIds } from '../utils/localStorage';

const SearchMovies = () => {
  const [searchedTitles, setSearchedTitles] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [saveTitle, { error }] = useMutation(SAVE_SHOW);
  const [searchForTitles, { loading, data }] = useLazyQuery(SEARCH_FOR_TITLES);

  // this is local storage stuff, will comment out for now

  
  const [savedTitleIds, setSavedTitleIds] = useState(getSavedTitleIds());

  
  useEffect(() => {
    return () => saveTitleIds(savedTitleIds);
  });
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchForTitles({ variables: { searchString: searchInput } });

    /*
    try {
      //const response = await searchMovieDatabase(searchInput);

      //if (!response.ok) {
      //  throw new Error('something went wrong!');
      //}

      // don't need to convert response to json
      //const { items } = await response.json();

      const movieData = items.map((movie) => ({
        movieId: movie.id,
        imdbId: movie.imdbId,
        title: movie.title,
        titleType: movie.titleType,
        year: movie.year,
        plot: movie.plot,
        imageUrl: movie.imageUrl,
        //thumbRating: movie.thumbRating
      }));

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
    */
  };

  
  const handleSaveTitle = async (titleId) => {
    const titleToSave = searchedTitles.find(
      (title) => title.titleId === titleId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveTitle(titleToSave, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedTitleIds([...savedTitleIds, titleToSave.titleId]);
    } catch (err) {
      console.error(err);
    }
  };
  

  // check to see if we are searching for movies
  if (loading) {
    return <p>Searching for your shows...</p>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
      {/* <CardColumns> */}
        <h2>
          {data &&
          data.searchForTitlesTmdbApi &&
          data.searchForTitlesTmdbApi.length
            ? `Viewing ${data.searchForTitlesTmdbApi.length} results:`
            // "Search for a movie to begin"
            : ""}
        </h2>
        {console.log("data => ", data)}
        {data && data.searchForTitlesTmdbApi ? (
          <Card style={{ width: '19rem' }}>
            {data.searchForTitlesTmdbApi.map((movie) => {
              return (
                <Row>
                <CardGroup>
                <Card key={movie.imdbId} border="dark">
                  {movie.imageUrl ? (
                    <Card.Img
                      src={movie.imageUrl}
                      alt={`The poster for ${movie.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className="small">Type: {movie.titleType}</p>
                    <Card.Text>{movie.plot}</Card.Text>

                    {/*
                      need to implement local storage to keep track of saved movies

                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedMovieIds?.some(
                            (savedMovieId) => savedMovieId === movie.movieId
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveBook(movie.movieId)}
                        >
                          {savedMovieIds?.some(
                            (savedMovieId) => savedMovieId === movie.movieId
                          )
                            ? "This Movie has already been saved!"
                            : "Save this Movie!"}
                        </Button>
                      )}
                          */}
                  </Card.Body>
                </Card>
                </CardGroup>
                </Row>
              );
            })}
          </Card>
        ) : null}
        {/* </CardColumns> */}
      </Container>
    </>
  );
};

export default SearchMovies;

import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { removeTitleId } from "../utils/localStorage";

import { GET_USER } from "../utils/queries";
import { REMOVE_SHOW } from "../utils/mutations";

const SavedShows = () => {
  const { loading, data } = useQuery(GET_USER);
  const userData = data?.user || [];

  const [removeShow, { error }] = useMutation(REMOVE_SHOW);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteShow = async (imdbId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeShow({
        variables: { imdbId: imdbId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      removeTitleId(imdbId);
    } catch (err) {
      console.error(error);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // sync localStorage with what was returned from the userData query
  //const savedBookIds = userData.savedBooks.map((book) => book.bookId);

  //saveBookIds(savedBookIds);

  return (
    <>
      <Jumbotron fluid className="text-light bg-primary">
        <Container>
          <h1>Viewing saved shows!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.watchListCount
            ? `Viewing ${userData.watchListCount} saved ${
                userData.watchListCount === 1 ? "show" : "shows"
              }:`
            : "You have no saved shows!"}
        </h2>
        <CardColumns>
          {userData.watchList.map((title) => {
            return (
              <Card key={title.imdbId} border="dark">
                {title.imageUrl ? (
                  <Card.Img
                    src={title.imageUrl}
                    alt={`The poster for ${title.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{title.title}</Card.Title>
                  <p className="small">{title.titleType}</p>
                  <p className="small">{title.year}</p>
                  <Card.Text>{title.plot}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteShow(title.imdbId)}
                  >
                    Delete this Show!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedShows;

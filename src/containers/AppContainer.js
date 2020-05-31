import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css';
import { Container, Row } from 'react-bootstrap';
import HeaderContainer from 'containers/HeaderContainer';
import ContentContainer from 'containers/ContentContainer';

function App() {
  return (
    <Container className={'vh-100'} fluid>
      <Row className={'outerContainer headerContainer'}>
        <HeaderContainer />
      </Row>
      <Row className={'outerContainer contentContainer'}>
        <ContentContainer />
      </Row>
    </Container>
  );
}

export default App;

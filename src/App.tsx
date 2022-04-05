import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Group } from '@mantine/core';
import Footer from './components/footer';
import Header from './components/header';
import Url from './pages/url'
import Nav from './components/nav';

function App() {
  return <BrowserRouter>
    <Header/>
    <Group grow>
      <Nav/>
      <Container style={{flex: '0 0 100%'}}>
        <Routes>
          <Route path="/" element={<Url/>} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </Container>
    </Group>
    <Footer/>
  </BrowserRouter>;
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Group } from '@mantine/core';
import Footer from './components/footer';
import Header from './components/header';
import Nav from './components/nav';
import Url from './pages/url'
import Text from './pages/text'

function App() {
  return <BrowserRouter>
    <Header/>
    <Group grow>
      <Nav/>
      <Container fluid style={{flex: '0 0 100%'}}>
        <Routes>
          <Route path="/" element={<Url/>} />
          <Route path="/text" element={<Text/>} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </Container>
    </Group>
    <Footer/>
  </BrowserRouter>;
}

export default App;

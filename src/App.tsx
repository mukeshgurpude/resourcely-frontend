import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Group } from '@mantine/core';
import Footer from './components/footer';
import Header from './components/header';
import Nav from './components/nav';
import Url from './pages/url'
import Text, { TextView } from './pages/text'
import MediaUploader, { MediaView, FileView } from './pages/media-uploader'
import View from './pages/view';


function App() {
  return <BrowserRouter>
    <Header/>
    <Group grow>
      <Nav/>
      <Container fluid style={{flex: '0 0 100%'}}>
        <Routes>
          <Route path='/get' element={<View/>} />
          <Route path="/" element={<Url/>} />
          <Route path="/text">
            <Route path='' element={<Text/>}/>
            <Route path=":shortcode" element={<TextView/>} />
          </Route>
          <Route path='/media'>
            <Route path='' element={<MediaUploader/>} />
            <Route path=':shortcode' element={<MediaView/>} />
          </Route>
          <Route path='/file/:shortcode' element={<FileView/>} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </Container>
    </Group>
    <Footer/>
  </BrowserRouter>;
}

export default App;

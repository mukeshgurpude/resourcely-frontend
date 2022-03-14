import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<main>Home</main>} />
      <Route path='*' element={<div>Not found</div>} />
    </Routes>
    <Footer/>
  </BrowserRouter>;
}

export default App;

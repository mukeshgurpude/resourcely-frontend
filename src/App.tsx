import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss';

function App() {
  return <BrowserRouter>
    <header>Header</header>
    <Routes>
      <Route path="/" element={<main>Home</main>} />
      <Route path='*' element={<div>Not found</div>} />
    </Routes>
    <footer>Footer</footer>
  </BrowserRouter>;
}

export default App;

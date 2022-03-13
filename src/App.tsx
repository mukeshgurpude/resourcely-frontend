import { Route, Routes } from 'react-router-dom'
import './App.scss';

function App() {
  return <>
    <header>Header</header>
    <Routes>
      <Route path="/" element={<main>Home</main>} />
      <Route path='*' element={<div>Not found</div>} />
    </Routes>
    <footer>Footer</footer>
  </>;
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home'; 
import Detail from './pages/Detail';


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6em 2.2em 0 2.2em
`;


function App() {
  return (
    <BrowserRouter>
      <Header /> {/* 헤더는 고정 */}
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

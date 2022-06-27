import './App.css';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import JobOffersList from './components/JobOffersList/JobOffersList';
import JobOfferOverview from './components/JobOfferOverview/JobOfferOverview';
import { Route, Routes } from 'react-router-dom';
import NewJobForm from './components/NewJobForm/NewJobForm';
import CandidateForm from './components/CandidateForm/CandidateForm';
import Test from './pages/Test/Test';
import Quiz from './pages/Quiz/Quiz';
import Login from './pages/Login/Login';
import CandidateProfile from './pages/CandidateProfile/CandidateProfile';

export const Layout = (props) => {
  return (
    <React.Fragment>
      <Header onLogout={props.onLogout} />
      <main className="mt80 oHidden pad15">{props.children}</main>
    </React.Fragment>
  )
};

export const Router = (props) => {
  return (
    <Routes>
      <Route path="/" element={props.children} />
      <Route path="/jobOffer/:jobOfferId" element={<JobOfferOverview />} />
      <Route path="/new" element={<NewJobForm />} />
      <Route path="/candidateForm" element={<CandidateForm />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
      <Route path="/test/:testId" element={<Test />} />
      <Route path="/profile/:userId" element={<CandidateProfile />} />
    </Routes>
  )
};

function App() {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) return (<Login onLogin={() => setIsLogged(true)} />)

  return (
    <Layout onLogout={() => setIsLogged(false)}>
      <Router>
        <JobOffersList />
      </Router>
    </Layout>
  );
}

export default App;

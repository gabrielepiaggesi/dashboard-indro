import './App.css';
import React, { useContext, useState } from 'react';
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
import AppContext from './store/app-context';
import CompaniesList from './components/CompaniesList/CompaniesList';
import NewCompanyForm from './components/NewCompanyForm/NewCompanyForm';

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
      <Route path="/jobOffers/:companyId" element={<JobOffersList />} />
      <Route path="/jobOffer/:jobOfferId" element={<JobOfferOverview />} />
      <Route path="/newJobForm/:companyId/:jobOfferId" element={<NewJobForm />} />
      <Route path="/newCompany" element={<NewCompanyForm />} />
      <Route path="/candidateForm/:jobOfferId" element={<CandidateForm />} />
      <Route path="/quiz/:quizId/:jobOfferId/:required" element={<Quiz />} />
      <Route path="/test/:testId/:quizId/:positionOrder" element={<Test />} />
      <Route path="/profile/:userId" element={<CandidateProfile />} />
    </Routes>
  )
};

function App() {
  const ctx = useContext(AppContext);

  if (!ctx.isLoggedIn) return (<Login onLogin={(data) => ctx.onLogin(data)} />)

  return (
    <Layout onLogout={ctx.onLogout}>
      <Router>
        <CompaniesList />
      </Router>
    </Layout>
  );
}

export default App;

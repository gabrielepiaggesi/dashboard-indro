const BASE_URL = 'http://localhost:8000';

let TOKEN = undefined;


const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN
  };
};

const getTokenHeaders = () => {
  return {
    'Authorization': 'Bearer ' + TOKEN
  };
};

export function setToken(token) { 
  TOKEN = token; 
}


export async function login(loginData) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${BASE_URL}/auth/login`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function getCompanyJobOffers(companyId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOffers/${companyId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function addJobOffer(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/createJobOffer`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createJobOffer');
  }
  return jsonRes;
}

export async function getUserCompanies() {
  const response = await fetch(`${BASE_URL}/company/getUserCompanies`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getUserCompanies');
  }
  return jsonRes;
}

export async function addCompany(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/company/newCompany`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function getJobOfferSkills(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferSkills/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferRequiredSkills');
  }
  return jsonRes;
}

export async function getJobOffer(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOffer/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferBonusSkills');
  }
  return jsonRes;
}

export async function getJobOfferUserApplicationsList(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferUserApplicationsList/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserApplicationsList');
  }
  return jsonRes;
}

export async function getJobOfferQuizs(jobOfferId) {
  const response = await fetch(`${BASE_URL}/quiz/getJobOfferQuizs/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferQuizs');
  }
  return jsonRes;
}

export async function addQuiz(data, jQuizId = null) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/${jQuizId && jQuizId !== 'new' ? 'updateQuiz/'+jQuizId : 'createQuiz'}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addQuiz');
  }
  return jsonRes;
}

export async function getJobOfferQuiz(quizId) {
  const response = await fetch(`${BASE_URL}/quiz/getQuiz/${quizId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getQuiz');
  }
  return jsonRes;
}


export async function addQuizTest(data, testId = null) {
  console.log(data);
  const file = data.fileDetails.file;
  let formData = new FormData();
  file && file !== '' && file !== ' ' && formData.append('file', file);
  if (data.fileDetails.file === 'cancel') data.test.file = 'cancel';
  formData.append('data', JSON.stringify(testId === 'new' ? data : data.test));
  // Object.keys(data).forEach(key => {
  //   formData.append(key, data[key]);
  // });
  const opts = {
    method: 'POST',
    body: formData,
    headers: getTokenHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/${testId && testId !== 'new' ? 'updateTest/'+testId : 'createTest'}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}


export async function getQuizTest(testId) {
  const response = await fetch(`${BASE_URL}/quiz/getTest/${testId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getQuizTest');
  }
  return jsonRes;
}

export async function updateTestOption(data, optionId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/editTestOption/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}

export async function updateTestText(data, textId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/editTestText/${textId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}

export async function createNewTestOption(data, testId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/createNewTestOption/${testId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestOption');
  }
  return jsonRes;
}

export async function createNewTestText(data, testId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/createNewTestText/${testId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}


export async function removeTestOption(optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeTestOption/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}

export async function removeTestText(textId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeTestText/${textId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}

export async function getUsersDataOptions() {
  const response = await fetch(`${BASE_URL}/jobOffer/getUsersDataOptions`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getUsersDataOptions');
  }
  return jsonRes;
}

export async function getJobOfferUserData(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferUserData/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserData');
  }
  return jsonRes;
}

export async function addJobOfferUserData(jobOfferId, optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/addJobOfferUserData/${jobOfferId}/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addJobOfferUserData');
  }
  return jsonRes;
}

export async function removejobOfferUserData(jobOfferId, optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/removejobOfferUserData/${jobOfferId}/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not removejobOfferUserData');
  }
  return jsonRes;
}

export async function updateJobOfferSkill(skill, skillId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(skill),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/updateJobOfferSkill/${skillId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not updateJobOfferSkill');
  }
  return jsonRes;
}

export async function addJobOfferSkill(skill) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(skill),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/addJobOfferSkill`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addJobOfferSkill');
  }
  return jsonRes;
}

export async function deleteJobOfferSkill(skillId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/removeJobOfferSkill/${skillId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not deleteJobOfferSkill');
  }
  return jsonRes;
}

export async function updateJobOffer(jobOffer, jobOfferId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(jobOffer),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/updateJobOffer/${jobOfferId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not deleteJobOfferSkill');
  }
  return jsonRes;
}

export async function removeTest(quizId, testId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeTest/${testId}/${quizId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not removeTest');
  }
  return jsonRes;
}


export async function removeQuiz(quizId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeQuiz/${quizId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not removeQuiz');
  }
  return jsonRes;
}

export async function getCandidateData(userId, jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getUserData/${userId}/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserData');
  }
  return jsonRes;
}

export async function getUserTestsImages(userId, jobOfferId) {
  const response = await fetch(`${BASE_URL}/userApplication/getUserTestsImages/${userId}/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getUserTestsImages');
  }
  return jsonRes;
}
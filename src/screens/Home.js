import React, { useState, useEffect } from 'react';
import { IoMdInformationCircleOutline } from "react-icons/io";
import './css/Home.css';

const Home = () => {
  const [adminMenu, setAdminMenu] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [gitHubLink, setGitHubLink] = useState('');
  const [infoMenu, setInfoMenu] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aboutMeMenu, setAboutMeMenu] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_URL;
  console.log('API Base URL:', apiBaseUrl);

  const handleAdminMenu = () => {
    setAdminMenu(!adminMenu);
    if (adminMenu) {
      setAuthSuccess(false);
      setPassword('');
      setError('');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/check-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || 'Login failed');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setAuthSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error(error);
    }
  };

  const handleUpload = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          summary: projectSummary,
          gitHubLink: gitHubLink
        })
      });
      const data = await res.json();

      if (data.success) {
        alert('Project uploaded successfully!');
        setProjectName('');
        setProjectSummary('');
        setGitHubLink('');
      } else {
        alert('Failed to upload project: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error uploading project');
      console.error(error);
    }
  };

  const handleInfo = () => {
    setInfoMenu(!infoMenu);
  };

  const handleAboutMe = () => {
    setAboutMeMenu(!aboutMeMenu);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/api/projects`);
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiBaseUrl]);

  return (
    <div className="home-container">
      <h1 className="mainTitle">Portfolio – Eden Levy</h1>
      
      <div className='infoWrapper'>
        <button className="infoButton" onClick={handleInfo}>
          <IoMdInformationCircleOutline />
        </button>
        {infoMenu && (
          <div className="adminPopUp">
            <p className='infoText'>This website was built using React, Node.js, and MongoDB.</p>
          </div>
        )}
      </div>

      <div className="buttonsWrapper">
        <div className="adminWrapper">
          <button className="adminButton" onClick={handleAdminMenu}>Admin</button>
          {adminMenu && (
            <div className="adminPopUp">
              {!authSuccess ? (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: 'none' }}
                  />
                  <button onClick={handleLogin} style={{ width: '100%', padding: '8px', cursor: 'pointer' }}>
                    Login
                  </button>
                  {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
                </>
              ) : (
                <>
                  <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder='Project Name'
                  />
                  <textarea
                    className="SummmaryInput"
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    placeholder='Project Summary'
                  />
                  <input
                    value={gitHubLink}
                    onChange={(e) => setGitHubLink(e.target.value)}
                    placeholder='Git Hub Link'
                  />
                  <button className='UploadButton' onClick={handleUpload}>Upload</button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="aboutMeWrapper">
          <button className='adminButton' onClick={handleAboutMe}>ABOUT ME</button>
          {aboutMeMenu && (
            <div className="adminPopUp">
              <p className='infoText'>
              Hi, I'm Eden Levy, a full-stack developer with broad knowledge across various fields,
               who enjoys creating new projects and growing professionally every day.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className='projectsList'>
        {loading ? (
          <div className="loadingWrapper">
            <div className="spinner"></div>
            <p>LOADING PROJECTS - THIS MAY TAKE A FEW MINUTES</p>
          </div>
        ) : (
          projects.map((proj, idx) => (
            <div key={idx} className='projectsCard'>
              <h3>{proj.name}</h3>
              <p>{proj.summary}</p>
              <a href={proj.gitHubLink} target='_blank' rel='noopener noreferrer'>GitHub</a>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Home;

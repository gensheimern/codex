import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Calender from './Calender.js';
import "./sidebars.css";


const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    backgroundColor: 'white',
    marginTop: '2%',
    height: '100%',
  },
};

const SidebarContent = (props) => {
  const links = [];

  for (let ind = 1; ind < 5; ind++) {
    links.push(
      <a key={ind} href="/groupmanager" style={styles.sidebarLink}> kommende Aktivität # {ind}</a>);
  }

  return (
    <div className="rightContent">
           <div className="calenderUnit">
            <p>Deine Events:</p>
            <Calender/>

            <hr />
            <div style={{
              position: "relative",
              top: "-30px",
              color: "white",
              backgroundColor: "grey",
              left: "80px",
              width: "40px",
            }}>Heute</div>
            <div style={{
              backgroundColor: "white",
              padding: "4%",
              borderRadius: "10px",
            }}>
              <p>Kommende Aktivität #1</p>
            </div>

            <hr />
            <div style={{
              backgroundColor: "white",
              padding: "4%",
              borderRadius: "10px",
            }}>
              <p>Kommende Aktivität #2</p>
            </div>

            <div style={styles.content}>
              <div style={styles.divider} />
              {links}
            </div>
          </div>;
  </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;

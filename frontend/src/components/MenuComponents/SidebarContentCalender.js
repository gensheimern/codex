import React from 'react';
import PropTypes from 'prop-types';
import Calender from './Calender.js';


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
    height: '100%',
    backgroundColor: 'white',
  },
};

const SidebarContent = (props) => {
  const links = [];

  for (let ind = 1; ind < 5; ind++) {
    links.push(
      <a key={ind} href="/groupmanager" style={styles.sidebarLink}> kommende Aktivität # {ind}</a>);
  }

  return (<div style={{marginTop:"20%"}}>
      <Calender/>
      <div style={styles.content}>
        <div style={styles.divider} />
        {links}
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
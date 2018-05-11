import React from 'react';
import PropTypes from 'prop-types';
import "./sidebars.css"
const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#ffffff',
    textDecoration: 'none',
  },
  content: {
    padding: '16px',
    height: '100%',
  },
};

const SidebarContent = (props) => {
  const links = [];

  for (let ind = 1; ind < 5; ind++) {
    links.push(
      <a key={ind} href="/#" className="groupName">Gruppe {ind}</a>);
  }

  return (
<div className="leftContent">
      <div style={styles.content}>
                <div className="divider" />
        <a className="highlightSidebarContent" href="activity">PUBLIC</a>
                <div className="divider" />
        <a className="highlightSidebarContent" href="activity">PERSONAL</a>
                <div className="divider" />
      <p className="groups">
      Gruppen</p>
      {links}
      </div>
</div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
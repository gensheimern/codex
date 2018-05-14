import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import logo from '../../IMG/codex_logo1x.png';

  const style = {margin: 5};

  const Avatar = () => (
    <List>
      <ListItem
        disabled={true}
        leftAvatar={
          <Avatar src="logo" />
        }
      >
        Image Avatar 
      </ListItem>
      <ListItem
        disabled={true}
        leftAvatar={
          <Avatar
            src="logo"
            size={30}
            style={style}
            
          />
        }
      >
       </ListItem>
    </List>
);

export default Avatar;

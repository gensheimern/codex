import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import config from '../../config';




export default class CreateEventInvitePeople extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      usersList : [],
      usersListConfig: {text: 'textKey', value:'valueKey'},
      groups : [],
      inviteList:[],
      inviteImageList: [],

    }
  }

  componentDidMount(){
    this.loadUsers();
  }

  loadUsers(){
    fetch(config.apiPath + "/user/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('apiToken')
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Request failed.");
        } else if (res.status !== 200) {
        throw new Error("Forbidden");
      }

      return res;
    })
    .then(res => res.json())
    .then(res => {
      this.setState({usersListLong: res});
      res.map(users => {
     this.setState({ usersList: [...this.state.usersList,{textKey: users.firstName + " " + users.name, ValueImage:users.image , ValueKey: users.id} ] })
        return true;})
    })
    .catch((err) => {
      this.setState({
        error: 'An Error occured.',
      });
    });
  }


render(){
return(
  <div>
    <AutoComplete
      ref = {"autocomplete"}
      floatingLabelText="Invite People"
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.state.usersList}
      dataSourceConfig={this.state.usersListConfig}
      maxSearchResults={5}
      onNewRequest= {(chosenRequest, index) =>{

        this.setState({ inviteList: [...this.state.inviteList, chosenRequest.ValueKey ] });
        this.setState({ inviteImageList: [...this.state.inviteImageList,{textKey: chosenRequest.textKey, ValueImage: chosenRequest.ValueImage, ValueKey: chosenRequest.ValueKey} ] })
        this.props.people(this.state.inviteImageList);
        this.refs["autocomplete"].setState({searchText:''});
      }}
    />
  </div>
)
}
}

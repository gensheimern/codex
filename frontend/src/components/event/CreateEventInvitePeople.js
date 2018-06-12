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
    this.loadGroups();

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
     this.setState({ usersList: [...this.state.usersList,{textKey: users.firstName + " " + users.name, ValueImage:users.image , ValueKey: users.id, ValueEmail:users.email} ] })
        return true;})
    })
    .catch((err) => {
      this.setState({
        error: 'An Error occured.',
      });
    });
  }

  loadGroups(){
    fetch(config.apiPath + "/team/", {
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
        res.forEach(userid => {
          console.log(userid);
          this.setState({groups:[...this.state.groups, {textKey: userid.name, ValueEmail: userid.id, ValueKey:"Group"}]})
        })
        this.setState({groups: this.state.groups.concat(this.state.usersList)})
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
      fullWidth={true}
      ref = {"autocomplete"}
      floatingLabelText="Invite People"
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.state.groups}
      dataSourceConfig={this.state.usersListConfig}
      maxSearchResults={5}
      onNewRequest= {(chosenRequest, index) =>{
        this.setState({ inviteList: [...this.state.inviteList, chosenRequest.ValueKey ] });
        this.setState({ inviteImageList: [...this.state.inviteImageList,{textKey: chosenRequest.textKey, ValueImage: chosenRequest.ValueImage, ValueKey: chosenRequest.ValueKey, ValueEmail:chosenRequest.ValueEmail} ] })
        this.props.people(this.state.inviteImageList);
        this.refs["autocomplete"].setState({searchText:''});
      }}
    />
  </div>
)
}
}

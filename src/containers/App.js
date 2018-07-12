import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import Table from '../components/Table';
import * as api from '../api/main-api';
import 'purecss/build/pure.css';
import '../style.css';
import { addUsers, sendStatusUser, onDeleteUsers } from '../actions/main-action';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      checkbox: [],
      show: 'all'
    }

    this.addUser = this.addUser.bind(this);
    this.onSend = this.onSend.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
    this.onCheck = this.onCheck.bind(this);

  }
  componentDidMount(){
    this.props.onGetUsers()
  }

  addUser(user){
    this.props.addUser(user)
  }

  onSend(id){
    this.props.onSend(id)
  }

  deleteUsers(){
    if(this.state.checkbox.length > 0){
      this.props.deleteUsers(this.state.checkbox)
      this.setState({checkbox: []})
    }
  }

  onCheck(e){
    const { checkbox } = this.state;
    if(e.target.checked){
      this.setState({checkbox: [...checkbox, e.target.value]})
    }else{
      const newCheckbox = checkbox.filter((id,i) => {
        return id != e.target.value;
      })
      this.setState({checkbox: newCheckbox})
    }
  }

  showTypeHandler(type){
    if(type != this.state.show){
      this.setState({show: type})
    }
  }

  render(){
    const { users } = this.props;
    const { show } = this.state;

    return <div className="app">
              <div className="pure-g">
                  <div className="pure-u-1-3"><h1>Add recipient</h1></div>
              </div>
              <Form
                  addUser={this.addUser}
              />
            <div className="pure-g pure-g-btn">
                <div className="pure-u-1-2">
                  <div className="pure-button-group pure-button-group-custom" role="group">
                      <button className={`pure-button ${show == 'all' ? 'active' : null}`} onClick={this.showTypeHandler.bind(this, 'all')}><span>Show all</span></button>
                      <button className={`pure-button ${show == 'sent' ? 'active' : null}`} onClick={this.showTypeHandler.bind(this, 'sent')}><span>Show sent</span></button>
                      <button className={`pure-button ${show == 'unsent' ? 'active' : null}`} onClick={this.showTypeHandler.bind(this, 'unsent')}><span>Show unsent</span></button>
                  </div>
                </div>
                <div className="pure-u-1-2 pure-delete-btn">
                  <button className="pure-button " onClick={this.deleteUsers}>Delete selected recipients</button>
                </div>
              </div>
            <Table
                users={users}
                show={show}
                onSend={this.onSend}
                onCheck={this.onCheck}
            />
          </div>;
  }
}

export default connect(
  state => ({
    users: state.mainState.users
  }),
  dispatch => ({
    onGetUsers:() => {
      dispatch({type: 'GET_USERS'})
    },
    addUser: (user) => {
      dispatch(addUsers(user))
    },
    onSend: (id) => {
      dispatch(sendStatusUser(id))
    },
    deleteUsers: (ids) => {
      dispatch(onDeleteUsers(ids))
    }
  })
)(App);

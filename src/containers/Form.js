import React, { Component} from 'react';

class Form extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: ''
    }

    this.handlerChange = this.handlerChange.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  handlerChange(e){
    this.setState({[e.target.id]: e.target.value})
  }

  handlerClick(){

    const { name, email } = this.state;
    if(name != '' && email != ''){
      this.props.addUser({name: name, email: email})
      this.setState({name: '', email: ''})
    }
  }

  render(){
    const { name, email } = this.state;
    return <div className="pure-form pure-custom-form">
              <fieldset>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" autoComplete='off' placeholder="johndoe@gmail.com" value={email} onChange={this.handlerChange} />
              </fieldset>
              <fieldset>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" autoComplete='off' placeholder="John Doe" value={name} onChange={this.handlerChange} />
              </fieldset>
                  <button onClick={this.handlerClick} className="pure-button pure-custom-btn-send">Add email</button>
            </div>
  }
}

export default Form;

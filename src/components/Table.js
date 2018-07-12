import React from 'react';

export default (props) => {
  const { users, show } = props;
  let newUsers;
  if(show == 'sent'){
    newUsers = users.filter((user,i)=>{
      return user.status;
    })
  }else if(show == 'unsent'){
    newUsers = users.filter((user,i)=>{
      return !user.status;
    })
  }else{
    newUsers = users;
  }

  return <div>
          <table className="pure-table" width="100%">
              <thead>
                  <tr>
                      <th></th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                    newUsers.map((user,i) =>
                      <tr key={user.id}>
                          <td>
                            <input className="styled-checkbox" type="checkbox" value={user.id} onChange={e=> props.onCheck(e)} />
                            <label htmlFor="styled-checkbox"></label>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.status ? 'Sent' : 'Unsent'}</td>
                          <td>{!user.status ? <button className="pure-button pure-custom-btn-send-table" onClick={e => props.onSend(user.id)}>Send</button> : null}</td>
                      </tr>
                    )
                  }
              </tbody>
            </table>

        </div>
}

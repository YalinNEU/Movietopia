export const login = ( user, password ) => {
  return Promise.resolve()
  .then( () => {
    return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}/session`, {
       method: 'POST',
       body: JSON.stringify({ password }),
       credentials: 'include'
    });
  })
  .then( r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ) )
  .then( j => { console.log(j); return j;} )
  .catch( e => {console.warn(e); return e;} );
};

export const signup = ( user, password ) => {
  return Promise.resolve()
  .then( () => {
    return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}`, {
       method: 'POST',
       body: JSON.stringify({ password }),
       credentials: 'include'
    });
  })
  .then( r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ) )
  .then( j => {console.log(j); return j;})
  .catch( e => {console.warn(e); return e;});
};

export const logout = ( user, callback ) => {
  return Promise.resolve()
  .then( () => {
    return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}/session`, {
       method: 'DELETE',
       credentials: 'include'
    });
  })
  .then( r => r.ok ? r.json() : r.json().then( j => Promise.reject(j) ) )
  .then( j => { console.log(j); return j; } )
  .catch( e => console.warn(e) )
};

if(typeof module !== 'undefined' && module.exports) {
  module.exports = {login, signup, logout};
}
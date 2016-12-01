'use strict'

import {Alert} from 'react-native';

class ApiHandler {

	signup(data, cb) {
		if (data && data.name && data.email && data.password) {
            /* create user */
            let usersignedup = 2;
            let user = data.name ? data.name : "anon"
            let flag = 2

			fetch('https://module4server.herokuapp.com/signUpX', {
				  method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({
				    userName: data.name,
				    userEmail: data.email,
				    userContact: data.contact,
				    userPass: data.password,
				  })
				})
			.then((response) => response.json())
			.then((responseJson) => {
	                flag = responseJson.flag;
	                usersignedup = flag;

		            if (usersignedup==1) {
		                cb(user);
		            } else if (usersignedup == 2) {
		                Alert.alert("User already exists..")
		            } else {
		                Alert.alert("Server error")
		            }	                  
				})
		} else {
			console.log('Messed up, no good content from form: ' + data)
		}
	}

	login(data, cb) {
		if (data && data.name && data.password) {
			/* try authenticating */
		  console.log(data)
		  let userLoggedIn=0
		  let user = data.name ? data.name : "anon"

	      fetch('https://module4server.herokuapp.com/loginX', {
	          method: 'POST',
	          headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	          },
	          body: JSON.stringify({
	            userName: data.name,
	            userPass: data.password
	          })
	        })
	    .then( (response) => response.json() )
	    .then((responseJson) => {
	          userLoggedIn = responseJson.flag;
		        console.log('User logged in = ', userLoggedIn)
				  if (userLoggedIn==1) {
				  		console.log('User is ', user)
		                cb(user);
		            } else {
		                Alert.alert("Authentication failed")
		            }
	        })
	    } 
	    else {
			console.log('Messed up, no good content from form: ' + data)
		}
	}


	explorebooks() {
	let books = []
	  fetch('https://module4server.herokuapp.com/explore', {
	    method: 'GET'
	  })
	  .then (function(response) {
	    return response.json()
	  .then (function(json){
	  	console.log('at explorebooks', json)
	      if (json && json.flag==1 && json.allposts) {
	      	books = json.allposts
	      }
	      return books
	    });
	  });
	};


	loadUser() {
		return new Promise( (resolve, reject) => {
			/* try to get user from current session from backend */
			console.log('I hit loadUser')
			let user = "anon"
			if (user!="anon") {
				resolve (user);
			} else {
				reject ();
			}
		});
	}
}

export default new ApiHandler();
'use strict'

class ApiHandler {
	signup(data, cb) {
		if (data && data.email && data.password) {
			console.log('@Signup: ' + data )
		} else {
			console.log('Messed up: ' + data)
		}

		/* create user */
		let user="user1";
		cb(user);
	}

	login(data, cb) {
		if (data && data.email && data.password) {
			console.log('@Login: ' + data )
		} else {
			console.log('Messed up: ' + data)
		}

		/* try authenticating */
		let user="user2";
		cb(user);
	}

	loadUser() {
		return new Promise( (resolve, reject) => {
			/* try to get user from current session from backend */
			let user = "ajay"
			if (user!="anon") {
				resolve (user);
			} else {
				reject ();
			}
		});
	}
}

export default new ApiHandler();
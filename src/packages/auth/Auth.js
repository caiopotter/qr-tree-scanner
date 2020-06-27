export default function(Vue)
{
	Vue.auth=
	{
		setToken(token, expiration)
		{
			const expirationInMiliSeconds= expiration*1000;
			localStorage.setItem('token', token);
			localStorage.setItem('expiration', expirationInMiliSeconds + moment().valueOf());
		},

		getToken()
		{
			const token= localStorage.getItem('token');
			const expiration= localStorage.getItem('expiration');
			const now= moment().valueOf();

			if( ! token || ! expiration){
				return null;
			}

			if(now > parseInt(expiration)){
				this.destroyToken();
				return null;
			}else{
				return token;
			}
		},

		destroyToken()
		{
			localStorage.removeItem('token');
			localStorage.removeItem('expiration');
		},

		isAuthenticated()
		{
			if(this.getToken()){
				return true;
			}else{
				return false;
			}
		}
	}

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get(){
				return Vue.auth;
			}
		}
	})
}

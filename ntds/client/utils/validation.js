var phone = require('google-libphonenumber');


module.exports={
	isMobile: function(mobile){
		try {
		var phoneUtil = phone.PhoneNumberUtil.getInstance();
			var phoneNumber_ug = phoneUtil.parse(mobile,'UG');
			var phoneNumber_ke = phoneUtil.parse(mobile,'KE');
			return phoneUtil.isValidNumber(phoneNumber_ug)||phoneUtil.isValidNumber(phoneNumber_ke);
		}
		catch(e){
			return false;
		}
	}
}
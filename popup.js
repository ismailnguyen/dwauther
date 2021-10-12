function save(email, password, otp_secret) {
	let config = {
        email: email,
        password: password,
        otp_secret: otp_secret
    }
	
    chrome.storage.local.set( {dwauther_config: config}, () => {
        console.log('dwauther_config saved successfully') ;
    }) ;
}

$(document).ready(function() {
    chrome.storage.local.get(['dwauther_config'], function(result) {
        var dwauther_config = result.dwauther_config
        if (dwauther_config) {
            $('#email-input').val(dwauther_config.email)
            $('#password-input').val(dwauther_config.password)
            $('#otp-secret-input').val(dwauther_config.otp_secret)
        }
    })

    $('#save-btn').click(function() {
        save($('#email-input').val(), $('#password-input').val(), $('#otp-secret-input').val())
        $(this).addClass('fadeOutUp')
        $(this).text('Saved!')
        $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function (e) {
                $(this).removeClass('fadeOutUp');
                $(this).text('Save');
            }
        )
    })
})

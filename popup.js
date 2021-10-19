function save(email, password, otp_secret) {
	let config = {
        email: email,
        password: password,
        otp_secret: otp_secret
    }
	
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set( {dwauther_config: config}, () => {
            console.log('dwauther_config saved successfully')
        });
    }
}

function generateMfaKey (otp_secret) {
    return window.otplib.authenticator.generate(otp_secret)
}

$(document).ready(function () {
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['dwauther_config'], function(result) {
            var dwauther_config = result.dwauther_config
            if (dwauther_config) {
                $('#email-input').val(dwauther_config.email)
                $('#password-input').val(dwauther_config.password)
                $('#otp-secret-input').val(dwauther_config.otp_secret)
                $('#token-input').val(generateMfaKey(dwauther_config.otp_secret))
            }
        })
    }

    $('li.tab').click(function () {
        save($('#email-input').val(), $('#password-input').val(), $('#otp-secret-input').val())
        var id = $(this).data('tab-id')
        $('#' + id + '.content-tab').show()
        $(this).addClass('is-active')
        $('.content-tab:not(#' + id + ')').hide()
        $('.tab:not([data-tab-id=' + id + '])').removeClass('is-active')
    })

    $('#generate-btn').click(function() {
        window.location.reload()
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

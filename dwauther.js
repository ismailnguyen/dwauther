var usernameFilled = false
var passwordFilled = false
var mfaFilled = false

var auth = function (username, password) {
  if (!usernameFilled && $('#idToken1').length) {
    $('#idToken1').val(username)
    $('#loginButton_0').click()
    usernameFilled = true
  }

  if (!usernameFilled) {
    setTimeout(function () { auth(username, password) }, 500)
    return
  }

  if (!passwordFilled && $('#idToken2').length) {
    $('#idToken2').val(password)
    $('#loginButton_0').click()
    passwordFilled = true
  }

  if (!passwordFilled)
    setTimeout(function () { auth(username, password) }, 500)
}

var verify = function (otp_secret) {
  if (!mfaFilled && $('input[type=text]').length) {
    var mfaKey = window.otplib.authenticator.generate(otp_secret)
    $('input[type=text]').val(mfaKey)
    $('button[type=submit]').click()
    mfaFilled = true
  }

  if (!mfaFilled)
    setTimeout(function () { verify(otp_secret) }, 500)
}

$(document).ready(function() {
  chrome.storage.local.get(['dwauther_config'], function(result) {
    var conf = result.dwauther_config
    if (conf) {
      if (window.location.href.indexOf('account.demandware.com/dwsso') > -1)
        auth(conf.email, conf.password)

      if (window.location.href.indexOf('verify.salesforce.com') > -1)
        verify(conf.otp_secret)
    }
  })
})

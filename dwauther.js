var usernameFilled = false
var passwordFilled = false
var mfaFilled = false

var auth = function () {
  console.log(config)
  console.log('try fill username')
  if (!usernameFilled && $('#idToken1').length) {
    $('#idToken1').val(config.username)
    $('#loginButton_0').click()
    usernameFilled = true
    console.log('filled username with', config.username)

  }

  if (!usernameFilled) {
    setTimeout(auth, 500)
    return
  }

  console.log('try fill password')
  if (!passwordFilled && $('#idToken2').length) {
    $('#idToken2').val(config.password)
    $('#loginButton_0').click()
    passwordFilled = true
    console.log('filled pwd with',  config.password)

  }

  if (!passwordFilled)
    setTimeout(auth, 500)
}

var verify = function () {
  if (!mfaFilled && $('input[type=text]').length) {
    var mfaKey = window.otplib.authenticator.generate(config.otpSecret)
    console.log('mfa step ongoing', config, mfaKey)
    $('input[type=text]').val(mfaKey)
    $('button[type=submit]').click()
    mfaFilled = true
  }

  if (!mfaFilled)
    setTimeout(verify, 500)
}

$(document).ready(function() {
  if (window.location.href.indexOf('account.demandware.com/dwsso') > -1)
    auth()

  if (window.location.href.indexOf('verify.salesforce.com') > -1)
    verify()
})

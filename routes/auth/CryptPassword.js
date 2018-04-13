var express = require('express');
var crypto = require('crypto');

/*
Encrypts the password
*/

function encryptPassword(password) {
  return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
}

module.exports = encryptPassword;
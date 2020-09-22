
/* global expect */
/* global test */
'use strict'
const { addNewWorkEx } = require('../newProfile')

test('Add Work Experience', () => {
  // Set up our document body
  document.body.innerHTML =
  '<div id="WE">' +
  '<div class="wex" id="workexperience">' +
      '<table>' +
          '<tr>' +
              '<td><label for="jobtitle">Job Title:</label></td>' +
              '<td><input type="text" id="jobtitle" name="jobtitle"></td>' +
          '</tr>' +
          '<tr>' +
              '<td><label for="company">Company:</label></td>' +
             ' <td><input type="text" id="Company" name="Company"></td>' +
          '</tr>' +
          '<tr>' +
              '<td><label for="location">Location:</label></td>' +
              '<td><input type="text" id="wlocation" name="wlocation"></td>' +
          '</tr>' +
          '<tr>' +
              '<td><label for="fromDate">From Date:</label></td>' +
              '<td><input type="month" id="fromDate" name="fromDate" placeholder="YYYY-MM"></td>' +
          '</tr>' +
          '<tr>' +
              '<td><label for="fromDate">To Date:</label></td>' +
              '<td><input type="month" id="toDate" name="toDate" placeholder="YYYY-MM"></td>' +
          '</tr>' +
          '<tr>' +
              '<td><label for="roledescription">Role Description:</label></td>' +
              '<td><textarea id="roledescription" name="roledescription"></textarea><br /></td>' +
          '</tr>' +
      '</table>' +
      '<input type="button" class="btn btn-danger delWex" value="Remove workex">' +
      '<br/><br/>' +
  '</div>' +
'</div>' +
'<br/>' +
'<input type="button" id="addWorkEx" class="btn btn-info" value="Add new Work Ex" >'

  addNewWorkEx()
  addNewWorkEx()
  addNewWorkEx()

  expect(document.getElementsByClassName('wex').length).toEqual(4)
})

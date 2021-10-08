// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
// Written by Chandni Amin, last modified on 20 April 2021 at 10:56 AM
'use strict';
const axios = require('axios');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  

  function welcome(agent) { //welcome function
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) { //fallback function
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  var seshID = agent.session.split('/').pop();
  var employeeName;
  var employeeID;
  var startedTime = Date.now();
  var scoreTemp;
  var malwareScore;
  var phishingScore;
  var byodScore;
  var authScore;
  var insiderScore;
  var totalScore;

  function saveName(agent) { //saves user's name
    employeeName = agent.parameters.person.name;
        axios.post('https://sheetdb.io/api/v1/cmz358qtpkwhe',{
        "data": {"seshun": seshID, "name": employeeName, "eyeD": employeeID}
      }).then( response => {
        console.log(response.data);
      });
  }
  
  function saveTime() { //records time assessment was started
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"started_at": startedTime}
    }).then( response => {
      console.log(response.data);
    });
  }

  function saveID(agent) { //saves employee ID of user
    employeeID = agent.parameters.employeeids;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
        "data": {"eyeD": employeeID}
      }).then( response => {
        console.log(response.data);
      });
  }

  function questionOne(agent) { //malware question 1
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"mal_1": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionTwo(agent) { //malware question 2
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"mal_2": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionThree(agent) { //phishing question 1
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"phi_1": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionFour(agent) { //phishing question 2
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"phi_2": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionFive(agent) { //mobile & BYOD question 1
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"byod_1": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionSix(agent) { //mobile & BYOD question 2
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"byod_2": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionSeven(agent) { //passwords & authentication question 1
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"auth_1": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionEight(agent) { //passwords & authentication question 2
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"auth_2": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionNine(agent) { //insider threat question 1
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"ins_1": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  function questionTen(agent) { //insider threat question 2
    scoreTemp = agent.parameters.Scores;
    axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
      "data": {"ins_2": scoreTemp}
    }).then( response => {
      console.log(response.data);
    });
  }

  async function showScore(agent) {
    var msg;
    var userStuff;
    msg = "n";
    var response = await axios.get(`https://sheetdb.io/api/v1/cmz358qtpkwhe/search?seshun=${seshID}`);
      userStuff = response.data[0];
      malwareScore = (parseFloat(userStuff.mal_1) + parseFloat(userStuff.mal_2))*100;
      phishingScore = (parseFloat(userStuff.phi_1) + parseFloat(userStuff.phi_2))*100;
      byodScore = (parseFloat(userStuff.byod_1) + parseFloat(userStuff.byod_2))*100;
      authScore = (parseFloat(userStuff.auth_1) + parseFloat(userStuff.auth_2))*100;
      insiderScore = (parseFloat(userStuff.ins_1) + parseFloat(userStuff.ins_2))*100;
      totalScore = (parseFloat(userStuff.mal_1) + parseFloat(userStuff.mal_2) + parseFloat(userStuff.phi_1) + parseFloat(userStuff.phi_2) + parseFloat(userStuff.byod_1) + parseFloat(userStuff.byod_2) + parseFloat(userStuff.auth_1) + parseFloat(userStuff.auth_2) + parseFloat(userStuff.ins_1) + parseFloat(userStuff.ins_2))*20;
      agent.add("Here's how you did:\nMalware - " + malwareScore + "%\nPhishing - " + phishingScore + "%\nMobile Devices and BYOD - " + byodScore + "%\nPasswords and Authentication - " + authScore + "%\nInsider Threat - " + insiderScore + "%\nTOTAL: " + totalScore + "%");
      agent.add("If you are satisfied with how you did on this assessment, copy down the session ID below to give to your supervisor or manager for reporting purposes:\n"+ seshID + "\n\nIf you wish to retake this assessment, simply click on the three white dots towards the top right of this chat window and clear the history, and then refresh the web page.");
      agent.add("If you choose to retake the assessment, then I'll see you again--good luck! If not, then I hope you have a great rest of your day!");
      var response2 = await axios.put(`https://sheetdb.io/api/v1/cmz358qtpkwhe/seshun/${seshID}`,{
          "data": {"total": `${totalScore}%`}});
  }
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Employee ID', saveName);
  intentMap.set('Instructions', saveID);
  intentMap.set('Question 1', saveTime);
  intentMap.set('Question 2', questionOne);
  intentMap.set('Question 3', questionTwo);
  intentMap.set('Question 4', questionThree);
  intentMap.set('Question 5', questionFour);
  intentMap.set('Question 6', questionFive);
  intentMap.set('Question 7', questionSix);
  intentMap.set('Question 8', questionSeven);
  intentMap.set('Question 9', questionEight);
  intentMap.set('Question 10', questionNine);
  intentMap.set('How Do You Think You Did', questionTen);
  intentMap.set('Drumroll', showScore);
  agent.handleRequest(intentMap);
});
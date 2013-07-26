$(function(){

// Find or set initial balances
if (_.isUndefined(localStorage.balance1)) {
  localStorage.setItem('balance1', 100);
  };

if (_.isUndefined(localStorage.balance2)) {
  localStorage.setItem('balance2', 100);
  };

// Create variables for balances stored in localStorage
var balance1=localStorage.balance1;
var balance2=localStorage.balance2;

// Array of accounts
var accounts = [balance1, balance2];

// Current stored account balances
current_balances = _.map(accounts, function(bal){ return parseInt(bal);
  });

// Setup initial balances on page
// Print current balances in console
console.log('current_balances : ' + current_balances[0] + ' | ' + current_balances[1]);

// Display balance's
update_displays();


// Function to display a balance
function displayBalance(account, displayDivId){
  $('#' + displayDivId).html('$'+account);
};

function can_process_transaction(current_balance, value){
  if (current_balance + value > 0) {
    return true;
  } else {
    console.log('Cannot process that transaction');
    return false;
  }
};

function can_split_withdrawl(value) {
  if (current_balances[0] +current_balances[1] + value > 0) {
    return true;
  } else {
    console.log('Cannot process that transaction');
    return false;
  }
};

function update_balances(){
  localStorage.setItem('balance1', current_balances[0]);
  localStorage.setItem('balance2', current_balances[1]);
  console.log("update_balances:");
  console.log(current_balances);
}

function update_displays(){
  displayBalance(current_balances[0], 'balance1');
  displayBalance(current_balances[1], 'balance2');
  if (current_balances[0] == 0) {
    $('#checkingAccount').css({'background-color': 'red'});
  } else {
    $('#checkingAccount').css({'background-color': '#6C9A74'});
  }
  if (current_balances[1] == 0) {
    $('#savingsAccount').css({'background-color': 'red'});
  } else {
    $('#savingsAccount').css({'background-color': '#6C9A74'});
  }
}


function deposit_to_checking(){
  deposit = $('#checkingAmount').val();
  deposit = parseInt(deposit);
  if (can_process_transaction(current_balances[0], deposit)) {
    current_balances[0] += deposit;
    update_balances();
  }
};

function deposit_to_savings(){
  deposit = $('#savingsAmount').val();
  deposit = parseInt(deposit);
  if (can_process_transaction(current_balances[1], deposit)) {
    current_balances[1] += deposit;
    update_balances();
  }
};

function withdraw_from_checking(){
  withdrawl = $('#checkingAmount').val();
  withdrawl = -parseInt(withdrawl);
  if (can_process_transaction(current_balances[0], withdrawl)) {
    current_balances[0] += withdrawl;
    update_balances();
  } else if (can_split_withdrawl(withdrawl))  {
    withdrawl += current_balances[0];
    current_balances[0] = 0;
    current_balances[1] += withdrawl;
    update_balances();
  }
};

function withdraw_from_savings(){
  withdrawl = $('#savingsAmount').val();
  withdrawl = -parseInt(withdrawl);
  if (can_process_transaction(current_balances[1], withdrawl)) {
    current_balances[1] += withdrawl;
    update_balances();
  } else if (can_split_withdrawl(withdrawl))  {
    withdrawl += current_balances[1];
    current_balances[1] = 0;
    current_balances[0] += withdrawl;
    update_balances();
  }
};



// Events
$("#checkingDeposit").on('click', function(){
  deposit_to_checking();
  update_displays();
});
$("#savingsDeposit").on('click', function(){
  deposit_to_savings();
  update_displays();
});
$("#checkingWithdraw").on('click', function(){
  withdraw_from_checking();
  update_displays();
});
$("#savingsWithdraw").on('click', function(){
  withdraw_from_savings();
  update_displays();
});

}); // End document ready function
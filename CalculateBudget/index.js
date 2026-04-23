import { CalculateBudget } from './calulcateBudget.js';

function main() {
  let calculateBtn = document.getElementById('calculateBtn');
  calculateBtn.onclick = function () {
    let salary = parseFloat(document.getElementById('salary').value);
    let loans = parseFloat(document.getElementById('loans').value);
    let bills = parseFloat(document.getElementById('bills').value);
    let needs = parseFloat(document.getElementById('needs').value);
    let wants = parseFloat(document.getElementById('wants').value);
    let savings = parseFloat(document.getElementById('savings').value);

    let budget = new CalculateBudget(
      salary,
      loans,
      bills,
      needs,
      wants,
      savings,
    );
    budget.init();
  };
}

main();

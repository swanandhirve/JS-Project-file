export class CalculateBudget {
  #salary;
  #loans;
  #bills;

  #divisionalBudget = {};
  #inLoans = 0;
  #inBills = 0;
  #inNeeds = 0;
  #inSavings = 0;
  #inWants = 0;

  #remainingAfterDeductions = null;
  #prioritize = ['loans', 'bills'];
  constructor(salary, loans, bills) {
    this.#salary = salary;
    this.#loans = loans;
    this.#bills = bills;
  }

  #getSalary() {
    return this.#salary;
  }

  #getLoans() {
    return this.#loans;
  }

  #getBills() {
    return this.#bills;
  }

  #setInLoans(amount) {
    this.#inLoans = amount;
  }

  #setInBills(amount) {
    this.#inBills = amount;
  }

  #setInNeeds(amount) {
    this.#inNeeds = amount;
  }

  #setInWants(amount) {
    this.#inWants = amount;
  }

  #setInSavings(amount) {
    this.#inSavings = amount;
  }

  #getRemainingAfterDeductions() {
    return this.#remainingAfterDeductions;
  }

  #setRemainingAfterDeductions(amount) {
    this.#remainingAfterDeductions = amount;
  }

  init() {
    let divisionalBudget = this.calculateDivisionalBudget();

    if (document.getElementById('divisionalBudget'))
      document.getElementById('divisionalBudget').remove();

    let div = document.createElement('div');
    div.id = 'divisionalBudget';
    div.classList.add('divisional-budget');
    div.classList.add('budget-section');
    let h2 = document.createElement('h2');
    h2.textContent = 'How much to give in each category';
    let p = document.createElement('p');
    p.textContent = `Loans: ${divisionalBudget.loans}, Bills: ${divisionalBudget.bills}`;
    div.appendChild(h2);
    div.appendChild(p);

    if (document.getElementById('remainingBudget'))
      document.getElementById('remainingBudget').remove();

    let remaining = this.divideRemainingBudget();
    let div2 = document.createElement('div');
    div2.id = 'remainingBudget';
    div2.classList.add('remaining-budget');
    div2.classList.add('budget-section');
    let h22 = document.createElement('h2');
    h22.textContent = 'Remaining budget after deductions';
    let p2 = document.createElement('p');
    p2.textContent = `Needs: ${remaining.needs}, Wants: ${remaining.wants}, Savings: ${remaining.savings}`;
    div2.appendChild(h22);
    div2.appendChild(p2);

    document.body.appendChild(div);
    document.body.appendChild(div2);
  }

  calculateDeductions() {
    let salary = this.#getSalary();
    let loans = this.#getLoans();
    let bills = this.#getBills();

    let total = parseFloat(loans) + parseFloat(bills);

    // if (total > salary) {
    //   alert('Your expenses exceed your salary. Please adjust your budget.');
    // } else {
    //   alert('Your budget is within your salary. Good job!');
    // }

    return salary - total;
  }

  calculateDivisionalBudget() {
    let salary = this.#getSalary();
    let loans = this.#getLoans();
    let bills = this.#getBills();

    let total = this.calculateDeductions();

    this.#divisionalBudget = {
      loans: loans,
      bills: bills,
    };

    this.#setRemainingAfterDeductions(total);
    return this.#divisionalBudget;
  }

  divideRemainingBudget() {
    let remaining = this.#getRemainingAfterDeductions();
    let needs = (remaining * 50) / 100;
    let wants = (remaining * 20) / 100;
    let savings = (remaining * 40) / 100;

    this.#setInNeeds(needs);
    this.#setInWants(wants);
    this.#setInSavings(savings);
    return {
      needs: needs,
      wants: wants,
      savings: savings,
    };
  }
}

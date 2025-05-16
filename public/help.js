async function createCustomer() {
  await fetch(`/customers`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: `${document.getElementById('firstName').value}`,
      lastName: `${document.getElementById('lastName').value}`,
      email: `${document.getElementById('email').value}`,
      message: `${document.getElementById('message').value}`,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((result) => result.json());

  await loadCustomerData();
}

async function loadCustomerData() {
  await fetch(`/customers`)
    .then((result) => result.json())
    .then((resultJson) => {
      const container = document.getElementById('tableWrapper');

      const table = document.createElement('table');
      table.setAttribute('id', 'customerInfo');

      const tableRow = document.createElement('tr');

      const tableHeadingFirstName = document.createElement('th');
      tableHeadingFirstName.innerHTML = 'First Name';
      tableRow.appendChild(tableHeadingFirstName);

      const tableHeadingQuestion = document.createElement('th');
      tableHeadingQuestion.innerHTML = 'Question';
      tableRow.appendChild(tableHeadingQuestion);

      table.appendChild(tableRow);

      resultJson.forEach((customer) => {
        const customerTableRow = document.createElement('tr');
        const customerTableFirstName = document.createElement('td');
        const customerTableQuestion = document.createElement('td');

        customerTableFirstName.innerHTML = customer.cust_fname;
        customerTableQuestion.innerHTML = customer.cust_message;

        customerTableRow.appendChild(customerTableFirstName);
        customerTableRow.appendChild(customerTableQuestion);

        table.appendChild(customerTableRow);
      });

      const preExistingTable = document.getElementById('customerInfo');
      if (preExistingTable) {
        preExistingTable.remove();
      }

      container.appendChild(table);
    });
}

window.onload = loadCustomerData();
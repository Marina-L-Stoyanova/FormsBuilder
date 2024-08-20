import { CustomerInputModel } from '../models/NorthWindCRUD/customer-input-model';

const API_ENDPOINT = 'https://localhost:7244';

export async function getCustomerInputModelList(): Promise<CustomerInputModel[]> {
	const headers = {
		Authorization: 'Bearer <auth_value>'
	};
	const options = {
		method: 'GET',
		headers,
	};
	const response = await fetch(`${API_ENDPOINT}/Customers`, options);
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}

export async function addCustomer(customerPayload: CustomerInputModel): Promise<CustomerInputModel | null> {
  try {
      const response = await fetch(`${API_ENDPOINT}/Customers`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + ''
          },
          body: JSON.stringify(customerPayload),
      });

      if (!response.ok) {
          return null;
      }

      return response.json();
  } catch (error) {
      console.error('Error adding customer:', error);
      return null;
  }
}

export async function updateCustomer(customerPayload: CustomerInputModel): Promise<CustomerInputModel | null> {
  try {
      const response = await fetch(`${API_ENDPOINT}/Customers`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + ''
          },
          body: JSON.stringify(customerPayload),
      });

      if (!response.ok) {
          return null;
      }

      return response.json();
  } catch (error) {
      console.error('Error updating customer:', error);
      return null;
  }
}

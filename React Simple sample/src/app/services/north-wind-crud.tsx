import { CustomerInputModel } from '../models/NorthWindCRUD/customer-input-model';

const API_ENDPOINT = 'https://localhost:7244';

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

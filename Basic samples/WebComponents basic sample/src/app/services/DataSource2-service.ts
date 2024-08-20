import { CustomerDto } from '../models/DataSource2/customer-dto';

const API_ENDPOINT = 'https://localhost:7244';

class DataSource2Service {

  public addCustomer = async (customerPayload: CustomerDto): Promise<CustomerDto | null> => {
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
}

export const dataSource2Service: DataSource2Service = new DataSource2Service();

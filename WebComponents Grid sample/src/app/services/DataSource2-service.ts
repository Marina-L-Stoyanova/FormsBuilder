import { CustomerDto } from '../models/DataSource2/customer-dto';

const API_ENDPOINT = 'https://localhost:7244';

class DataSource2Service {
	public getCustomerDtoList = async (): Promise<CustomerDto[]> => {
		const response = await fetch(`${API_ENDPOINT}/Customers`);
		if (!response.ok) {
			return Promise.resolve([]);
		}
		return response.json();
	}

 /*  public addCustomer = async (customerPayload: CustomerDto): Promise<CustomerDto | null> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/Customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZmZmFkN2E3LTNiOWItNDBjMC1hM2VhLTYyYzUxZTk4OWFiZiIsInN1YiI6Inprb2xldkBpbmZyYWdpc3RpY3MuY29tIiwiZW1haWwiOiJ6a29sZXZAaW5mcmFnaXN0aWNzLmNvbSIsImp0aSI6ImNkOWMzN2I2LTIyN2ItNDZlOC05MjcwLWNkMjRmZTlhOGJiYiIsIm5iZiI6MTcxNTY3Mzg3NCwiZXhwIjoxNzE1Njc0MTc0LCJpYXQiOjE3MTU2NzM4NzQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0NC8ifQ.Kk5Q-9zy5bh0_S72Vsgc5leJ_mqg7qmZKqOkDA1jf5wPRAC54w8m9l7Zj59Gz3X4A-g9Owl5iX5ZTn8csNtkDQ'
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

  public updateCustomer = async (customerPayload: CustomerDto): Promise<CustomerDto | null> => {
    try {
        const response = await fetch(`${API_ENDPOINT}/Customers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZmZmFkN2E3LTNiOWItNDBjMC1hM2VhLTYyYzUxZTk4OWFiZiIsInN1YiI6Inprb2xldkBpbmZyYWdpc3RpY3MuY29tIiwiZW1haWwiOiJ6a29sZXZAaW5mcmFnaXN0aWNzLmNvbSIsImp0aSI6ImNkOWMzN2I2LTIyN2ItNDZlOC05MjcwLWNkMjRmZTlhOGJiYiIsIm5iZiI6MTcxNTY3Mzg3NCwiZXhwIjoxNzE1Njc0MTc0LCJpYXQiOjE3MTU2NzM4NzQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0NC8ifQ.Kk5Q-9zy5bh0_S72Vsgc5leJ_mqg7qmZKqOkDA1jf5wPRAC54w8m9l7Zj59Gz3X4A-g9Owl5iX5ZTn8csNtkDQ'
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
  } */
}
export const dataSource2Service: DataSource2Service = new DataSource2Service();

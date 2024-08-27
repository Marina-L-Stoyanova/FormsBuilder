import { FetchApi } from './FetchApi-service';
import { CustomerInputModel } from '../models/NorthwindCRUD/customer-input-model';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

class NorthwindCRUDService {
	public postCustomerDto = async (data: any): Promise<CustomerInputModel | undefined> => {
		if (!data) {
			return Promise.resolve(undefined);
		}
		const body = JSON.stringify(data);
		const headers = {
			'Content-Type': 'application/json; charset=utf-8'
		};
		return await FetchApi.fetchApiResponse<CustomerInputModel | undefined>(`${API_ENDPOINT}/Customers`, undefined, 'POST', body, headers);
	}
}
export const northwindCRUDService: NorthwindCRUDService = new NorthwindCRUDService();

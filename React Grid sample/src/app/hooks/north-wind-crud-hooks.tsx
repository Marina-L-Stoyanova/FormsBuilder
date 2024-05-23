import { useCallback, useEffect, useState } from 'react';
import { CustomerInputModel } from '../models/NorthWindCRUD/customer-input-model';
import { getCustomerInputModelList } from '../services/north-wind-crud';

export const useGetCustomerInputModelList = () => {
	const [customerInputModel, setCustomerInputModel] = useState<CustomerInputModel[]>([]);

	const requestCustomerInputModel = useCallback(() => {
		let ignore = false;
		getCustomerInputModelList()
			.then((data) => {
				if (!ignore) {
					setCustomerInputModel(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	useEffect(() => {
		requestCustomerInputModel();
	}, [requestCustomerInputModel]);

	return { requestNorthWindCRUDCustomerInputModel: requestCustomerInputModel, northWindCRUDCustomerInputModel: customerInputModel};
}

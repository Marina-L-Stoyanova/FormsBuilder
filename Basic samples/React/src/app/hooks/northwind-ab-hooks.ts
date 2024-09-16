import { useCallback, useEffect, useState } from 'react';
import { CustomerDto } from '../models/NorthwindAB/customer-dto';
import { getCustomerDto } from '../services/northwind-ab';

export const useGetCustomerDto = (id: any) => {
  const [customerDto, setCustomerDto] = useState<CustomerDto | undefined>();

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    getCustomerDto(id)
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestCustomerDto();
  }, [id, requestCustomerDto]);

  return { requestNorthwindABCustomerDto: requestCustomerDto, northwindABCustomerDto: customerDto, setNorthwindABCustomerDto: setCustomerDto };
}

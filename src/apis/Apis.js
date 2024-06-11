import axios from 'axios';


export const fetchData = async () => {
  try {
    const { data, status } = await axios.post('https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product', {
      page: "1",
      pageSize: "20",
      sort: {
        creationDateSortOption: "DESC"
      }
    });

    return { data, status }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
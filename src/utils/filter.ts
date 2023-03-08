import { User } from "../types";

export function filterTableData({
  tableData,
  searchFieldValue,
  department,
}: {
  tableData: User[];
  searchFieldValue: string;
  department: string;
}) {
  // https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
  const stabilizedData = tableData.map((el, index) => [el, index] as const);

  stabilizedData.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  tableData = stabilizedData.map((el) => el[0]);
  searchFieldValue = searchFieldValue.toLowerCase();

  if (searchFieldValue) {
    tableData = tableData.filter((item) => {
      const name = `${item.firstName} ${item.lastName}`;
      return (
        name.toLowerCase().indexOf(searchFieldValue) !== -1 ||
        item.email.toLowerCase().indexOf(searchFieldValue) !== -1 ||
        item.phone.indexOf(searchFieldValue) !== -1 ||
        item.company.name.toLowerCase().indexOf(searchFieldValue) !== -1 ||
        item.company.department.toLowerCase().indexOf(searchFieldValue) !== -1
      );
    });
  }

  if (department !== "All") {
    tableData = tableData.filter(
      (item) => item.company.department === department
    );
  }

  return tableData;
}

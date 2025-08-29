import { IFilterOperator, IFilterType, type IColumn, type IFilter } from "./schema";

export const columns: IColumn[] = [
    {
        id: "id",
        title: "ID",
        visible: true,
        sortable: true
    },
    {
        id: 'full_name',
        title: 'ПІБ',
        visible: true,
        sortable: true,
        value: (row : any) => [row.last_name, row.first_name, row.middle_name]
            .filter((value) => !!value)
            .join(' '),
    },
    {
        id: "birthday",
        title: "Дата народження",
        visible: true,
        sortable: true
    },
    {
        id: 'phone',
        title: 'Телефон',
        visible: true,
        sortable: true
    },
    {
        id: "created_at",
        title: "Дата створення",
        visible: false,
        sortable: false
    }
];

export const filters: IFilter[] = [
    {
        id: "id",
        type: IFilterType.TEXT,
        operator: IFilterOperator.EQUAL,
        visible: true
    },
    {
        id: "full_name",
        type: IFilterType.TEXT,
        operator: IFilterOperator.ILIKE,
        visible: true
    },
    {
        id: "birthday",
        type: IFilterType.DATE,
        operator: IFilterOperator.EQUAL,
        visible: true
    },
    {
        id: "phone",
        type: IFilterType.TEXT,
        operator: IFilterOperator.ILIKE,
        visible: true
    },
    {
        id: "created_at",
        type: IFilterType.DATERANGE,
        operator: IFilterOperator.RANGE,
        visible: false
    }
];

export const exampleData = [
    {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        middle_name: "Michael",
        birthday: "1990-01-01",
        phone: "+1234567890",
        created_at: "2023-01-01"
    },
    {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        middle_name: null,
        birthday: "1992-02-02",
        phone: "+0987654321",
        created_at: "2023-02-01"
    },
    {
        id: "3",
        first_name: "Alice",
        last_name: "Johnson",
        middle_name: "Marie",
        birthday: "1995-03-03",
        phone: "+1122334455",
        created_at: "2023-03-01"
    },
    {
        id: "4",
        first_name: "Bob",
        last_name: "Brown",
        middle_name: "William",
        birthday: "1988-04-04",
        phone: "+2233445566",
        created_at: "2023-04-01"
    },
    {
        id: "5",
        first_name: "Charlie",
        last_name: "Davis",
        middle_name: null,
        birthday: "1993-05-05",
        phone: "+3344556677",
        created_at: "2023-05-01"
    },
    {
        id: "6",
        first_name: "Diana",
        last_name: "Wilson",
        middle_name: "Elizabeth",
        birthday: "1987-06-15",
        phone: "+4455667788",
        created_at: "2023-06-01"
    },
    {
        id: "7",
        first_name: "Edward",
        last_name: "Miller",
        middle_name: "James",
        birthday: "1991-07-20",
        phone: "+5566778899",
        created_at: "2023-07-01"
    },
    {
        id: "8",
        first_name: "Fiona",
        last_name: "Garcia",
        middle_name: null,
        birthday: "1994-08-25",
        phone: "+6677889900",
        created_at: "2023-08-01"
    },
    {
        id: "9",
        first_name: "George",
        last_name: "Martinez",
        middle_name: "Robert",
        birthday: "1989-09-30",
        phone: "+7788990011",
        created_at: "2023-09-01"
    },
    {
        id: "10",
        first_name: "Hannah",
        last_name: "Anderson",
        middle_name: "Grace",
        birthday: "1996-10-12",
        phone: "+8899001122",
        created_at: "2023-10-01"
    },
    {
        id: "11",
        first_name: "Ian",
        last_name: "Taylor",
        middle_name: null,
        birthday: "1985-11-18",
        phone: "+9900112233",
        created_at: "2023-11-01"
    },
    {
        id: "12",
        first_name: "Julia",
        last_name: "Thomas",
        middle_name: "Rose",
        birthday: "1992-12-22",
        phone: "+1011223344",
        created_at: "2023-12-01"
    },
    {
        id: "13",
        first_name: "Kevin",
        last_name: "Jackson",
        middle_name: "Paul",
        birthday: "1990-01-28",
        phone: "+1122334455",
        created_at: "2024-01-01"
    },
    {
        id: "14",
        first_name: "Laura",
        last_name: "White",
        middle_name: null,
        birthday: "1993-02-14",
        phone: "+1233445566",
        created_at: "2024-02-01"
    },
    {
        id: "15",
        first_name: "Michael",
        last_name: "Harris",
        middle_name: "David",
        birthday: "1988-03-19",
        phone: "+1344556677",
        created_at: "2024-03-01"
    },
    {
        id: "16",
        first_name: "Nina",
        last_name: "Clark",
        middle_name: "Sophie",
        birthday: "1995-04-23",
        phone: "+1455667788",
        created_at: "2024-04-01"
    },
    {
        id: "17",
        first_name: "Oscar",
        last_name: "Lewis",
        middle_name: null,
        birthday: "1991-05-27",
        phone: "+1566778899",
        created_at: "2024-05-01"
    },
    {
        id: "18",
        first_name: "Paula",
        last_name: "Robinson",
        middle_name: "Anne",
        birthday: "1994-06-30",
        phone: "+1677889900",
        created_at: "2024-06-01"
    },
    {
        id: "19",
        first_name: "Quinn",
        last_name: "Walker",
        middle_name: "Alexander",
        birthday: "1987-07-05",
        phone: "+1788990011",
        created_at: "2024-07-01"
    },
    {
        id: "20",
        first_name: "Rachel",
        last_name: "Hall",
        middle_name: null,
        birthday: "1989-08-10",
        phone: "+1899001122",
        created_at: "2024-08-01"
    }
];
export const jobSites = [
    {
        id: 1,
        name: "Site A",
        status: "Active",
        categories: [
            {
                name: "Electrical",
                items: [
                    { id: 1, name: "Wire", quantity: 100, unit: "meters" },
                    { id: 2, name: "Switch", quantity: 50, unit: "pieces" },
                ],
            },
            {
                name: "Plumbing",
                items: [
                    {id: 3, name: "Pipe", quantity: 75, unit: "meters"},
                ],
            },
        ],
    },
    {
        id: 2,
        name: "Site B",
        status: "Inactive",
        categories: [
            {
                name: "Construction",
                items: [
                    {id: 4, name: "Cement", quantity:200 , unit: "bags"},
                    {id: 5, name: "Bricks", quantity:500, unit: "pieces" },
                ],
            },
        ],
    },
];
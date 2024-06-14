
export const VALIDEMAIL = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const REGNUMBER = new RegExp('^[0-9]+$');

export const JOBSELECT = [
    {
        id: 1,
        jobName: 'Employee',
    },
    {
        id: 2,
        jobName: 'Student',
    },
    {
        id: 3,
        jobName: 'Other',
    }
]

export const FILTERPRODUCTS = [
    {
        id: 1,
        type: 'nameAsc',
        name: 'Name A - Z'
    },
    {
        id: 2,
        type: 'nameDesc',
        name: 'Name Z - A'
    },

    {
        id: 3,
        type: 'PriceAsc',
        name: 'Price Low - High'
    },

    {
        id: 4,
        type: 'priceDesc',
        name: 'Price High - Low'
    },
]

export const FILTERNEWS = [
    {
        id: 1,
        type: 'LeastViewed',
        name: 'Least Viewed'
    },

    {
        id: 2,
        type: 'MostViewed',
        name: 'Most Viewed'
    },
]

export const MENUITEMS = [
    {
        name: 'Products',
        path: '/products',
    },
    {
        name: 'Contact',
        path: '/contact'
    },
    {
        name: 'News',
        path: '/news'
    }
]
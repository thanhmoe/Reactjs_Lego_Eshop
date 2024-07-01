
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

export const FILTER_PRODUCTS_OPTIONS = [
    {
        id: 0,
        sortOrder: 'asc',
        sortBy: 'name',
        name: 'Name A - Z'
    },
    {
        id: 1,
        sortOrder: 'desc',
        sortBy: 'name',
        name: 'Name Z - A'
    },
    {
        id: 2,
        sortOrder: 'asc',
        sortBy: 'price',
        name: 'Price Low to High'
    },
    {
        id: 3,
        sortOrder: 'desc',
        sortBy: 'price',
        name: 'Price High to Low'
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
    },
    {
        name: 'account',
        path: '/account'
    }
]

export const SELECTGENDER = [
    {
        id: 1,
        gender: 'Male'
    },
    {
        id: 2,
        gender: 'Female'
    },
    {
        id: 3,
        gender: 'Other'
    }
]
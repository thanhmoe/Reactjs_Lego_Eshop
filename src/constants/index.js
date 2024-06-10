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
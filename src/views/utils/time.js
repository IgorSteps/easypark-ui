// Function to format date time objects to human-readable format.
export const FormatDateTime = (datetimeString) => {
    const date = new Date(datetimeString);
    return date.toLocaleString();
};
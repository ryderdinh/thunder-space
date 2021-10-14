var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
};

function  convert (date) {
    let newDate = new Date(date)
    return newDate.toLocaleDateString("vi", options)
}

module.exports = { convert }
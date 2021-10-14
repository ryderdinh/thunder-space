var options = {
    year: "numeric",
    day: "2-digit",
    month: "2-digit"
};

function  convert2 (date) {
    let newDate = new Date(date)
    return newDate.toLocaleDateString("vi", options)
}

module.exports = { convert2 }
const parseSalario = (str = "") => {
    return parseFloat(str.replace(/[\R\$\s\.]/g, "").replace(",", "."));
};

module.exports = {
    parseSalario
};
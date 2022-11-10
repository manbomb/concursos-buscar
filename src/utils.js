const parseSalario = (str = "") => {
    if (!str) return null;
    return parseFloat(str.replace(/[\R\$\s\.]/g, "").replace(",", "."));
};

const reduceUnique = (ac, el) => {
    const newAc = [...ac];
    if (!newAc.includes(el)) newAc.push(el);
    return newAc;
};

module.exports = {
    parseSalario,
    reduceUnique
};
const url =
    "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

d3.json(url).then((data) => {
    console.log(data);
    const canvas = d3.select("#canvas");

    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 30 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, 40000])
        .range([0, iwidth]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([iheight, 0]);
    
    let greater = 0;
    data.forEach((d) => {
        if(d.population > greater)
            greater = d.population;
    });
    
    const circles = g.selectAll("circle").data(data);

    circles.enter().append("circle")
        .attr("class", "point")
        .style("fill", "steelblue")
        .attr("r", (d) => (d.population / greater) * 10)
        .attr("cx", (d) => x(d.purchasingpower))
        .attr("cy", (d) => y(d.lifeexpectancy));

    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
});

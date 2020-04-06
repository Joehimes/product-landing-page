
var width = 800;
var height = 400;
var barWidth = width / 275;
var svgContainer = d3.select(".main")
        .append("svg")
            .attr("width", width + 100)
            .attr("height", height + 60)
            .attr("class", "chart")
var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        let GDP = data.data.map(item => item[1]);
        let gdpMin = d3.min(GDP);
        let gdpMax = d3.max(GDP);

        let years = data.data.map(item => new Date(item[0]));
        let yearsMin = d3.min(years);
        let yearsMax = d3.max(years);

        let xScale = d3.scaleTime()
            .domain([yearsMin, yearsMax])
            .range([0, width]);

        let xAxis = d3.axisBottom()
            .scale(xScale);

        let linearScale = d3.scaleLinear()
            .domain([0, gdpMax])
            .range([0, height])
        
        let scaledGDP = GDP.map(item => linearScale(item));

        let yAxisScale = d3.scaleLinear()
            .domain([0, gdpMax])
            .range([height, 0]);

        let yAxis = d3.axisLeft(yAxisScale);

        let xAxisGroup = svgContainer.append("g")
            .call(xAxis)
            .attr("transform", "translate(60, 400)")

        let yAxisGroup = svgContainer.append("g")
            .call(yAxis)
            .attr("transform", "translate(60, 0)");

        d3.select("svg").selectAll("rect")
            .data(scaledGDP)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(years[i]))
            .attr("y", (d, i) => height - d)
            .attr("width", barWidth)
            .attr("height", d => d)
            .style("fill", "blue")
            .attr("transform", "translate(60, 0)")

    });


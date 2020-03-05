console.log('hola desde map');

d3.json('https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json')
    .then((featureCollection) => {
        console.log(featureCollection);
        drawMap(featureCollection);
         
    });


    function drawMap(featureCollection) {
        const svgMap = d3.select('#map')
            .append('svg');
        
        const width = 500;
        const height = 500;
        const border = 100;
        const center = d3.geoCentroid(featureCollection);

        svgMap
            .attr('width', width)
            .attr('height', height);
            
        const projection = d3.geoMercator()
            .fitSize([width - border, height - border], featureCollection)
            .center(center)
            .translate([width/2, height/2]);
        
        const pathProjection = d3.geoPath().projection(projection);
        const features = featureCollection.features;
        console.log(features);
        const groupMap = svgMap.append('g').attr('class', 'map');

        
        const neighborhood = groupMap.selectAll('.neighborhood')
            .data(features)
            .enter()
            .append('path');

        neighborhood.attr('d', (d) => {
            d.opacity=1;
            return pathProjection(d);
        });

        neighborhood.on('click', function clickNeighborhood(d)  {
            d.opacity = d.opacity ? 0 : 1;
            d3.select(this).attr('opacity', d.opacity);
            console.log(d);
            console.log('barrio', d.properties.name);
            console.log('precio medio', d.properties.avgprice);
            console.log('habitaciones', d.properties.avgbedrooms);   
           
        })
        
        //legend
        const xMax = d3.max(features, (d) => d.properties.avgprice);
        const xMin = d3.min(features, (d) => d.properties.avgprice);
        
        const colorScale = d3.scaleLinear()
            .domain([xMin, xMax])
            .range(['yellow', 'red']);
        const legend = d3.legendColor()
            .scale(colorScale);
        
        svgMap.append('g')
            .call(legend)
            .attr('transform', 'translate(400,10)')
        
        neighborhood.attr('fill',(d) => colorScale(d.properties.avgprice))
        console.log(xMax,xMin)
        
    }

   
    
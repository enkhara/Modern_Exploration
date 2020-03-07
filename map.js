console.log('hola desde map');

d3.json('https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json')
    .then((featureCollection) => {
        console.log(featureCollection);
        drawMap(featureCollection);
         
    })
/*
d3.json('https://raw.githubusercontent.com/enkhara/Modern_Exploration/master/airbnb-listings.json')
    .then((featureCollection) => {
        console.log(featureCollection)
        drawMap(featureCollection)
    })*/
    .catch((error) => {
        console.log('error', error);
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
            .attr('height', height)
            
            
        const projection = d3.geoMercator()
                            .fitSize([width - border, height - border], featureCollection)
                            .center(center)
                            .translate([width/2, height/2]);
        
        const pathProjection = d3.geoPath().projection(projection);
        const features = featureCollection.features;
        const groupMap = svgMap.append('g').attr('class', 'map');

        const neighborhood = groupMap.selectAll('.neighborhood')
                                    .data(features)
                                    .enter()
                                    .append('path');
        
        neighborhood.attr('d', (d) => {
            d.opacity=1;
            return pathProjection(d)
            
        });
        

        const popUp = groupMap.append('text')
        
        //Mouse EVENTS
        groupMap.selectAll('path')
                .on('mouseover', function(d){
                    
                    d3.select(this).style('fill-opacity', 1.0);
                    
                    popUp
                        .attr('x',this.getBoundingClientRect().x)
                        .attr('y', this.getBoundingClientRect().y)
                        .text(`${d.properties.name}, ${d.properties.avgprice} euros `)
                })

        groupMap.selectAll('path')
                .on('mouseout', function(){
                    d3.select(this).style('fill-opacity', 0.7);
                    popUp.text('')
                })

        let clicks = 0;

        neighborhood.on('click', function clickNeighborhood(d)  {
            clicks ++
            
            drawGraph(d.properties.name, d.properties.avgbedrooms, clicks)
        })
        //Mouse EVENT END
        
        //legend
        const xMax = d3.max(features, (d) => d.properties.avgprice);
        const xMin = d3.min(features, (d) => d.properties.avgprice);
        
        const quantize = d3.scaleQuantize()
                            .domain([xMin, xMax])

        const colorScale = d3.scaleLinear()
                            .domain([xMin, xMax])
                            .range(['yellow', 'red']);
        const legend = d3   .legendColor()
                            .scale(colorScale);
        
        svgMap  .append('g')
                .call(legend)
                .attr('transform', 'translate(400,10)')
        
        neighborhood.attr('fill',(d) => colorScale(d.properties.avgprice))
                    .attr('fill-opacity', 0.7)
    
        //legend End
       
    }

   
    
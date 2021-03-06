

 const width = 500;
 const height = 500;

 var svgGraph = d3.select('#graphic')
    .append('svg');

svgGraph   
    .attr('width', width)
    .attr('height', height)


function drawGraph(name, bedrooms, controlVar){
    if (controlVar>1){
        svgGraph.remove('svg')
        svgGraph = d3.select('#graphic')
        .append('svg');
    
        svgGraph   
            .attr('width', width)
            .attr('height', height)
    }

   /*
    window.onmousemove = function (){
        var x = window.event.clientX;
        var y = window.event.clientY;
        console.log(x, y)
    }*/
    
    const rectWidth = 70;
    let maxInput = 0;
    
    for (let i = 0; i<bedrooms.length; i++) {
        if (maxInput < bedrooms[i].total) {
            maxInput = bedrooms[i].total;            
        }
    } 

    const scaleY = d3   .scaleLinear()
                        .domain([0, maxInput])
                        .range([height -40, 40])
                        .nice();
        
    const scaleX = d3.scaleLinear()
                    .domain([0, 5])
                     .range([20, width - 40])
        
                    
    const graphicGroup = svgGraph.selectAll('g')
                        .data(bedrooms)
                        .enter()
                        .append('g')


    const rect = graphicGroup.append('rect');

    rect
        .attr('x', posX)
        .attr('y', posY)
        .attr('width', rectWidth)
        .attr('height', scale)
        .attr('class', 'graph')
    
    //Axis
    function maxTicks(){
        if (maxInput >= 10){
            console.log(maxInput)
            return 10
        }else{
            console.log('entra al else')
            return maxInput
        }
    }

    const axisX = d3.axisBottom(scaleX).ticks(0);

    graphicGroup.append('g')
                .call(axisX)
                .attr('transform', `translate(20, ${height-40})`);


    const axisY = d3.axisLeft(scaleY).ticks(maxTicks())
    
    
    graphicGroup.append('g')
                .attr('class', 'axis')
                .call(axisY)
                .attr('transform', `translate(${width-(width-40)},0)`)        
    //Axis END

    function scale(d) {
        const scaleNum = (height - 80) / maxInput;
        if (d.total == 0){
            return 1
        }else{
            return scaleNum * d.total;
        }
        
    }
        
    function posX ( d, index )  {
        return index * ( rectWidth + 20 ) +42;
    }
    
    function posY (d) {
        return height - 40 - scale(d);
    }

    const text = graphicGroup.append('text');

    text
        .attr('x', posX)
        .attr('y', height-20)  
        .text(d => {
            return `${d.bedrooms} bedrooms`   
        });
    const neighborhoodName = graphicGroup.append('text');
    
    neighborhoodName 
                    .attr('x', 35)
                    .attr('y', 30)
                    .attr('class', 'title')
                    .text(name)
                    
        

}
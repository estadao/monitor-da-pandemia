d3.json("data/annotations.json").then(function(jsonData) {

  document.querySelector('.country-selector').value = "China";

  function parseData(data) {
    /* This function and its subfunctions
    prepare the input data so we can properly
    visualize them. This includes filtering,
    calulcating aggregations and normalizing */

    function calculateDateDelta(data) {
      /* This function calculates the difference
      between the day a survey was mande and the 1st
      day of the president's term – that is, it computes
      for how long the president was serving when the 
      survey was made.
      */

      console.log(data);

      const countryDates = {

        // Day when the case count reached 100

        "Brazil"         : { "hundred_cases" : "2020-03-14" },
        "Italy"          : { "hundred_cases" : "2020-02-24" },
        "China"          : { "hundred_cases" : "2020-01-21" }, // There is no previous data. It starts already with 200+ people with the disease.
        "South-Korea"    : { "hundred_cases" : "2020-02-20" },
        "United-States"  : { "hundred_cases" : "2020-03-04" },
        "Spain"          : { "hundred_cases" : "2020-03-03" },
        "Japan"          : { "hundred_cases" : "2020-02-22" },
        "France"         : { "hundred_cases" : "2020-03-02" },
        "United-Kingdom" : { "hundred_cases" : "2020-03-06" }
 

      };

      // Keep only the relevant data
      data = data.filter( d => Object.keys(countryDates).includes(d.location));

      for ( let datum of data ) {

        let location = datum.location;

        let casesStart = countryDates[location]["hundred_cases"];
            casesStart = new Date(casesStart);
            
        let currentDate = datum.date;
            currentDate = new Date(currentDate);

        let diff = currentDate.getTime() - casesStart.getTime();
            diff = diff / (1000 * 3600 * 24) // Milliseconds to days

        datum["days_since_breakout"] = diff;

      } // End of for

      return data;

    } // End of calculateDateDelta

    function sortData(data) {

      data = data.sort(function(a, b){
        return a.days_since_breakout - b.days_since_breakout;
      })

      return data;

    }

    data = calculateDateDelta(data);
    data = sortData(data);

    return data;

  } // End of parseData

  jsonData = parseData(jsonData);

  d3.csv("data/full_data.csv").then(function(csvData) {

    function drawChart(data, target, segment, countries, mainChart, annotate) {

      ////////////////////////////////////////
      ////// MOBILE-DETECTING FUNCTIONS //////
      ////////////////////////////////////////

      function isMobile() {
          /*
          This function detects if the screen
          of the device is mobile (width smaller than
          800). It returns `true`` if positive,
          `false` if negative.
          */
          if(window.innerWidth <= 800) {

             return true;

          } // End of if

          else {

             return false;

          } // End of else

      } // End of isMobile()

      /////////////////////////////////////
      ////// CHART DRAWING FUNCTIONS //////
      /////////////////////////////////////

      function filterData(data, countries) {
        /* This function uses d3.filter to
        keep only the relevant datapoints */

        data = data.filter(function(d) {

          return countries.includes(d.location) & d.days_since_breakout > 0;

        }) // End of d3 filter

        return data;

      } // End of filterData

      function nestData(data) {

        /* This function groups the data
        by using the d3.nest function.
        Then, it returns the results */

          data = d3.nest()
            .key(function(d){
              return d.location;
            })
            .entries(data);

          return data;

      } // End of nestData;

      function setScales(dimensions) {
        /* This function uses the width and height specified
        in dimensions to calculate the x and y position scales.
        It uses d3 built-in methods to do so. */

        // Days passed since the first day avaliable in the data to today
        let casesStart =  new Date("2020-01-21");
        let xMax = Date.now() - casesStart.getTime();
            xMax = xMax / (1000 * 3600 * 24); // Milliseconds to days

        const xPositionScale = d3.scaleLinear()
          .domain([ 1, xMax ]) 
          .range([0, dimensions.width]);

        const yPositionScale = d3.scaleLog()
          .domain([100, 120000]) // From 100 to 100,000 cases
          .range([ dimensions.height, 0 ]);

        return {

          x: xPositionScale,
          y: yPositionScale,

        };

      } // End of setScales

      function setDimensions(chartClass) {
        /* This function determines the
        correct data visualization size
        for mobile and desktop devices.
        chartType can be either "mainChart"
        or smallMultiples, each option
        resulting in different dimensions
        for desktop */

        let dimensions = { };
        dimensions.margin = { top: 25, left: 48, right: 20, bottom: 100};


        if ( isMobile() ) {

          dimensions.height = 300 - dimensions.margin.top - dimensions.margin.bottom,
          dimensions.width  = 300 - dimensions.margin.left - dimensions.margin.right;

        } // End of if

        else if (chartClass == "main-chart") {

            dimensions.height = 300 - dimensions.margin.top - dimensions.margin.bottom,
            dimensions.width  = 800 - dimensions.margin.left - dimensions.margin.right;

        } // End of else

        else {

            dimensions.height = 300 - dimensions.margin.top - dimensions.margin.bottom,
            dimensions.width  = 700 - dimensions.margin.left - dimensions.margin.right;
        
        }

        return dimensions;

      } // End of setDimensions

      function addSvg(cssSelector, chartClass, chartId, dimensions) {
        /* This functions adds a svg on the div
        specified by cssSelector, with the parameters
        specified at dimensions. It returns the selection
        at the end as well. */

          const svg = d3.select(cssSelector)
            .append("svg")
              .attr("class", chartClass)
              .attr("id", chartId)
              .attr("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
              .attr("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
            .append("g")
              .attr("class", chartClass)
              .attr("id", chartId)
              .attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`)

      } // End of addSvg

      function addAxis(cssSelector, scales, dimensions) {
        /* This function draws the x and y axis
        of the chart, using the scales and dimensions
        that we set previously */

        function addXAxis(cssSelector, scale, dimensions) {

            let ticks = isMobile() ? [1, 25, 50] : [1, 10, 20, 30, 40, 50];

            const xAxis = d3.axisBottom(scale)
              .tickValues(ticks)
              .tickFormat(function(d){
                return d + 'º';
              });

           let xAxisHolder = d3.select(cssSelector)
              .append("g")
              .attr("class", "x-axis")
              .attr("fill", "black")
              .attr("transform", `translate(0,${dimensions.height + 20})`)
              .call(xAxis);

            xAxisHolder.select(".domain") // Selects the axis vertical line...
                .remove()       // ...and removes it

            xAxisHolder.selectAll(".x-axis .tick text")
              .attr("class", "ordinary-tick");

            // Adds text besides the 1st tick
            xAxisHolder.select(".x-axis g.tick:first-of-type")
                .append("text")
                .attr("class", "tick-highlight-smaller")
                .text("dia")
                .attr("dy", 20)
                .attr("dx", 22);

            // And below
            xAxisHolder.select(".x-axis g.tick:first-of-type")
                .append("text")
                .attr("class", "tick-highlight-smaller")
                .text("com mais")
                .attr("dy", 35)
                .attr("dx", 16);


            xAxisHolder.select(".x-axis g.tick:first-of-type")
                .append("text")
                .attr("class", "tick-highlight-smaller")
                .text("de 100 casos")
                .attr("dy", 50)
                .attr("dx", 16);

              xAxisHolder.select(".x-axis g.tick:first-of-type")
                .append("text")
                .attr("class", "tick-highlight-smaller")
                .text("confirmados")
                .attr("dy", 65)
                .attr("dx", 16);



        } // End of addXAxis

        function addYAxis(cssSelector, scale, dimensions) {

          const yAxis = d3.axisLeft(scale)
            .tickSize(0 - dimensions.width) // Make the ticks occupy the whole svg, left to right
            .tickValues([100, 1000, 10000, 100000])
            .tickFormat(function(d) {

              if (d >= 1000) {

                return d / 1000 + " mil";

              }

              else {
                return d;
              }

            });

          d3.select(cssSelector)
            .append("g")
            .attr("class", "y-axis")
            .attr("fill", "black")
            .call(yAxis)
            .select(".domain") // Selects the axis vertical line...
              .remove();       // ...and removes it

        } // End of addYAxis

        addXAxis(cssSelector, scales.x, dimensions);
        addYAxis(cssSelector, scales.y, dimensions);

      } // End of addAxis

      function plotData(data, countries, svgSelector, scales, measure, mainChart) {
        /* Proccess the data and plots
        the relevant datapoints */

        function addLines(data, svgSelector, lineSelector, xScale, yScale, measure) {
          /* This function draws the lines 
          representing the actual datapoints */

          const lineGenerator = d3.line()
            .x(function(d) {
              return xScale(+d.days_since_breakout);
            })
            .y(function(d){
              return yScale(+d[measure]);
            })
            .curve(d3.curveStep);

          const svg = d3.select(svgSelector);

          // Main lines
          svg.selectAll(lineSelector)
            .data(data)
            .enter()
              .append("path")
              .attr("class", "country-line")
              .attr("id", function(d){
                let id = d.key.toLowerCase();
                    id = id.replace(/ /g, '-'); // Regex to remove spaces
                return `line-${id}`; 
              })
              .attr("fill", "none")
              .style("stroke-width", 2)
              .style("stroke", function(d){
                if (d.key === "Brazil") {
                  return "#ffbe19"
                }
                else {
                  return "#555555";
                }
              })
              .attr("d", function(d){
                return lineGenerator(d.values);
              })

        } // End of addLines

        function addPoints(data, svgSelector, pointSelector, xScale, yScale, measure) {

          // Pulsating points addapted from this codepen:
          // https://codepen.io/shaneparsons/pen/MpgEma

          let svg = d3.select(svgSelector)

          let realPoints = svg.selectAll(pointSelector)
            .data(data)
            .enter()
            .append("circle")
              .attr("class", "poll-point")
              .attr("cx", d => xScale(+d.days_since_breakout))
              .attr("cy", d => yScale(+d[measure]))
              .attr("r", 3)
              .style("fill", d => d.location == "Brazil" ? "#ffbe19" : "#555555" )
              .style("visibility", "hidden")

          let fakePoints = svg.selectAll("fake-point")
            .data(data)
            .enter()
            .append("circle")
              .attr("class", "fake-point poll-point")
              .attr("cx", d => xScale(+d.days_since_breakout))
              .attr("cy", d => yScale(+d[measure]))
              .attr("r", "3")
              .attr("fill", "none")
              .style("stroke", d => d.location == "Brazil" ? "#ffbe19" : "#555555" )
              .style("visibility", "hidden")

          // Adds animation to the fake point on the outside
          fakePoints.append("animate")
                      .attr("attributeType", "XML")
                      .attr("attributeName", "r")
                      .attr("from", "3")
                      .attr("to", "30")
                      .attr("dur", "1.5s")
                      .attr("repeatCount", "indefinite");

          fakePoints.append("animate")
                      .attr("attributeType", "XML")
                      .attr("attributeName", "opacity")
                      .attr("from", "1")
                      .attr("to", "0")
                      .attr("dur", "1.5s")
                      .attr("repeatCount", "indefinite");

        } // End of addPoints

        function updateChart(data, measure, countriess, svgSelector, pointSelector, mainChart) {
          /* Updates the dynamic explainer 
          text below the mais chart */

          function computeInfo(data, measure, countriess) {
            /* Helper function that calculates the values
            for the chart helper */

            function computeBrazilTime(dataArray) {
              /* This functions how many days passed
              from the beginning of Bolsonaro's term
              to the latest poll. It then divides the
              day count by 30 to estimate the numbers
              of months that have passed since them */

              let dayCounts = dataArray.map(d => d.days_since_breakout);
              let passedDays = d3.max(dayCounts)
              let lastDay = dataArray[dataArray.length - 1].date;

              // Format the date lazily using string slicing
              lastDay = lastDay[8] + lastDay[9] + "." +lastDay[5] + lastDay[6];


              return {

               days: passedDays,
               mostRecentReport: lastDay

              };

            } // End of computeBolsoMonth

            function computeClosestPoint(dataArray, brazilDays, measure) {
              /* This functions receives an int as an argument:
              how many days after Brazil's first case was the
              mosr recent datapoint released; it then uses this number 
              to find the report that was released the closer to
              this time interval for another country */

              let dayCounts = dataArray.map(d => d.days_since_breakout);

              let selectedIndex = 0;
              let smallerDiff = 99999;
              for (i = 0; i < dayCounts.length; i++) {

                let diff = Math.abs(dayCounts[i] - brazilDays);

                if (diff < smallerDiff) {
                  smallerDiff = diff;
                  selectedIndex = i;
                } // End of if

              } // End of for

              return {
                date: dataArray[selectedIndex].date,
                days_since_breakout: dataArray[selectedIndex].days_since_breakout,
                value: dataArray[selectedIndex][measure]
              }

            } // End of computeCloserMonth

            let dataBrazil = data.filter(d => d.key == "Brazil")[0].values;
            let dataOther  = data.filter(d => d.key != "Brazil")[0].values;

            let brazilTime    = computeBrazilTime(dataBrazil);
            let brazilMeasures   = computeClosestPoint(dataBrazil, brazilTime.days, measure)
            let otherMeasures   = computeClosestPoint(dataOther, brazilTime.days, measure);

            let country = countries[1];
            let prefix = ""


            // Correct the name to display in portuguese
            if (country == "Italy") {
              prefix = "a";
              country = "Itália";
              verb = "havia";
            }

            else if (country == "China") {
              prefix = "a";
              country = "China";
              verb = "havia";
            }

            else if (country == "South-Korea") {
              prefix = "a";
              country = "Coréia do Sul";
              verb = "havia";
            }

            else if (country == "Brazil") {
              prefix = "o";
              country = "Brasil";
              verb = "havia";

            }

            else if (country == "United-States") {
              prefix = "os";
              country = "EUA";
              verb = "haviam";

            }

            else if (country == "Spain") {
              prefix = "a";
              country = "Espanha";
              verb = "havia";
            }

            else if (country == "France") {
              prefix = "a";
              country = "França";
              verb = "havia";
            }

            else if (country == "Japan") {
              prefix = "o";
              country = "Japão";
              verb = "havia";
            }

            else if (country == "United-Kingdom") {
              prefix = "o";
              country = "Reino Unido";
              verb = "havia";
            }



            let htmlContent = `<p class="chart-explainer">A contagem mais recente de casos de covid-19 no Brasil foi divulgada pela OMS em ${brazilTime.mostRecentReport}, o <span class="dynamic">${brazilTime.days}º dia</span> desde que o número de diagnósticos no país superou <strong>100</strong>. Até agora, foram registrados <span class="dynamic"><strong>${brazilMeasures.value} casos</strong></span> da doença no país. Para comparar, ${prefix} <span class="dynamic">${country}</span> ${verb} diagnosticado <span class="dynamic"><strong>${otherMeasures.value}</strong> casos</span> no mesmo intervalo.</p>`;

            return {

              html: htmlContent,
              highlightDates: [ brazilMeasures.days_since_breakout, otherMeasures.days_since_breakout ]

            }

          } // End of computeInfo

          function showPoint(pointSelector, highlightDates, mainChart) {
            /* Makes the two points relevant
            to the comparison pulsate */

            if( mainChart ) {

              let points = d3.selectAll(pointSelector)
                  .style("visibility", function(d){

                    let status = highlightDates.includes(d.days_since_breakout) ? "visible" : "hidden"
                    return status;
                  })

            } // End of if

          } // End of showPoint

            let explainerDiv = d3.select("div.chart-explainer");
            let info = computeInfo(data, measure, countries);

            explainerDiv.html(info.html);
            showPoint(pointSelector, info.highlightDates, mainChart);

        } // End of updateChart

        let filteredData = filterData(data, countries);

        if (mainChart) {
          addPoints(filteredData,
            svgSelector,
            ".poll-point",
            scales.x,
            scales.y,
            measure)
        } // End of if

        filteredData = nestData(filteredData);

         addLines(filteredData,
                 svgSelector,
                 ".president-line",
                 scales.x,
                 scales.y,
                 measure);

        if (mainChart) {

          updateChart(filteredData,
                      measure,
                      countries,
                      svgSelector,
                      ".poll-point",
                      mainChart);

        } // End of if


      } // End of plotData

      function render(data, target, chartDimensions, chartScales, countries, mainChart) {

          addSvg(`.${target}`,
                 target,
                 target,
                 chartDimensions);

          addAxis(`g.${target}`, 
                  chartScales, 
                  chartDimensions);

          plotData(data,
                   countries,
                   `g.${target}`,
                   chartScales,
                   "total_cases",
                   mainChart);

          d3.selectAll("#line-brazil").raise();

      } // End of render

      function annotateChart(jsonData, target, location, chartScales) {
        /* Adds annotations to the charts using the preloaded
        json file. Addapted from this block:
        https://bl.ocks.org/susielu/a464c24d8b42f0c4d9fafe7b48e9e60a
        */

        let annotations = jsonData.filter(d => d.location == location );

        for (let annotation of annotations) {

          console.log(annotation);

          console.log(chartScales.x);

          annotation["type"] = d3.annotationCallout;
          // annotation["connector"] = { "curve" : d3.curveBasis };
          annotation["x"] = chartScales.x(annotation["days_since_breakout"]);
          annotation["y"] = chartScales.y(annotation["value"]);

          console.log(annotation);

         // annotation["note"]["bgPadding"] = {"top":5,"left":0,"right":5,"bottom":3};
          annotation["connector"] =  { end: "dot" };

          let mobileDevice = isMobile();

          annotation["dx"] = mobileDevice ? annotation["mobileDx"] : annotation["desktopDx"];
          annotation["dy"] = mobileDevice ? annotation["mobileDy"] : annotation["desktopDy"];

          annotation["note"]["wrap"] = mobileDevice ? annotation["note"]["mobileWrap"] : annotation["note"]["desktopWrap"];
          annotation["note"]["wrap"] = mobileDevice ? annotation["note"]["mobileWrap"] : annotation["note"]["desktopWrap"];

        } // End of for

        let makeAnnotations = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(annotations)


        d3.select(`g.${target}`)
          .append("g")
          .attr("class", "annotation-group")
          .call(makeAnnotations);


      } // End of annotate chart

      ///////////////////////////
      // INTERACTION FUNCTIONS //
      //////////////////////////

      function addListeners() {
        /* Adds the relevant event listeners to 
        the HTML elements of the page */

        if (!setListeners) {

          document.querySelector("select.country-selector")
                  .addEventListener("change", redrawMainChart);

          window.addEventListener('resize', redrawMainChart);
          window.addEventListener('resize', redrawSmallMultiples);

          setListeners = true;

        }

      } // End of addListeners

      function redrawMainChart() {
        /* Redraws the main chart after selecting
        a new president on the dropdown or resizing 
        the screen */

        d3.selectAll('svg.main-chart')
          .remove();

        chartDimensions = setDimensions("main-chart");
        chartScales     = setScales(chartDimensions);

        let selector = document.querySelector("select.country-selector"),
            countryValue = selector.options[selector.selectedIndex].value;
            countryText  = selector.options[selector.selectedIndex].text;

        render(csvData, 
          "main-chart", 
          chartDimensions,
          chartScales, 
          [ "Brazil", countryValue ], 
          true);

      } // End of redrawMainChart

      function redrawSmallMultiples() {
        /* Redraws the small multiples only
        after resizing the screen */

        d3.selectAll("div.small-multiple > svg")
          .remove();

        chartDimensions = setDimensions("smallMultiples");
        chartScales     = setScales(chartDimensions);

          render(csvData, 
            "china", 
            chartDimensions,
            chartScales, 
            [ "Brazil", "China" ]);

          annotateChart(jsonData, 
            "china",
            "China", 
            chartScales);

          render(csvData, 
            "south-korea", 
            chartDimensions,
            chartScales, 
            [ "Brazil", "South-Korea" ]);

          annotateChart(jsonData, 
            "south-korea",
            "South-Korea", 
            chartScales);

          render(csvData, 
            "spain", 
            chartDimensions,
            chartScales, 
            [ "Brazil", "Spain" ]);

          annotateChart(jsonData, 
            "spain",
            "Spain", 
            chartScales);

          render(csvData, 
              "united-states", 
              chartDimensions,
              chartScales, 
              [ "Brazil", "United-States" ]);

          annotateChart(jsonData, 
              "united-states",
              "United-States", 
              chartScales);


          render(csvData, 
              "france", 
              chartDimensions,
              chartScales, 
              [ "Brazil", "France" ]);

          annotateChart(jsonData, 
            "france",
            "France", 
            chartScales);             

          render(csvData, 
            "italy", 
            chartDimensions,
            chartScales, 
            [ "Brazil", "Italy" ]);

          annotateChart(jsonData, 
            "italy",
            "Italy", 
            chartScales);

            render(csvData, 
              "japan", 
              chartDimensions,
              chartScales, 
              [ "Brazil", "Japan" ]);

          annotateChart(jsonData, 
            "japan",
            "Japan", 
            chartScales);

          render(csvData, 
              "united-kingdom", 
              chartDimensions,
              chartScales, 
              [ "Brazil", "United-Kingdom" ]);

          annotateChart(jsonData, 
            "united-kingdom",
            "United-Kingdom", 
            chartScales);

      } // End of redrawSmallMultiples


      addListeners();

      let chartDimensions   = setDimensions(target),
          chartScales       = setScales(chartDimensions);

      render(data, 
             target, 
             chartDimensions, 
             chartScales, 
             countries,
             mainChart);

      if (annotate) {

        annotateChart(jsonData, target, countries[1], chartScales)

      }

    } // End of draw chart
    
    setListeners = false;
    csvData = parseData(csvData);

    // Main chart
    drawChart(csvData,
              "main-chart", 
              "total_cases", 
              [ "Brazil", "China" ],
              true,
              false );

    // Small multiples
    drawChart(csvData,
              "china", 
              "total_cases", 
              [ "Brazil", "China" ],
              false,
              true);

    drawChart(csvData,
          "south-korea", 
          "total_cases", 
          [ "Brazil", "South-Korea" ],
          false,
          true);


    drawChart(csvData,
          "spain", 
          "total_cases", 
          [ "Brazil", "Spain" ],
          false,
          true);

    drawChart(csvData,
          "united-states", 
          "total_cases", 
          [ "Brazil", "United-States" ],
          false,
          true);


    drawChart(csvData,
          "france", 
          "total_cases", 
          [ "Brazil", "France" ],
          false,
          true);

    // // Small multiples
    drawChart(csvData,
              "italy", 
              "total_cases", 
              [ "Brazil", "Italy" ],
              false,
              true);

    drawChart(csvData,
            "japan", 
            "total_cases", 
            [ "Brazil", "Japan" ],
            false,
            true);

      drawChart(csvData,
          "united-kingdom", 
          "total_cases", 
          [ "Brazil", "United-Kingdom" ],
          false,
          true);


  }); // End of d3.csv


}); // End of d3.json

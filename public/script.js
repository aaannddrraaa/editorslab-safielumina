window.onload = function() {
  // load the external svg from a file                      
  window.d3.xml('harta-romania.svg', 'image/svg+xml', function(xml) {
    const importedNode = document.importNode(xml.documentElement, true);
    window.d3.select('div#map-container')
      .each(function() {
        this.appendChild(importedNode);
      });

    loadJSON(function (data) {
      try {
        const jsonData = JSON.parse(data);
        styleImportedSVG(jsonData);
      }
      catch (err) {
        console.error(err);
      }
    });    
  });

  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
      if(xobj.readyState == 4 && xobj.status == '200') {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

  let hideInterval;
  function styleImportedSVG (jsonData) {
    window.d3.selectAll('path')
      .attr('class', 'county')
      .on('mouseover', function() {
        const countyPathEl = window.d3.select(this);
        const countyID = countyPathEl.attr('id');
        countyPathEl.attr('class', 'county hovered');
        if (hideInterval) {
          window.clearInterval(hideInterval);
        }
        
        const centerCountyRect =document.getElementById('C-' + countyID).getBoundingClientRect();
        window.d3.select('#tooltip')
          .style({
            left: (centerCountyRect.left - 150) + 'px',
            top: (centerCountyRect.top - 110) + 'px'
          })        
          .transition().duration(50).style('opacity', 1);
        window.d3.select('#tooltip').select('.county-name').text(countyMap[countyID] + ':');
        window.d3.select('#tooltip').select('.county-total').text(getTotalValueForCounty(countyID, jsonData));
        window.d3.select('#tooltip').select('.county-replies').text(getReplyCountForCounty(countyID, jsonData) + '/' + getReplyNeededForCounty(countyID, jsonData));
      })
      .on('mouseout', function() {
        window.d3.select(this).attr('class', 'county');
        hideInterval = window.setInterval(function () {
          window.d3.select('#tooltip')                 
            .transition().duration(50).style('opacity', 0);
        }, 50);        
      })
      .on('click', function() {
        const countyPathEl = window.d3.select(this);
        const countyID = countyPathEl.attr('id');
        if (countyID === 'PH') {
          window.d3.select('.details-PH').style('display', 'block');
          window.d3.select('.details-ALL').style('display', 'none');
        }
      })
      .each(function() {
        const countyPathEl = window.d3.select(this);
        const countyID = countyPathEl.attr('id');        
        countyPathEl.style({
          'fill-opacity': getReplyPercentageForCounty(countyID, jsonData) / 100
        });
      });
  }

  const years = ['2012', '2013', '2014', '2015', '2016', '2017'];
  const lastYear = years[years.length-1];
  function getReplyPercentageForCounty(countyID, jsonData) {
    const countyData = jsonData[countyID];
    const replies = getReplyCountForCounty(countyID, jsonData); 
    return Math.round(replies * 100/ (countyData['UAT'] + 1));
  }

  function getReplyCountForCounty(countyID, jsonData) {
    const countyData = jsonData[countyID];
    let replies = countyData[lastYear]['CJ_rep'] > 0 ? 1 : 0;
    replies = replies + countyData[lastYear]['CL'].length;  
    return replies;
  }

  function getReplyNeededForCounty(countyID, jsonData) {
    const countyData = jsonData[countyID];
    return countyData['UAT'] + 1;
  }

  function getTotalValueForCounty(countyID, jsonData) {
    const countyData = jsonData[countyID];
    let total = 0;
    for (var i=0; i < years.length; i++) {
      total = total + countyData[years[i]]['CJ_rep'] + countyData[years[i]]['CJ_sal'];       
      const cl = countyData[years[i]]['CL'].reduce(function (acc, curr) { 
        return acc + Object.values(curr)[0]; 
      }, 0);
    }
    return parseMoneyValue(total);
  }

  function parseMoneyValue(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Lei';
  }

  const countyMap = { 
    'AB': 'Alba',
    'AR': 'Arad',
    'AG': 'Arges',
    'BC': 'Bacau',
    'BH': 'Bihor',
    'BN': 'Bistrita-Nasaud',
    'BT': 'Botosani',
    'BV': 'Brasov',
    'BR': 'Braila',
    'BZ': 'Buzau',
    'B': 'Bucuresti',
    'CS': 'Caras-Severin',
    'CL': 'Calarasi',
    'CJ': 'Cluj',
    'CT': 'Constanta',
    'CV': 'Covasna',
    'DB': 'Dambovita',
    'DJ': 'Dolj',
    'GL': 'Galati',
    'GR': 'Giurgiu',
    'GJ': 'Gorj',
    'HR': 'Harghita',
    'HD': 'Hunedoara',
    'IL': 'Ialomita',
    'IS': 'Iasi',
    'IF': 'Ilfov',
    'MM': 'Maramures',
    'MH': 'Mehedinti',
    'MS': 'Mures',
    'NT': 'Neamt',
    'OT': 'Olt',
    'PH': 'Prahova',
    'SM': 'Satu Mare',
    'SJ': 'Salaj',
    'SB': 'Sibiu',
    'SV': 'Suceava',
    'TR': 'Teleorman',
    'TM': 'Timis',
    'TL': 'Tulcea',
    'VS': 'Vaslui',
    'VL': 'Valcea',
    'VN': 'Vrancea'
  };
};

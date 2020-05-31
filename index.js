const express = require("express")
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const app = express()
//use built-in bodyparser from express module
app.use(express.json())

app.listen(3000, () => {
    console.log(`API server running at: http://localhost:3000`)
})

app.get('/totalcases', (req, res) => {
    $(function(){

        $.ajaxPrefilter( function (options) {
            if (options.crossDomain && $.support.cors) {
                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            }
        });
          
        $.get(
            'https://en.wikipedia.org/wiki/COVID-19_pandemic',
            function (response) {
                const cases = $(response).find('.infobox > tbody tr:nth-child(14) > td:first')
                .text().replace(/[^\d\.\-]/g,"").slice(0,7)
                res.status(200).json({confirmedCases: cases})
            }
        );
    })
})

app.get('/recovered', (req, res) => {
    $(function(){

        $.ajaxPrefilter( function (options) {
            if (options.crossDomain && $.support.cors) {
                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            }
        });
          
        $.get(
            'https://en.wikipedia.org/wiki/COVID-19_pandemic',
            function (response) {
                const cases = $(response).find('.infobox > tbody tr:nth-child(16) > td:first')
                .text().replace(/[^\d\.\-]/g,"").slice(0,7)
                res.status(200).json({recoveredCases: cases})
            }
        );
    })
})

app.get('/cases', (req, res) => {
    $(function(){

        $.ajaxPrefilter( function (options) {
            if (options.crossDomain && $.support.cors) {
                let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            }
        });
          
        $.get(
            'https://en.wikipedia.org/wiki/COVID-19_pandemic',
            function (response) {
                const table = $(response).find('#thetable > tbody').children()
                const casesByCountries=[]
                for (let i = 2; i < table.length - 2; i++){
                    casesByCountries[i] = { country: "", cases: "" }
                    let str = $(table[i]).find("th:last").text().trim()
                    if (str[str.length - 1] === "]"){
                        str = str.substring(0, str.length - 3)
                    }
                    casesByCountries[i].country = str
                    casesByCountries[i].cases = $(table[i])
                                                    .find("td:first")
                                                    .text()
                                                    .trim()
                                                    .replace(/[^\d\.\-]/g,"") 
                }
                res.status(200).json(casesByCountries)
            }
        );
    })
})
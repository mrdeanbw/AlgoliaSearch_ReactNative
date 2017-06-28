var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var nock = require('nock');
//var request = require('request');

describe('Wallet Tests', function() {
debugger
    it('should respond with json object', function(done) { // <= Pass in done callback
        chai.request('https://us-central1-hoops-21a72.cloudfunctions.net/stripeGetAccountBalance?userId=0nZD1u7NkIVzZVwKrvGb4EeRyLW2')
        .get('/')
        .end(function(err, res) {
            debugger
            console.log(res.text);
            expect(res).to.have.status(200);
            done();                          
        });
    });
    
});
'use strict';

var bodySchema = require('../');
var chai = require('chai');

describe('body-schema node module', function() {
    var schema = {
        'title': 'Example Schema',
        'type': 'object',
        'properties': {
            'firstName': {
                'type': 'string'
            },
            'lastName': {
                'type': 'string'
            },
            'age': {
                'description': 'Age in years',
                'type': 'integer',
                'minimum': 0
            }
        },
        'required': ['firstName', 'lastName']
    };

    it('accpet valid schema', function(done) {
        var payload = {
            body: {
                'firstName': 'Andrew',
                'lastName': 'Lavers'
            }
        };

        var mw = bodySchema(schema);
        mw(payload, null, done);
    });

    it('reject invalid schema', function(done) {
        var payload = {
            body: {
                'firstName': 'Andrew'
            }
        };

        var mw = bodySchema(schema);
        mw(payload, null, function(err) {
            chai.expect(err).to.exist;
            done();
        });
    });
});

"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {
    typingDelay: 300,
    timeoutId: null,

    /**
     * @property addressObject
     */
    addressObject: {
        init: false,
        returnId: false,
        returnAddressObject: false
    },

    /**
     *
     * @param {string} apiUrl
     * @param {array}  watchedFieldIds
     *
     * @constructor
     */
    initialize: function (apiUrl, watchedFieldIds) {
        var self              = this,
            addressFieldNames = watchedFieldIds,
            addressFields     = self.getSearchFields(addressFieldNames);

        self.loadPrefilledValues(addressFields);
        self.listenFields(addressFields);
    },

    /**
     *
     * @param {array} fieldNames
     *
     * @returns {object}
     */
    getSearchFields: function (fieldNames) {
        var $fields = {};

        fieldNames.each(function (item) {
            var $field = $$('#' + item)[0];

            if ($field) {
                $fields[$field.id] = {
                    name: $field.id,
                    field: $field
                };
            }
        });

        return $fields;
    },

    /**
     * Writes existing field values into object
     *
     * @param {object} addressFields
     *
     * @returns void
     */
    loadPrefilledValues: function (addressFields) {
        var self = this;

        for (var key in addressFields) {
            var obj = addressFields[key];

            if (obj.field.value && obj.field.value.length) {
                self.addressObject[key] = obj.field.value;
            }
        };
    },

    /**
     * Adds listener to selected fields
     *
     * @param {object} addressFields
     *
     * @returns void
     */
    listenFields: function (addressFields) {
        var self = this;

        for (var key in addressFields) {
            var obj = addressFields[key];

            obj.field
                .observe('input', function (event) {
                    self.addressObject[event.target.id] = event.target.value;

console.log('Current value: ', event.target.value, 'addressObject: ', self.addressObject);

                    self.triggerDelayedCallback(function () {
                        self.searchAction();
                    });
                });
        }
    },

    /**
     * Triggers an delayed callback.
     *
     * @param {Function} callback Callback to execute after timeout
     * @param {int} delay Delay in milliseconds
     */
    triggerDelayedCallback: function (callback, delay) {
        var self = this;
        delay = delay || self.typingDelay;

        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    },

    /**
     * Executes a search request.
     *
     * @return {Object} Search results
     */
    searchAction: function () {
        var searchRequest = new SearchRequest(apiUrl);

        searchRequest.doSearchRequest(this.addressObject, function (json) {
console.log(json);
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function () {
        var selectRequest = new SelectRequest(apiUrl);

        if (!this.addressObject.uuid) {
            throw 'Missing required field <uuid>';
        }

        selectRequest.doSelectRequest(this.addressObject, function (json) {
console.log(json);
        });
    }
};

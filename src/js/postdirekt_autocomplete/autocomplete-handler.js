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
     * @param {string} formId
     * @param {string} formPrefix
     * @param {array} watchedFields
     * @constructor
     */
    initialize: function(apiUrl, formId, formPrefix, watchedFields) {
        var self = this,
            addressFieldNames = watchedFields,
            $addressForm = $(formId),
            addressFields = self.getSearchFields(formPrefix, addressFieldNames, $addressForm);

        self.loadPrefilledValues(addressFieldNames, addressFields);
        self.listenFields(addressFieldNames, addressFields);
    },

    /**
     *
     * @param {string} prefix
     * @param {array} fieldNames
     * @param {object} $addressForm
     * @returns {object}
     */
    getSearchFields: function(prefix, fieldNames, $addressForm) {
        var $fields = {};
        fieldNames.forEach(function(item) {
            var $field = $addressForm.select('#' + prefix + '\\:' + item)[0];

            if ($fields) {
                $fields[item] = {
                    name: item,
                    field: $field
                };
            }
        });

        return $fields;
    },

    /**
     * Writes existing field values into object
     *
     * @param {array} addressFieldNames
     * @param {object} addressFields
     *
     * @returns void
     */
    loadPrefilledValues: function (addressFieldNames, addressFields) {
        var self = this;

        addressFieldNames.each(function (item) {
            var obj = addressFields[item];

            if (obj.field.value && obj.field.value.length) {
                self.addressObject[item] = obj.field.value;
            }
        });
    },

    /**
     * Adds listener to selected fields
     *
     * @param {array} addressFieldNames
     * @param {object} addressFields
     * @returns void
     */
    listenFields: function (addressFieldNames, addressFields) {
        var self = this;

        addressFieldNames.each(function(item) {
            var obj = addressFields[item];
            if (obj) {
                obj.field
                    .observe('input', function() {
                        self.addressObject[obj.name] = this.value;
                        console.log('Current value: ', this.value, 'addressObject: ', self.addressObject);

                        self.triggerDelayedCallback(function () {
                            self.searchAction();
                        });
                    });
            }
        });
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
    searchAction: function() {
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
    selectAction: function() {
        var selectRequest = new SelectRequest(apiUrl);

        if (!this.addressObject.uuid) {
            throw 'Missing required field <uuid>';
        }

        selectRequest.doSelectRequest(this.addressObject, function (json) {
console.log(json);
        });
    }
};

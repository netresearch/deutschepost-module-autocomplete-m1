"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {

    /**
     * @property {FinalSearch{},CurrentSearch{}}
     */
    finalSearch: {},
    currentSearch: {},

    /**
     *
     * @param {string} apiUrl, {string} formId, {string} formPrefix, {array} watchedFields
     * @constructor
     */
    initialize: function(apiUrl, formId, formPrefix, watchedFields) {
        var apiUrl = apiUrl,
            formId = formId,
            formPrefix = formPrefix,
            addressFieldNames = watchedFields,
            $addressForm = $(formId),
            addressFields = this.getSearchFields(formPrefix, addressFieldNames, $addressForm);

        this.listenFields(addressFieldNames, addressFields);
    },

    /**
     *
     * @param {string} prefix, {array} fieldNames, {object} $addressForm
     * @return {$fields|object}
     */
    getSearchFields: function(prefix, fieldNames, $addressForm) {

        var $fields = [];
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
     * Adds listener to selected fields
     *
     * @param {array} addressFieldNames, {object} addressFields
     * @return void
     */
    listenFields: function (addressFieldNames, addressFields) {
        var currentSearch = this.currentSearch,
            finalSearch = this.finalSearch;

        addressFieldNames.each(function(item) {
            var obj = addressFields[item];
            if (obj) {
                obj.field
                    .observe('input', function() {
                        currentSearch[obj.name] = this.value;
                        console.log('Current value: ', this.value, currentSearch);
                    })
                    .observe('blur', function() {
                        finalSearch[obj.name] = this.value;
                        console.log('Value after blur: ', this.value, finalSearch);
                    });
            }
        });
    }
};

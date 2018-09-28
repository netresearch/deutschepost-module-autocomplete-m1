"use strict";

var AutocompleteFields = Class.create();

/**
 * Resource model for AutocompleteAddressData objects.
 *
 * @type {{}}
 */
AutocompleteFields.prototype = {

    /**
     * Initialize.
     *
     * @param {HTMLElement} form
     * @param {Object} autocompleteFieldNames
     *
     * @constructor
     */
    initialize: function(form, autocompleteFieldNames) {
        this.form             = form;
        this.fieldNamesObject = autocompleteFieldNames;
        this.fieldNames       = Object.keys(this.fieldNamesObject);
        this.fieldIs          = Object.values(this.fieldNamesObject);
    },

    /**
     * Returns all suggestion field's IDs
     *
     * @returns {Object} addressData
     *
     */
    getIds: function() {
        return this.fieldIs;
    },

    /**
     * Returns all suggestion field's names
     *
     * @returns {Object} addressData
     *
     */
    getNames: function() {
        return this.fieldNames;
    },

    /**
     * Returns all suggestion fields
     *
     * @returns {Object} addressData
     *
     */
    getFields: function() {
        var self = this,
            fields = [];

        this.fieldIs.each(function(fieldName) {
            var $field = self.form.select('#' + fieldName)[0];
            if ($field) {
                fields.push($field);
            }
        });

        return fields;
    },

    /**
     * Returns current address object by name
     *
     * @param {string} name
     *
     * @returns {Object} addressData
     *
     */
    getFieldByName: function(name) {
        return this.form.select('#' + this.fieldNamesObject[name])[0];
    },

    /**
     * Returns current address object by ID
     *
     * @param {string} id
     *
     * @returns {Object} addressData
     *
     */
    getFieldById: function(id) {
        return this.form.select('#' + id)[0];
    }
};

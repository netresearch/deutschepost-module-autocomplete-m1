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
     * @param {HTMLElement} $form
     * @param {Object} autocompleteFieldNames
     *
     * @constructor
     */
    initialize: function($form, autocompleteFieldNames) {
        this.form             = $form;
        this.fieldNamesObject = autocompleteFieldNames;
        this.fieldNames       = Object.keys(this.fieldNamesObject);
        this.fieldIds         = Object.values(this.fieldNamesObject);
    },

    /**
     * Returns array of all autocomplete field IDs
     *
     * @returns {Array} this.fieldIds
     *
     */
    getIds: function() {
        return this.fieldIds;
    },

    /**
     * Returns array of all autocomplete field names
     *
     * @returns {Array} this.fieldNames
     *
     */
    getNames: function() {
        return this.fieldNames;
    },

    /**
     * Returns array of all autocomplete fields
     *
     * @returns {Array} formFields
     */
    getFields: function() {
        var self       = this,
            formFields = [];

        this.fieldIds.each(function(fieldName) {
            var $field = self.form.select('#' + fieldName)[0];
            if ($field) {
                formFields.push($field);
            }
        });

        return formFields;
    },

    /**
     * Returns autocomplete field by name
     *
     * @param {string} name
     *
     * @returns {HTMLElement}
     */
    getFieldByName: function(name) {
        return this.form.select('#' + this.fieldNamesObject[name])[0];
    },

    /**
     * Returns autocomplete field by ID
     *
     * @param {string} id
     *
     * @returns {HTMLElement}
     */
    getFieldById: function(id) {
        return this.form.select('#' + id)[0];
    }
};

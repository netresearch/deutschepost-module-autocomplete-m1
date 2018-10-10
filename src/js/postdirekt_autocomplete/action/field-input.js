"use strict";

var FieldInput = Class.create();

FieldInput.prototype = {
    /**
     * @property {AutocompleteFields} fields
     */
    fields: {},

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData: {},

    /**
     * Initialize.
     *
     * @param {AutocompleteFields} fields
     * @param {AutocompleteAddressData} addressData
     *
     * @constructor
     */
    initialize: function(fields, addressData) {
        this.fields     = fields;
        this.addressData   = addressData;
    },

    /**
     * Update the address data model with information from an input element.
     *
     * @param {HTMLElement} $field
     */
    updateAddressDataFromField: function($field) {
        var fieldId = $field.getAttribute('data-address-item'),
            name    = this.fields.getNameById(fieldId),
            item    = this.fields.getFieldById(fieldId);
        this.addressData.setDataValue(name, item.value);
    },

    /**
     * Update the address data model with information from all input elements.
     */
    updateAdressData: function () {
        this.fields.getFields().each(function ($field) {
            this.updateAddressDataFromField($field);
        }.bind(this));
    }
};

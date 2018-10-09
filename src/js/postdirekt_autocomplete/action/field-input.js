"use strict";

var FieldInput = Class.create();

FieldInput.prototype = {
    /**
     * @property {AutocompleteFields} allFields
     */
    allFields: null,

    /**
     * @property {AutocompleteAddressData} addressData
     */
    addressData: null,

    /**
     * Initialize.
     *
     * @param {AutocompleteFields} allFields
     * @param {AutocompleteAddressData} addressData
     *
     * @constructor
     */
    initialize: function(allFields, addressData) {
        this.allFields     = allFields;
        this.addressData   = addressData;
    },

    /**
     * doInputAction
     *
     * @param {HTMLElement} $currentField
     */
    doInputAction: function($currentField) {
        var fieldId = $currentField.getAttribute('data-address-item'),
            name    = this.allFields.getNameById(fieldId),
            item    = this.allFields.getFieldById(fieldId);

        this.addressData.setDataValue(name, item.value);
    }
};

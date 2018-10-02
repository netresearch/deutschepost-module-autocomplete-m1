"use strict";

var FieldInput = Class.create();

/**
 * Resource model for SelectRequest objects.
 *
 * @type {{}}
 */
FieldInput.prototype = {

    /**
     * Initialize.
     *
     * @param {Object} allFields
     * @param {Object} addressData
     * @param {Object} searchRequest
     *
     * @constructor
     */
    initialize: function(allFields, addressData, searchRequest) {
        this.allFields     = allFields;
        this.addressData   = addressData;
        this.searchRequest = searchRequest;
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

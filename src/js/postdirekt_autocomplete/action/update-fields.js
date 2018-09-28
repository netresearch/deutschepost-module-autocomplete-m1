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
     * @param {HTMLElement}   $currentField
     */
    doInputAction: function($currentField) {
        var fieldId = $currentField.identify(),
            item    = this.allFields[fieldId];

        this.addressData.setDataValue(item.name, item.field.value);
    }
};
